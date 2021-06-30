import "./AddBusiness.css";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import cookies from "../../cookies/cookies";
import addBusiness from "../../services/addBusiness";
function AddBusiness() {
  const iconGearRef = useRef(null);
  const buttonSubmit = useRef(null);
  const newBusiness = {
    brand: "",
    contact: "",
    phone: 0,
    email: "",
    password: "",
  };
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
  const goBack = () => history.push("/admin_businesses");

  const formOnSubmit = (Event) => {
    Event.preventDefault();
    iconGearRef.current.style.display = "block";
    buttonSubmit.current.style.pointerEvents = "none";

    addBusiness(
      globalState.token.adminToken || cookies.getCookie("_token_to_matmidim"),
      newBusiness
    )
      .then((v) => {
        iconGearRef.current.style.display = "none";
        buttonSubmit.current.style.pointerEvents = "auto";
        if (typeof v === "string" && v !== "created business in DB") {
          alert(v);
        } else if (v !== "created business in DB") {
          console.log(v);
        }
        history.push("/admin_businesses");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="add_business">
      <button
        onClick={goBack}
        className="go_back h-20 w-40 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        חזור אחורה{" "}
      </button>
      <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              הוספת בית עסק
            </h2>
          </div>
          <form
            onSubmit={(Event) => formOnSubmit(Event)}
            className="mt-8 space-y-6"
          >
            <input type="hidden" name="remember" value="true" />
            <div dir="rtl" className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only"></label>
                <input
                  type="text"
                  required
                  minLength="2"
                  maxLength="30"
                  className="add_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  placeholder="מותג"
                  onChange={(e) => {
                    newBusiness.brand = e.target.value;
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only"></label>
                <input
                  type="text"
                  autoComplete="current-password"
                  required
                  minLength="2"
                  maxLength="50"
                  className="add_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="איש קשר"
                  onChange={(e) => {
                    newBusiness.contact = e.target.value;
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {/* Password */}
                </label>
                <input
                  //   id="password"
                  //   name="password"
                  type="number"
                  autoComplete="current-password"
                  required
                  min="100000000"
                  max="999999999"
                  className="add_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="טלפון"
                  onChange={(e) => {
                    newBusiness.phone = +e.target.value;
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only"></label>
                <input
                  type="email"
                  required
                  className="add_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="כתובת אמייל"
                  onChange={(e) => {
                    newBusiness.email = e.target.value;
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only"></label>
                <input
                  type="text"
                  autoComplete="current-password"
                  required
                  minLength="8"
                  maxLength="30"
                  className="add_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="סיסמה"
                  onChange={(e) => {
                    newBusiness.password = e.target.value;
                  }}
                />
              </div>
            </div>

            <div>
              <button
                ref={buttonSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="span_icon_gear absolute inset-y-0 flex items-center pl-3">
                  <img
                    ref={iconGearRef}
                    className="icon_gear"
                    style={{ display: "none" }}
                    src="https://img.icons8.com/ios-filled/50/000000/gear.png"
                    alt="img"
                  />
                </span>
                הוספת בית עסק
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddBusiness;
