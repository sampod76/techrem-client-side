// import React, { useContext, useEffect, useState } from 'react';
// import { createContext } from 'react';
// import {
//     createUserWithEmailAndPassword,
//     getAuth,
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     sendPasswordResetEmail,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     signOut,
//     updateProfile
// } from 'firebase/auth';
// import app from '../firebase/firebase.config';

// export const AuthContext = createContext();
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     }
//     const signInFunc = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     }
//     const updateUser = (userInfo) => {
//         return updateProfile(auth.currentUser, userInfo);
//     }
//     const googleLogin = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleProvider);
//     }
//     const passwordReset = (email) => {
//         setLoading(true);
//         return sendPasswordResetEmail(auth, email);
//     }
//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     }

//     useEffect(() => {
//         const unSubscribe = onAuthStateChanged(auth, currentUser => {
//             setUser(currentUser);
//             setLoading(false);
//             console.log(currentUser)
//         })
//         return () => unSubscribe();
//     }, [])
//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         signInFunc,
//         updateUser,
//         googleLogin,
//         passwordReset,
//         logOut,

//     };
//     return (
//         <AuthContext.Provider value={authInfo} >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     return context;
// }
// export default AuthProvider;
