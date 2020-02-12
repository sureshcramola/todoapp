import Login from "../containers/Authentication/Login";
import Dashboard from "../containers/UserManagement/Dashboard";
import Account from "../containers/UserManagement/Account";

const routes = [
  {
    path: "/",
    exact: true,
    component: Login,
    private: false
  },
  {
    path: "/dashboard",
    exact: false,
    component: Dashboard,
    private: true
  },
  {
    path: "/account",
    exact: false,
    component: Account,
    private: true
  }
];

export default routes;