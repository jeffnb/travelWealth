// imports
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

let alreadyAuthed = false
function init() {
  const token = window.localStorage.getItem("token")
  if (token) {
    alreadyAuthed = true
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}

init()

// action type definitions
const LOGIN_PENDING = "auth/LOGIN_PENDING"
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS"
const LOGIN_FAILURE = "auth/LOGIN_FAILURE"
const LOGOUT = "auth/LOGOUT"

// initial state
const initialState = {
  isAuthenticated: alreadyAuthed,
  username: "",
  firstName: "",
  is_staff: false,
  lastName: "",
  loading: false,
  error: ""
}

// reducer (MUST BE DEFAULT EXPORT)
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        username: action.payload.username,
        firstName: action.payload.firstName,
        is_staff: action.payload.is_staff,
        lastName: action.payload.lastName
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        username: "",
        error: action.payload
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

// action creators
function login(username, password, dispatch) {
  dispatch({ type: LOGIN_PENDING })
  return new Promise((resolve, reject) => {
    axios
      .post("/api-token-auth/", { username, password })
      .then(resp => {
        const token = resp.data.token
        const userId = resp.data.user_id
        const firstName = resp.data.first_name
        const lastName = resp.data.last_name
        const is_staff = resp.data.is_staff
        window.localStorage.setItem("token", token)
        window.localStorage.setItem("userId", userId)
        window.localStorage.setItem("firstName", firstName)
        window.localStorage.setItem("lastName", lastName)
        window.localStorage.setItem("is_staff", is_staff)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            username,
            firstName,
            lastName,
            is_staff
          }
        })
        resolve()
      })
      .catch(e => {
        window.localStorage.removeItem("token")
        dispatch({
          type: LOGIN_FAILURE,
          payload: e.message
        })
        reject(e)
      })
  })
}

function logout() {
  axios.defaults.headers.common["Authorization"] = ""
  window.localStorage.removeItem("token")
  window.localStorage.removeItem("userId")
  window.localStorage.removeItem("firstName")
  window.localStorage.removeItem("lastName")
  window.localStorage.removeItem("is_staff")
  window.location.reload()
  return { type: LOGOUT }
}

// custom hooks
export function useAuth() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    appState => appState.authState.isAuthenticated
  )
  const username = useSelector(appState => appState.authState.username)
  const userId = useSelector(appState => appState.authState.userId)
  const firstName = useSelector(appState => appState.authState.firstName)
  const lastName = useSelector(appState => appState.authState.lastName)
  const is_staff = useSelector(appState => appState.authState.is_staff)
  const loading = useSelector(appState => appState.authState.loading)
  const error = useSelector(appState => appState.authState.error)
  const signin = (username, password) => login(username, password, dispatch)
  const signout = () => dispatch(logout())

  return {
    isAuthenticated,
    username,
    loading,
    error,
    signin,
    signout,
    userId,
    firstName,
    lastName,
    is_staff
  }
}
