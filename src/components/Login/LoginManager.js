import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../FirebaseConfig/Firebase.config';


export const initializeLoginFrameworks = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const singedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
            }
            return singedInUser
        }).catch(err => {
            console.log(err);
        })

}


export const handleSignOut = () => {

    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signOutUser;
        }).catch(err => {
            console.log(err)

        })
}


// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             const newUser = { ...user };
//             newUser.error = ''
//             newUser.success = true;
//             setUser(newUser)
//             console.log(res);
//             updateUserName(user.name)
//         }).catch(error => {
//             const newUser = { ...user };
//             newUser.error = error.message;
//             newUser.success = false;
//             setUser(newUser)
//         })
// }
// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             const newUser = { ...user };
//             newUser.error = ''
//             newUser.success = true;
//             setUser(newUser)
//             setLoggedInUser(newUser)
//             history.replace(from);/// route
//             console.log(res);
//         }).catch(error => {
//             const newUser = { ...user };
//             newUser.error = error.message;
//             newUser.success = false;
//             setUser(newUser)
//         })

// }

export const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(res => {
        console.log("Update successful.")
    }).catch(function (error) {
        console.log("An error happened.")
    });
}
// const LoginManager = () => {
//     return (
//         <div>

//         </div>
//     );
// }

// export default LoginManager;
