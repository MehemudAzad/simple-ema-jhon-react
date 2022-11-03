import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config';
// import app from '../firebase/firebase.init';


export const AuthContext = createContext();//we are creating the context

const auth = getAuth(app);//we get the app from firebase.init.js

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //creating the email and password account
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, password, email);
    }
    //for sign in functionality
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, password, email);
    }
    //for log out functionality
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    //getting the value of the user
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            console.log('current user inside' ,currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return ()=> unsubscribe();
    },[])

    const authInfo = {user, createUser, signIn, logOut};

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;//exporting the fuction usecontext 

//we only write jsx insite the return of a fuction