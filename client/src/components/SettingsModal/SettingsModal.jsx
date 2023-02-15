import { Modal, Radio  } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'

import '../ReportPostModal/ReportPostModal.css'
import { editPost } from '../../api/UserRequest';

function SettingsModal({settingModalOpend,setSettingModalOpened}) {
    const [currentpass,setCurrentPass] = useState('');
    const [password,setPassword] = useState('')
    const [confirmPass,setConfirmPass] = useState('')

    const changePass = () => {
        setSettingModalOpened(false)
    }
   
  return (
    <Modal 
    opened={settingModalOpend}
    centered={true}
    withCloseButton={false}
    onClose={() => setSettingModalOpened(false)}
    >
    
    <div className='fieldsetStyleItems' style={{ textAlign: "center" }}>
                    <span>Want to change Password?</span>

                    <div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="Input"
                            style={{ width: "100", marginTop: "10px" }}
                            name="password"
                            value={currentpass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="Input"
                            style={{ width: "100", marginTop: "10px" }}
                            name="password"
                            value={confirmPass}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="Input"
                            style={{ width: "100", marginTop: "10px" }}
                            name="confirmpass"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            required
                        />
                    </div>
                </div>
                    <button className="myButton" style={{ marginTop: "10px",marginLeft:"5px",cursor:"pointer" }} onClick={changePass}>
                        Submit
                    </button>
                </div>


    </Modal>
  );
}

export default SettingsModal;