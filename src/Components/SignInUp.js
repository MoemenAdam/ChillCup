import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import styles from "../Style/SignInUp.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
  
const SignInUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    id: `user-${nanoid()}`,
    name: "",
    imgSrc:
      "https://lh3.google.com/u/0/d/1UYHQVGpNSk558ce-_D9D6I7Q95zF9tRa=w1920-h979-iv1",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    role: "",
    previousOrders: [],
    cart: [],
    favorites: [],
  });

  const [users, setUsers] = useState([]);
  const [userLogIn, setUserLogIn] = useState({});
  const { setLoggedInUser } = useContext(UserContext);
  const [activePanel, setActivePanel] = useState(styles.rightPanelActive);
  
  const handleSignUpChange = (e) => {
    let { name, value } = e.target;
    // make email lowercase
    if (name === "email") value = value.toLowerCase();
    console.log(name, value);
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  const handleSignInChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase();
    setUserLogIn({ ...userLogIn, [name]: value });
  };

  useEffect(() => {
    axios.get("https://chillcupjson.onrender.com/Users").then((res) => {
      setUsers(res.data);
    });
  }, []);



  const SignIn = (e) => {
    e.preventDefault();
    const foundUser = users.filter((user) => user.email === userLogIn?.inEmail);

    if(!foundUser.length) {
      toast.error('User Not Found !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else if(foundUser[0].password !== userLogIn?.inPassword) {
      toast.error('Check Password Again !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    else {
      toast.success('User Logged In Successfully !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      setLoggedInUser(foundUser[0].id);
    }

  }

  const checkUserUnique = (e) => {
    e.preventDefault();
    const foundUser = users.filter((user) => user.email === userSignUp?.email);

    if(foundUser.length) {
      toast.error('User Already Exists !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

    else {
      axios.post("https://chillcupjson.onrender.com/Users", userSignUp);
      toast.success('User Created Successfully !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

      setUsers([...users, userSignUp]);
      setActivePanel('')
    }

  }

  return (
    <div className={styles.body}>
      <ToastContainer />
      <div className={`${styles.container} ${activePanel}`}>
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>

          <form action="" onSubmit={checkUserUnique}>
            <h2>Create your account</h2>
            <div>
              <label htmlFor="user-name">User Name</label>
              <input
                type="text"
                id="user-name"
                name="name"
                value={userSignUp.name}
                onChange={handleSignUpChange}
                required
                pattern="[a-z A-Z]*"
              />
            </div>

            <div>
              <label htmlFor="user-email">User Email</label>
              <input
                type="email"
                id="user-email"
                name="email"
                value={userSignUp.email}
                onChange={handleSignUpChange}
                required
              />
            </div>

            <div>
              <label htmlFor="user-password">User Password</label>
              <input
                type="password"
                id="user-password"
                name="password"
                value={userSignUp.password}
                onChange={handleSignUpChange}
                required
              />
            </div>

            <div>
              <label htmlFor="user-phone">User Phone Number</label>
              <input
                type="number"
                id="user-phone"
                name="phoneNumber"
                value={userSignUp.phoneNumber}
                onChange={handleSignUpChange}
                required
              />
            </div>

            <div>
              <label htmlFor="user-address">User Address</label>
              <input
                type="text"
                id="user-address"
                name="address"
                value={userSignUp.address}
                onChange={handleSignUpChange}
                required
              />
            </div>

            <button type="submit" className={`${styles.signBtn} ${styles.signIn}`}> Sign Up</button>
          </form>   
        </div>
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form action="" onSubmit={SignIn}>
            <h2>Sign In</h2>
            <div>
              <label htmlFor="user-sign-email">User Email</label>
              <input
                type="text"
                id="user-in-email"
                name="inEmail"
                value={userLogIn?.email}
                onChange={handleSignInChange}
              />
            </div>
            <div>
              <label htmlFor="user-in-password">User Password</label>
              <input
                type="password"
                id="user-in-password"
                name="inPassword"
                value={userLogIn?.password}
                onChange={handleSignInChange}
              />
            </div>
            <button type="submit" className={`${styles.signBtn} ${styles.signIn}`}>
              Sign In
            </button>
          </form>
        </div>
        <div className={`${styles.overlayContainer}`}>
            <div className={`${styles.overlay}`}>
                <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className={`${styles.signBtn} ${styles.ghost}`} onClick={() => setActivePanel('')}>Sign In</button>
                </div>
                <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                  <h1>Hello, Friend!</h1>
                  <p>your personal details and start journey with us</p>
                  <button className={`${styles.signBtn} ${styles.ghost}`} onClick={() => setActivePanel(styles.rightPanelActive)}>Sign Up</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
