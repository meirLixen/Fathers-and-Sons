import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import cookies from "../cookies/cookies";
import "./Home.css";
function Home() {
  const divRef = useRef(null);
  const history = useHistory();
  const globalState = useContext(UserContext);

  const newDeal = () => {
    if (
      !globalState.token.businessToken &&
      !cookies.getCookie("_business_token_to_matmidim")
    ) {
      history.push("/sign_in_page");
    } else {
      history.push("/enter_deal_details");
      console.log(globalState.token);
    }
  };


  return (
    <div dir="rtl" className="home_page flex items-center 	">
      <h2 className="mt-6 mb-6 text-center text-4xl font-extrabold text-gray-900">
        מתמידים
      </h2>
      <button
        type="button"
        className="mt-3  inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={newDeal}
      >
        עסקה חדשה
      </button>
      <div
        style={{ display: "none" }}
        className="mt-6 items-center"
        ref={divRef}
      >
        <span dir="rtl">רק רגע...</span>
        <svg className="abc inline mr-1" height="20" width="20">
          <circle
            cx="10"
            cy="10"
            r="7"
            stroke="black"
            strokeWidth="3"
            fill="white"
          />
          <path stroke="white" strokeWidth="3" d="M10 10 10 20" />
          Sorry, your browser does not support inline SVG.
        </svg>
      </div>
    </div>
  );
}
export default Home;
