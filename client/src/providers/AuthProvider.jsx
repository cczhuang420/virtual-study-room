import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth} from "firebase/auth"
import {auth} from "../firebase.js";
import {useNavigate} from "react-router-dom"

const context = createContext({})

const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate()

  const login = useCallback(async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const signup = useCallback(async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      console.log(user)
      setCurrentUser(user)
      if (user) {
        navigate("/public-rooms")
      } else {
        navigate("login")
      }
    })
  }, [])

  const value = useMemo(() => ({
    login,
    signup,
    getCurrentUser: () => currentUser
  }), [currentUser])

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )

}

export default AuthProvider

export const useAuth = () => useContext(context)
