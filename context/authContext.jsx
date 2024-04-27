import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth, db } from "../firebaseConfig";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() =>{
        const unsub = onAuthStateChanged(auth, (user) =>{
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        return unsub;
    },[])
    const updateUserData = async (userId) =>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username :data.username, profileUrl:data.profileUrl, userId: data.userId, rol: data.rol});
        }
    }
    const login = async (email, password)=>{
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {status:"success", message:response};
        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg= 'Invalid Email';
            else if(msg.includes("(auth/invalid-credential)")) msg="Wrong Credentials";
            return { success: false, msg: error.message};
        }
    }

    const logout = async ()=>{
        try {
            await signOut(auth);
            return {success : true}
        } catch (error) {
            return {success: false, msg: error.message, error:error}
        }
    }

    const register = async (email, password, username, profileUrl, rol)=>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            
            setUser(response?.user);
            setIsAuthenticated(true);
            await setDoc(doc(db, "users", response?.user?.uid),{
                username,
                profileUrl,
                rol,
                userId : response?.user?.uid
            })
            return{ success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg= 'Invalid Email'; 
            else if(msg.includes("(auth/email-already-in-use)")) msg='This email is already in use'
            return { success: false, msg: error.message};
        }
    }
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error("useAuth must be wrapped inside AuthContextProvider")
    }
    return value;
}