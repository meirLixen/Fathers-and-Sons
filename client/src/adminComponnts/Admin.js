import "./Admin.css";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import cookies from "../cookies/cookies";

function Admin() {
  const globalState = useContext(UserContext);

  const history = useHistory();
  useEffect(() => {
    if (
      !globalState.token.adminToken &&
      !cookies.getCookie("_token_to_matmidim")
    ) {
      return history.push("/admin_login");
    }
  });
  const toPupilsPage = () => {
    history.push("/admin_pupils");
  };
  const toBusinessesPage = () => {
    history.push("/admin_businesses");
  };
  return (
    <div>
      {!globalState.token.adminToken &&
      !cookies.getCookie("_token_to_matmidim") ? null : (
        <div className="admin_page">
          <button
            onClick={toPupilsPage}
            className="h-24 w-96 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            תלמידים
          </button>
          <button
            onClick={toBusinessesPage}
            className="h-24 w-96 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            בתי עסק
          </button>
        </div>
      )}
    </div>
  );
}
export default Admin;
