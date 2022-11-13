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
  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  const [click3, setClick3] = useState(false)
  const [click4, setClick4] = useState(false)
  const [click5, setClick5] = useState(false)
  const [allEIPs, setAllEIPs] = useState(0)

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

  // set click
  function setClick1Function(bool) {
    const set = () => {
      setClick1(bool)
    }
    return set()
  }

  function setClick2Function(bool) {
    const set = () => {
      setClick2(bool)
    }
    return set()
  }
  function setClick3Function(bool) {
    const set = () => {
      setClick3(bool)
    }
    return set()
  }
  function setClick4Function(bool) {
    const set = () => {
      setClick4(bool)
    }
    return set()
  }
  function setClick5Function(bool) {
    const set = () => {
      setClick5(bool)
    }
    return set()
  }

  function setAllEIPsFunction(num) {
    const set = () => {
      setAllEIPs(num)
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
        click1,
        click2,
        click3,
        click4,
        click5,
        allEIPs,
        setClick1Function,
        setClick2Function,
        setClick3Function,
        setClick4Function,
        setClick5Function,
        setAllEIPsFunction,
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
