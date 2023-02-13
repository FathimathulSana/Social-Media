import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

//Create new Post

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get a Post

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Delete a post

export const deletePost = async (req, res) => {
    const id = req.params.id
    const userId = req.body.currentUser;
    try {
        const post = await PostModel.findById(id)
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully")
        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Like and Dislike a post

export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post Unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get timeline Posts

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json(error);
    }
};

//Report post

export const reportPost = async (req, res) => {
    const id = req.params.id

    const response = await PostModel.findByIdAndUpdate(id, { $push: { reports: req.body } })
}


//show reported posts for admin

export const getReportedPosts = async (req, res) => {
    const posts = await PostModel.find()
    const reportedPosts = posts.filter((post) => post.reports.length > 0)
    res.status(200).json(reportedPosts)
}

export const reportedPostRemove = async (req, res) => {
    console.log("evide ethiyo");
    const postId = req.params.id
    try {
        const removedFieldUpdate = await PostModel.findById(postId)
        if (removedFieldUpdate.removed) {
            const response = await removedFieldUpdate.updateOne({ $set: { removed: false } })
            res.status(200).json("post unblocked")
        } else {
            const response = await removedFieldUpdate.updateOne({ $set: { removed: true } })
            res.status(200).json("post blocked successfully")

        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const editPost = async (req, res) => {
    try {
        const data = await PostModel.findOneAndUpdate({ _id: req.body.postId }, { $set: { description: req.body.description } })
        res.status(200).json({ data })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}