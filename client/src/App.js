import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile"
import { Toaster } from "react-hot-toast";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
import OtpVerification from "./components/OtpVerification/OtpVerification";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import AdminAuth from "./pages/Admin/AdminAuth/AdminAuth";
import ForgotPass from "./components/ForgotPass/ForgotPass"
import ResetForm from "./components/ResetForm/ResetForm";
function App() {
  const user = useSelector((state) => state.authReducer.authData)
  const admin = useSelector((state) => state.adminAuthReducer.adminData);
  return (
    <div className="App">
      <div className="blur" style={{ top: '-6%', right: '0' }}></div>
      <div className="blur" style={{ top: '40%', left: '-5rem' }}></div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes >
        <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to='../auth' />} />
        <Route path="/auth" element={user ? <Navigate to='../home' /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
        <Route path='/chat' element={user ? <Chat /> : <Navigate to="../auth" />} />
        <Route path="/otpverification" element={user ? <Navigate to='../home' /> : <OtpVerification />} />
        <Route path='/admin' element={admin ? <AdminPage /> : <AdminAuth />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/resetpass/:token" element={<ResetForm />} />
      </Routes>
    </div>
  );
}

export default App;
