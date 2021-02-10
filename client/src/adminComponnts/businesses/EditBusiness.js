import "./EditBusiness.css";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

import cookies from "../../cookies/cookies";
import editBusiness from "../../services/editBusiness";
function EditBusiness() {
  const globalState = useContext(UserContext);
  const business = globalState.temporaryStorage;
  const setBusiness = globalState.setTemporaryStorage;
  const history = useHistory();
  const iconGearRef = useRef(null);
  const buttonSubmit = useRef(null);

  useEffect(() => {
    if (
      !globalState.token.adminToken &&
      !cookies.getCookie("_token_to_matmidim")
    ) {
      return history.push("/admin_login");
    } else if (!globalState.temporaryStorage) {
      return history.push("/admin_businesses");
    } else {
      business.password = "";
      setBusiness({ ...business });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goBack = () => history.push("/admin_businesses");

  const formOnSubmit = (Event) => {
    Event.preventDefault();

    iconGearRef.current.style.display = "block";
    buttonSubmit.current.style.pointerEvents = "none";

    business.phone = +business.phone;
    editBusiness(
      globalState.token.adminToken || cookies.getCookie("_token_to_matmidim"),
      business
    )
      .then((v) => {
        iconGearRef.current.style.display = "none";
        buttonSubmit.current.style.pointerEvents = "auto";

        if (typeof v === "string" && v !== "הנתונים נשמרו") {
          alert(v);
        } else if (v !== "הנתונים נשמרו") {
          console.log(v);
        }
        history.push("/admin_businesses");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit_business">
      {!business ? null : (
        <div>
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
                  עריכת בית עסק
                </h2>
              </div>
              <form
                onSubmit={(Event) => formOnSubmit(Event)}
                className="mt-8 space-y-6"
              >
                {/* <input type="hidden" name="remember" value="true" /> */}
                <div dir="rtl" className="rounded-md shadow-sm -space-y-px">
                  <div className="label_and_input">
                    <label htmlFor="firstname">מותג:</label>
                    <input
                      id="brand"
                      value={business.brand}
                      type="text"
                      required
                      minLength="2"
                      maxLength="30"
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                      placeholder="מותג"
                      onChange={(e) => {
                        business.brand = e.target.value;
                        setBusiness({ ...business });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="amountToPay">סכום לתשלום:</label>
                    <input
                      id="amountToPay"
                      value={business.amountToPay.toString()}
                      type="text"
                      pattern="\d{1,3}(?:[.]\d{2})"
                      required
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="אמייל"
                      onChange={(e) => {
                        business.amountToPay = e.target.value;
                        setBusiness({ ...business });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="lastName">אמייל:</label>
                    <input
                      id="email"
                      value={business.email}
                      type="email"
                      required
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="אמייל"
                      onChange={(e) => {
                        business.email = e.target.value;
                        setBusiness({ ...business });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="id">איש קשר:</label>
                    <input
                      id="contact"
                      value={business.contact}
                      type="text"
                      required
                      minLength="2"
                      maxLength="30"
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="איש קשר"
                      onChange={(e) => {
                        business.contact = e.target.value;
                        setBusiness({ ...business });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="points">טלפון:</label>
                    <input
                      id="phone"
                      value={business.phone}
                      type="number"
                      required
                      min="10000000"
                      max="1000000000000000"
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="טלפון"
                      onChange={(e) => {
                        business.phone = +e.target.value;
                        setBusiness({ ...business });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="numberFromCard">סיסמה:</label>
                    <input
                      id="password"
                      value={business.password}
                      type="text"
                      minLength="7"
                      maxLength="30"
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="סיסמה"
                      onChange={(e) => {
                        business.password = e.target.value;
                        setBusiness({ ...business });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="moreDetails">פרטים נוספים:</label>
                    <textarea
                      id="moreDetails"
                      value={business.moreDetails}
                      type="text"
                      maxLength="200"
                      className="edit_business_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="פרטים נוספים"
                      onChange={(e) => {
                        business.moreDetails = e.target.value;
                        setBusiness({ ...business });
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
                    עריכת בית עסק
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBusiness;
