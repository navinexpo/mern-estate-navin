import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
  const dispatch = useDispatch();
  const navgiate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      //create pop req
      const result = await signInWithPopup(auth, provider);
      //   console.log(result);
      //Have to send the necessary info to the backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log("data from Outh", data)
      navgiate("/");
      console.log("Data from dispatch-->", data)
    } catch (error) {
      console.log("Could not sign in to the google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
