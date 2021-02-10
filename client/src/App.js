import React, { useState } from "react";
import Home from "./componnts/home";
import CreditPage from "./componnts/CreditPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignInPage from "./componnts/SignInPage";
import Admin from "./adminComponnts/Admin";
import Login from "./adminComponnts/Login";
import UserContext from "./UserContext";
import Businesses from "./adminComponnts/businesses/Businesses";
import Pupils from "./adminComponnts/pupils/Pupils";
import "./App.css";
import AddPupil from "./adminComponnts/pupils/AddPupil";
import EditPupil from "./adminComponnts/pupils/EditPupil";
import AddBusiness from "./adminComponnts/businesses/AddBusiness";
import EditBusiness from "./adminComponnts/businesses/EditBusiness";
import EnterDealDetails from "./componnts/EnterDealDetails";
import Deals from "./adminComponnts/deals/Deals";
const UserProvider = UserContext.Provider;

function App() {
  const [token, setToken] = useState({});
  const [temporaryStorage, setTemporaryStorage] = useState(null);

  const globalState = {
    token,
    setToken,
    temporaryStorage,
    setTemporaryStorage,
  };
  return (
    <UserProvider value={globalState}>
      <div>
        <Router>
          <Switch>
            {/* admin componnts */}
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/admin_deals">
              <Deals />
            </Route>
            <Route exact path="/admin_add_business">
              <AddBusiness />
            </Route>

            <Route exact path="/admin_login">
              <Login />
            </Route>
            <Route exact path="/admin_businesses">
              <Businesses />
            </Route>
            <Route exact path="/admin_pupils">
              <Pupils />
            </Route>

            <Route exact path="/admin_add_pupil">
              <AddPupil />
            </Route>
            <Route exact path="/admin_edit_pupil">
              <EditPupil />
            </Route>
            <Route exact path="/admin_edit_business">
              <EditBusiness />
            </Route>
            {/* businesses componnts */}
            <Route exact path="/sign_in_page">
              <SignInPage />
            </Route>
            <Route exact path="/enter_deal_details">
              <EnterDealDetails />
            </Route>

            <Route exact path="/credit_page">
              <CreditPage />
            </Route>
            <Route exact path="/">
              <Link to="admin">admin</Link>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}
export default App;
