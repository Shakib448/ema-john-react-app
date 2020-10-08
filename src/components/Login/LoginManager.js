import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../FirebaseConfig/Firebase.config";

export const initializeLoginFrameworks = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const singedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      setUserToken();
      return singedInUser;
    })
    .catch((err) => {
      console.log(err);
    });
};

const setUserToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem("token", idToken);

      // ...
    })
    .catch(function (error) {
      // Handle error
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      return signOutUser;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.error = "";
      newUser.success = true;
      updateUserName(name);
      return newUser;
    })
    .catch((error) => {
      const newUser = {};
      newUser.error = error.message;
      newUser.success = false;
      return newUser;
    });
};
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUser = res.user;
      newUser.error = "";
      newUser.success = true;
      return newUser;
      // setLoggedInUser(newUser)
      // history.replace(from);/// route
      // console.log(res);
    })
    .catch((error) => {
      const newUser = {};
      newUser.error = error.message;
      newUser.success = false;
      return newUser;
    });
};

export const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then((res) => {
      console.log("Update successful.");
    })
    .catch(function (error) {
      console.log("An error happened.");
    });
};
// const LoginManager = () => {
//     return (
//         <div>

//         </div>
//     );
// }

// export default LoginManager;
