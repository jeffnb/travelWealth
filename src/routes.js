import React from "react"

const Wallet = React.lazy(() => import("./views/Wallet/Wallet"))
const Cards = React.lazy(() => import("./views/Cards/Cards"))
const Users = React.lazy(() => import("./views/Users/Users"))
const Classroom = React.lazy(() => import("./views/Classroom"))
const RequestFlights = React.lazy(() => import("./views/RequestFlights"))
const RequestHotel = React.lazy(() => import("./views/RequestHotel"))
const ManageWallet = React.lazy(() => import("./views/ManageWallet"))
const Referral = React.lazy(() => import("./views/Referral"))
const ResetPassword = React.lazy(() => import("./views/Pages/ResetPassword"))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/wallet", exact: true, name: "Wallet", component: Wallet },
  { path: "/classroom", exact: true, name: "Classroom", component: Classroom },
  {
    path: "/request-flights",
    exact: true,
    name: "Request Flights",
    component: RequestFlights
  },
  {
    path: "/request-hotel",
    exact: true,
    name: "Request Hotel",
    component: RequestHotel
  },
  {
    path: "/referral",
    exact: true,
    name: "Referral",
    component: Referral
  },
  {
    path: "/resetPassword",
    exact: true,
    name: "Reset Password",
    component: ResetPassword
  },
  {
    path: "/manage-wallet",
    exact: true,
    name: "Manage Wallet",
    component: ManageWallet
  },
  {
    path: "/cards",
    exact: true,
    name: "Cards",
    component: Cards
  },
  {
    path: "/users",
    exact: true,
    name: "Users",
    component: Users
  }
]

export default routes
