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
  signInAnonymously,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth"
import {auth} from "../firebase.js";
import {useCreateUserHandler, useFetchUserHandler} from "../api/user-api.js";

const context = createContext({})

const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()

const AuthProvider = ({children}) => {

  const createUser = useCreateUserHandler()
  const fetchUsers = useFetchUserHandler()

  const [currentUser, setCurrentUser] = useState(null)

  const login = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }, [auth, signInWithEmailAndPassword])

  const signup = useCallback(async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }, [auth, createUserWithEmailAndPassword])

  const googleSignIn = useCallback(async () => {
    const res = await signInWithPopup(auth, googleAuthProvider)
    const name = res.user.displayName
    const email = res.user.email
    const usersWithSameEmail = (await fetchUsers({email})).data
    if (usersWithSameEmail.length === 0) {
      await createUser(name, email)
    }
    await signInWithPopup(auth, googleAuthProvider)
  }, [auth, signInWithPopup, googleAuthProvider])

  const githubSignIn = useCallback(async () => {
    const res = await signInWithPopup(auth, githubAuthProvider)
    const name = res.user.displayName
    const email = res.user.email
    const usersWithSameEmail = (await fetchUsers({email})).data
    if (usersWithSameEmail.length === 0) {
      await createUser(name, email)
    }
    await signInWithPopup(auth, githubAuthProvider)
  }, [auth, signInWithPopup, githubAuthProvider])

  const anonymousSignIn = useCallback(async () => {
    await signInAnonymously(auth)
  }, [signInAnonymously])

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
    // Authorization
    getAccessToken: () => currentUser.accessToken,
    logout,
    googleSignIn,
    githubSignIn,
    anonymousSignIn
  }), [currentUser])

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )

}

export default AuthProvider

export const useAuth = () => useContext(context)
