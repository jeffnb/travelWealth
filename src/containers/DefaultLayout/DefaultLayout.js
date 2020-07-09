import React, { Suspense } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import * as router from "react-router-dom"
import { Container } from "reactstrap"

import {
  AppAside,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react"
// sidebar nav config
import navigation from "../../_nav"
// routes config
import routes from "../../routes"
import UpdatePayment from "../../views/UpdatePayment"

const DefaultAside = React.lazy(() => import("./DefaultAside"))
const DefaultHeader = React.lazy(() => import("./DefaultHeader"))

function DefaultLayout(props) {
  function loading() {
    return <></>
  }

  function signOut(e) {
    e.preventDefault()
    props.history.push("/login")
  }
  return (
    <div className="app">
      <AppHeader fixed className="bg-light text-primary">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={(e) => signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body bg-light">
        <AppSidebar fixed display="lg" className="bg-light">
          <AppSidebarHeader className="bg-light" />
          <AppSidebarForm className="bg-light" />
          <Suspense className="bg-light">
            <AppSidebarNav
              navConfig={navigation}
              {...props}
              router={router}
              className="bg-light"
            />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main bg-dark">
          <Container fluid>
            <Suspense fallback={loading()} className="bg-light">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null
                })}
                <Route path="/updatePayment" component={UpdatePayment} />
                <Redirect from="/" to="/wallet" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed className="bg-light">
          <Suspense fallback={loading()} className="bg-light">
            <DefaultAside className="bg-light" />
          </Suspense>
        </AppAside>
      </div>
    </div>
  )
}

export default DefaultLayout
