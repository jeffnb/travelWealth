import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

// action type definitions
const GET_ALL_CLASSES = "GET_ALL_CLASSES"
// const GET_CREDIT_INFO_CLASS = "GET_CREDIT_INFO_CLASS";
// const GET_SHOPPING_INFO = "GET_SHOPPING_INFO";
// const GET_TRAVEL_BOOKING_INFO = "GET_TRAVEL_BOOKING_INFO";
// const GET_TRAVEL_GUIDES = "GET_TRAVEL_GUIDES";

// initial state
const initialState = {
  classes: []
}

// reducer (MUST BE DEFAULT EXPORT)
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CLASSES:
      console.log(action.payload)
      return {
        ...state,
        classes: action.payload
      }
    // case GET_CREDIT_INFO_CLASS:
    //   return {
    //     ...state,
    //     classes: action.payload
    //   };
    // case GET_SHOPPING_INFO:
    //   return {
    //     ...state,
    //     classes: action.payload
    //   };
    // case GET_TRAVEL_BOOKING_INFO:
    //   return {
    //     ...state,
    //     classes: action.payload
    //   };
    // case GET_TRAVEL_GUIDES:
    //   return {
    //     ...state,
    //     classes: action.payload
    //   };
    default:
      return state
  }
}
// action creators
function getClasses() {
  return dispatch => {
    const accessToken = window.localStorage.getItem("token")
    axios.defaults.headers.common["Authorization"] = "Token " + accessToken
    axios
      .get("/classroom/")
      .then(resp => {
        dispatch({
          type: GET_ALL_CLASSES,
          payload: resp.data
        })
      })
      .catch(e => {
        console.error("ERROR", e)
      })
  }
}
//TODO maybe we will need this in this in the future?
// function getCreditInfo() {
//   return dispatch => {
//     const accessToken = window.localStorage.getItem("token");
//     axios.defaults.headers.common["Authorization"] = "Token " + accessToken;
//     axios
//       .get("/classroom/?category=credit_card_info")
//       .then(resp => {
//         dispatch({
//           type: GET_CREDIT_INFO_CLASS,
//           payload: resp.data
//         });
//       })
//       .catch(e => {
//         console.error("ERROR", e);
//       });
//   };
// }
// function getShoppingInfo() {
//   return dispatch => {
//     const accessToken = window.localStorage.getItem("token");
//     axios.defaults.headers.common["Authorization"] = "Token " + accessToken;
//     axios
//       .get("/classroom/?category=shopping_info")
//       .then(resp => {
//         dispatch({
//           type: GET_SHOPPING_INFO,
//           payload: resp.data
//         });
//       })
//       .catch(e => {
//         console.error("ERROR", e);
//       });
//   };
// }
// function getTravelBookingInfo() {
//   return dispatch => {
//     const accessToken = window.localStorage.getItem("token");
//     axios.defaults.headers.common["Authorization"] = "Token " + accessToken;
//     axios
//       .get("/classroom/?category=travel_booking_info")
//       .then(resp => {
//         dispatch({
//           type: GET_TRAVEL_BOOKING_INFO,
//           payload: resp.data
//         });
//       })
//       .catch(e => {
//         console.error("ERROR", e);
//       });
//   };
// }
// function getTravelGuides() {
//   return dispatch => {
//     const accessToken = window.localStorage.getItem("token");
//     axios.defaults.headers.common["Authorization"] = "Token " + accessToken;
//     axios
//       .get("/classroom/?category=travel_guides")
//       .then(resp => {
//         dispatch({
//           type: GET_TRAVEL_GUIDES,
//           payload: resp.data
//         });
//       })
//       .catch(e => {
//         console.error("ERROR", e);
//       });
//   };
// }

export function useClassroom() {
  const dispatch = useDispatch()
  const classes = useSelector(appState => appState.classRoomState.classes)

  useEffect(() => {
    dispatch(getClasses())
  }, [dispatch])

  return classes
}
