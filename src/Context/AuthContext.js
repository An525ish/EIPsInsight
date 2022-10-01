/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

/* eslint-disable react/react-in-jsx-scope */

import { useContext, useState } from 'react'
import { createContext } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth'

import { useEffect } from 'react'
import { auth } from 'src/firebase/firebase.config'

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('')
  const [imageOpen, setImageOpen] = useState('enable')
  const [adminLogin, setAdminLogin] = useState(false)

  // admin Check
  // function adminCheck() {
  //   const set = () => {
  //     setAdminLogin(true)

  //     setUser({
  //       displayName: 'Admin',
  //       email: 'Admin@avarch.com',
  //     })
  //   }
  //   return set()
  // }
  // function adminCheckAgain() {
  //   const set = () => {
  //     setAdminLogin(!adminLogin)
  //     setUser('')
  //   }
  //   return set()
  // }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function logOut() {
    return signOut(auth)
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }

  function githubSignIn() {
    const githubAuthProvider = new GithubAuthProvider()
    return signInWithPopup(auth, githubAuthProvider)
  }

  function setImageFunction() {
    const set = () => {
      setImageOpen('enable')
    }
    return set()
  }
  function setImageFunction1() {
    const set = () => {
      setImageOpen('enable')
    }
    return set()
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: 'https://eipsinsight.com/#/login',
    })
  }

  function ResetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <userAuthContext.Provider
      value={{
        imageOpen,
        user,
        signUp,
        logIn,
        logOut,
        googleSignIn,
        setImageFunction,
        setImageFunction1,
        githubSignIn,
        forgotPassword,
        ResetPassword,
        adminLogin,
        // adminCheck,
        // adminCheckAgain,
      }}
    >
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
