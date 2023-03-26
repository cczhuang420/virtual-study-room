import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut
} from "firebase/auth"
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
  }, [auth, signInWithEmailAndPassword])

  const signup = useCallback(async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.error(e)
    }
  }, [auth, createUserWithEmailAndPassword])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (e) {
      console.error(e)
    }
  }, [auth, signOut])

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      setCurrentUser(user)
    })
  }, [])

  const value = useMemo(() => ({
    login,
    signup,
    getCurrentUser: () => currentUser,
    logout
  }), [currentUser])

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )

}

export default AuthProvider

export const useAuth = () => useContext(context)
