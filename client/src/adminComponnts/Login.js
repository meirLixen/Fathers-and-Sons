import "./Login.css";
import { useHistory } from "react-router-dom";
import { useContext,  useRef } from "react";
import UserContext from "../UserContext";
import loginAdmin from "../services/loginAdmin";
import cookies from "../cookies/cookies";
function Login() {
  const user = { email: "m0527685598@gmail.com", password: "12345678" };
  const history = useHistory();
  const globalState = useContext(UserContext);
  const iconGearRef = useRef(null);
  const buttonSubmit = useRef(null);
  const inputMail = useRef(null);
  const inputPoss = useRef(null);

  const formOnSubmit = (Event) => {
    Event.preventDefault();

    loginButton();
  };

  const loginButton = () => {
    iconGearRef.current.style.display = "block";
    buttonSubmit.current.style.pointerEvents = "none";
    loginAdmin(user)
      .then((v) => {
        iconGearRef.current.style.display = "none";
        buttonSubmit.current.style.pointerEvents = "auto";
        if (typeof v === "string") {
          alert(v);
        } else {
          globalState.setToken({ adminToken: v.token });
          cookies.setCookie("_token_to_matmidim", v.token);
          history.push("/admin");
        }
      })
      .catch((v) => {
        alert(v);
      });
  };

  return (
    <div className="login_page">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              התחבר לאזור הניהול
            </h2>
          </div>
          <form
            onSubmit={(Event) => formOnSubmit(Event)}
            className="mt-8 space-y-6"
          >
            <input type="hidden" name="remember" ref={inputMail} />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                defaultValue={"m0527685598@gmail.com"}
                  ref={inputPoss}
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
                  id="tzPassword"
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
            <div>
              <button
                ref={buttonSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
export default Login;
