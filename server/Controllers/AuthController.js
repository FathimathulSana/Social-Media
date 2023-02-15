import UserModel from "../Models/userModel.js";
import OtpModel from "../Models/otpModel.js";
import AdminModel from "../Models/adminModel.js"
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOtpVerificationEmail } from "../Services/NodeMailer.js";

//Registering a new user
export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    req.body.verified = false;
    const newUser = new UserModel(req.body)
    const { email } = req.body
    try {
        const oldUser = await UserModel.findOne({ email })

        if (oldUser) {
            return res.status(400).json({ message: "User is already registered!" })
        }

        const user = await newUser.save();
        await sendOtpVerificationEmail(user, res);


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//login user

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username })

        if (user) {
            if (!user.verified) {
                return res.status(400).json("User otp not verified")
            }
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {
                res.status(400).json("Wrong Password!")
            } else {
                const active = user.active
                if (!active) {
                    return res.status(400).json("You has been blocked")
                }
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                res.status(200).json({ user, token })
            }
        } else {
            res.status(404).json("User does not exists")
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//verify otp email

export const verifyotp = async (req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            return res.status(400).json("Empty otp details are not allowed");
        } else {
            const userOTPVerificationRecords = await OtpModel.find({ userId });
            if (userOTPVerificationRecords.length <= 0) {
                //no records found
                return res.status(400).json("Account record doesn't exist or have been verified already, please signup or login")
            } else {
                const { expiresAt } = userOTPVerificationRecords[0];
                const hashedOTP = userOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    //user otp record has expired
                    await OtpModel.deleteMany({ userId });
                    return res.status(404).json("Code has expired. Please request again.")

                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    if (!validOTP) {
                        //supplied otp is wrong
                        return res.status(404).json(" Invalid code passed!. Check your inbox.")

                    } else {
                        await UserModel.findOneAndUpdate(
                            { _id: userId },
                            { $set: { verified: true } }
                        );

                        const user = await UserModel.findById({ _id: userId });
                        await OtpModel.deleteMany({ userId });
                        const token = jwt.sign(
                            {
                                username: user.username,
                                id: user._id
                            },
                            process.env.JWT_KEY,
                            { expiresIn: '1h' }
                        );
                        res.status(200).json({ user, token })
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}

//resend otp

export const resendOtp = async (req, res) => {
    try {
        let { userId, email } = req.body;

        if (!userId || !email) {
            throw Error("Empty user details are not allowed");
        } else {
            //delete existing record and resend
            await OtpModel.deleteMany({ userId });
            sendOtpVerificationEmail({ _id: userId, email: email }, res);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
}

export const adminLogin = async (req, res) => {

    const { username, password } = req.body;

    try {
        const adminData = await AdminModel.findOne({ username: username }, { username: 1, password: 1 });

        if (adminData) {
            const adminVerified = await bcrypt.compare(password, adminData.password);

            if (adminVerified) {
                let token
                if (process.env.JWT_KEY) {
                    token = jwt.sign(
                        { username: adminData.username, id: adminData._id },
                        process.env.JWT_KEY,
                        { expiresIn: "1h" }
                    );
                }


                return res.status(200).json({ adminData, token })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }


}

