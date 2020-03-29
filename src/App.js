import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
// import { renderRoutes } from 'react-router-config';
import "./App.scss"
import { useAuth } from "./hooks"

const loading = () => <></>

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"))

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"))
const ResetPassword = React.lazy(() => import("./views/Pages/ResetPassword"))
const Registration = React.lazy(() => import("./views/Pages/Registration"))
const PasswordResetForm = React.lazy(() =>
  import("./views/Pages/PasswordResetForm")
)
const Page404 = React.lazy(() => import("./views/Pages/Page404"))
const Page500 = React.lazy(() => import("./views/Pages/Page500"))

const CheckAuth = props => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <Route
      path="/"
      name="Wallet"
      render={props => <DefaultLayout {...props} />}
    />
  ) : (
    <Redirect to="/login" />
  )
}

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={props => <Login {...props} />}
          />
          <Route
            exact
            path="/resetPassword"
            name="Reset Password"
            render={props => <ResetPassword {...props} />}
          />
          <Route
            exact
            path="/reset/:token"
            name="Password Reset Form"
            render={props => <PasswordResetForm {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Registration Page"
            render={props => <Registration {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={props => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={props => <Page500 {...props} />}
          />
          <Route path="*" component={CheckAuth} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
