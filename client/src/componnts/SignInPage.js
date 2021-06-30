import "./signInPage.css";
import { useHistory } from "react-router-dom";
import loginBusiness from "../services/loginBusiness";
import UserContext from "../UserContext";
import cookies from "../cookies/cookies";
import { useContext, useRef } from "react";

function SignInPage() {
  const iconGearRef = useRef(null);
  const buttonSubmit = useRef(null);
  const user = { email: "israel@israel.co.il", password: "12345678" };
  const globalState = useContext(UserContext);
  const history = useHistory();
  let remember = false;

  const formOnSubmit = (Event, remember) => {
    Event.preventDefault();

    signInButton(remember);
  };

  const signInButton = (remember) => {
    iconGearRef.current.style.display = "block";
    buttonSubmit.current.style.pointerEvents = "none";
    loginBusiness(user)
      .then((v) => {
        iconGearRef.current.style.display = "none";
        buttonSubmit.current.style.pointerEvents = "auto";
        if (v.token) {
          globalState.setToken({ businessToken: v.token });
          if (remember) {
            cookies.setCookie("_business_token_to_matmidim", v.token, 30000);
          } else {
            cookies.setCookie("_business_token_to_matmidim", v.token);
          }

          history.push("/enter_deal_details");
        } else {
          console.log(v);
          alert(v);
        }
      })
      .catch((v) => {
        alert(v);
      });
  };
  return (
    <div className="sign_in_page">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              התחבר לחשבון שלך
            </h2>
          </div>
          <form
            onSubmit={(Event) => formOnSubmit(Event, remember)}
            className="mt-8 space-y-6"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                defaultValue={"israel@israel.co.il"}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="email_and_password appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  placeholder="כתובת מייל"
                  onChange={(e) => {
                    user.email = e.target.value;
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                defaultValue={"12345678"}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="email_and_password appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="סיסמה"
                  onChange={(e) => {
                    user.password = e.target.value;
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  onChange={(e) => (remember = e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  זכור אותי
                </label>
              </div>
            </div>

            <div>
              <button
                ref={buttonSubmit}
                type="submit"
                className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <img
                    ref={iconGearRef}
                    className="icon_gear"
                    style={{ display: "none" }}
                    src="https://img.icons8.com/ios-filled/50/000000/gear.png"
                    alt="img"
                  />
                </span>
                התחבר
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignInPage;
