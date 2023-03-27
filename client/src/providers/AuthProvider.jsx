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
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth"
import {auth} from "../firebase.js";

const context = createContext({})

const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()

const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(null)

  const login = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }, [auth, signInWithEmailAndPassword])

  const signup = useCallback(async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }, [auth, createUserWithEmailAndPassword])

  const googleSignIn = useCallback(async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }, [auth, signInWithPopup, googleAuthProvider])

  const githubSignIn = useCallback(async () => {
    await signInWithPopup(auth, githubAuthProvider)
  }, [auth, signInWithPopup, githubAuthProvider])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (e) {
      console.error(e)
    }
  }, [auth, signOut])

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      console.log("Auth state changed")
      console.log(user)
      setCurrentUser(user)
    })
  }, [])

  const value = useMemo(() => ({
    login,
    signup,
    getCurrentUser: () => currentUser,
    logout,
    googleSignIn,
    githubSignIn
  }), [currentUser])

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )

}

export default AuthProvider

export const useAuth = () => useContext(context)
