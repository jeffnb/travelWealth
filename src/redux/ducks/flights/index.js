// imports
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

// action type definitions
const REQUEST_FLIGHT = "auth/REQUEST_FLIGHT"

// initial state
const initialState = {
  routing: "",
  departure_city: "",
  destinations: "",
  depart_date: "",
  return_date: "",
  how_flexible: "",
  preferred_class: "",
  passengers: "",
  passenger_names: "",
  bags: "",
  notes: ""
}

// reducer (MUST BE DEFAULT EXPORT)
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FLIGHT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// action creators
function submitForm(
  routing,
  departure_city,
  destinations,
  depart_date,
  return_date,
  how_flexible,
  preferred_class,
  passengers,
  passenger_names,
  bags,
  notes,
  dispatch
) {
  return dispatch => {
    const accessToken = window.localStorage.getItem("token")
    axios.defaults.headers.common["Authorization"] = "Token " + accessToken
    axios({
      method: "post",
      url: "/customer-requests/flight-request/",
      data: {
        routing,
        departure_city,
        destinations,
        depart_date,
        return_date,
        how_flexible,
        preferred_class,
        passengers,
        passenger_names,
        bags,
        notes
      },
      headers: { Authorization: "Token " + accessToken }
    })
      .then(response => {
        dispatch({
          type: REQUEST_FLIGHT,
          payload: {
            routing,
            departure_city,
            destinations,
            depart_date,
            return_date,
            how_flexible,
            preferred_class,
            passengers,
            passenger_names,
            bags,
            notes
          }
        })
      })
      .catch(function(error) {
        console.log("ERROR", error)
      })
  }
}
// custom hooks
export function useFlights() {
  const dispatch = useDispatch()
  const routing = useSelector(appState => appState.myFlightState.routing)
  const departure_city = useSelector(
    appState => appState.myFlightState.departure_city
  )
  const destinations = useSelector(
    appState => appState.myFlightState.destinations
  )
  const depart_date = useSelector(
    appState => appState.myFlightState.depart_date
  )
  const return_date = useSelector(
    appState => appState.myFlightState.return_date
  )
  const how_flexible = useSelector(
    appState => appState.myFlightState.how_flexible
  )
  const preferred_class = useSelector(
    appState => appState.myFlightState.preferred_class
  )
  const passengers = useSelector(appState => appState.myFlightState.passengers)
  const passenger_names = useSelector(
    appState => appState.myFlightState.passenger_names
  )
  const bags = useSelector(appState => appState.myFlightState.bags)
  const notes = useSelector(appState => appState.myFlightState.notes)

  const requestFlight = (
    routing,
    departure_city,
    destinations,
    depart_date,
    return_date,
    how_flexible,
    preferred_class,
    passengers,
    passenger_names,
    bags,
    notes,
    requestFlight
  ) =>
    dispatch(
      submitForm(
        routing,
        departure_city,
        destinations,
        depart_date,
        return_date,
        how_flexible,
        preferred_class,
        passengers,
        passenger_names,
        bags,
        notes,
        requestFlight
      )
    )

  return {
    routing,
    departure_city,
    destinations,
    depart_date,
    return_date,
    how_flexible,
    preferred_class,
    passengers,
    passenger_names,
    bags,
    notes,
    requestFlight
  }
}
