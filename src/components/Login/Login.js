import React, { useState, useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFrameworks, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


const Login = () => {

    initializeLoginFrameworks();

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);/// route

            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res)
                setLoggedInUser(res);
            })
    }

    const [newUserInfo, setNewUserInfo] = useState(false)

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: ''
    })

    const handleSubmit = (e) => {

        if (newUserInfo && user.email && user.password) {
            // setUser(newUser)
            createUserWithEmailAndPassword(user.name, user.email, user.password)// must maintain serialize
                .then(res => {
                    setUser(res)
                    setLoggedInUser(res);
                    history.replace(from);/// route
                })
        }

        if (!newUserInfo && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res)
                    setLoggedInUser(res);
                    history.replace(from);/// route
                })
        }
        e.preventDefault();
    }


    const handleChange = (e) => {
        let isValid = true;
        // console.log(e.target.name, e.target.value)
        if (e.target.name === 'email') {
            const re = /\S+@\S+\.\S+/;
            isValid = re.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isValid = passwordHasNumber && isPasswordValid;
        }
        if (isValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };


    return (
        <div style={{ textAlign: 'center' }}>

            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
            }
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name} </p>
                    <p>Your email : {user.email} </p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our Won Authentication </h1>
            <input type="checkbox" onChange={() => setNewUserInfo(!newUserInfo)} name="newUserInfo" id="" />
            <label htmlFor="newUserInfo">New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUserInfo && <input type="text" name='name' placeholder="name" onBlur={handleChange} required />} <br />
                <input type="email" name='email' onBlur={handleChange} placeholder="Your email address" required /> <br />
                <input type="password" name="password" onBlur={handleChange} placeholder="Your password" required />
                <br />
                <input type="submit" value={newUserInfo ? 'Sign up' : 'Sing In'} />
            </form>
            <p style={{ color: 'red' }}>  {user.error} </p>
            {user.success && <p style={{ color: 'green' }}>  User {newUserInfo ? 'created' : 'Logged In'} successfully </p>}
        </div>
    );
}

export default Login;