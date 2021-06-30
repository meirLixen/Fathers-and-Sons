import "./EditPupil.css";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import cookies from "../../cookies/cookies";
import editPupil from "../../services/editPupil";
function EditPupil() {
  const globalState = useContext(UserContext);
  const pupil = globalState.temporaryStorage;
  const setPupil = globalState.setTemporaryStorage;
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
      return history.push("/admin_pupils");
    }

    if (!pupil.numberFromCard) {
      pupil.numberFromCard = 0;
      setPupil({ ...pupil });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goBack = () => history.push("/admin_pupils");

  const formOnSubmit = (Event) => {
    Event.preventDefault();
    iconGearRef.current.style.display = "block";
    buttonSubmit.current.style.pointerEvents = "none";

    editPupil(
      globalState.token.adminToken || cookies.getCookie("_token_to_matmidim"),
      pupil
    )
      .then((v) => {
        iconGearRef.current.style.display = "none";
        buttonSubmit.current.style.pointerEvents = "auto";
        if (typeof v === "string" && v !== "הנתונים נשמרו") {
          alert(v);
        } else if (v !== "הנתונים נשמרו") {
          console.log(v);
        }
        history.push("/admin_pupils");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit_pupil">
      {pupil?.numberFromCard === null ? null : (
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
                  עריכת תלמיד
                </h2>
              </div>
              <form
                onSubmit={(Event) => formOnSubmit(Event)}
                className="mt-8 space-y-6"
              >
                {/* <input type="hidden" name="remember" value="true" /> */}
                <div dir="rtl" className="rounded-md shadow-sm -space-y-px">
                  <div className="label_and_input">
                    <label htmlFor="firstname">שם פרטי:</label>
                    <input
                      id="firstname"
                      value={pupil.firstName}
                      type="text"
                      required
                      minLength="2"
                      maxLength="30"
                      className="edit_pupil_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                      placeholder="שם פרטי"
                      onChange={(e) => {
                        pupil.firstName = e.target.value;
                        setPupil({ ...pupil });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="lastName">שם משפחה:</label>
                    <input
                      id="lastName"
                      value={pupil.lastName}
                      type="text"
                      autoComplete="current-password"
                      required
                      minLength="2"
                      maxLength="15"
                      className="edit_pupil_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="שם משפחה"
                      onChange={(e) => {
                        pupil.lastName = e.target.value;
                        setPupil({ ...pupil });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="id">תעודת זהות:</label>
                    <input
                      id="id"
                      value={pupil.id}
                      type="number"
                      autoComplete="current-password"
                      required
                      min="100000000"
                      max="999999999"
                      className="edit_pupil_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="תעודת זהות"
                      onChange={(e) => {
                        pupil.id = +e.target.value;
                        setPupil({ ...pupil });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="points">נקודות:</label>
                    <input
                      id="points"
                      value={pupil.points}
                      type="number"
                      required
                      min="0"
                      className="edit_pupil_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="נקודות"
                      onChange={(e) => {
                        pupil.points = +e.target.value;
                        setPupil({ ...pupil });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="numberFromCard">כרטיס:</label>
                    <input
                      id="numberFromCard"
                      value={pupil.numberFromCard}
                      type="number"
                      required
                      min="0"
                      className="edit_pupil_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="כרטיס"
                      onChange={(e) => {
                        pupil.numberFromCard = +e.target.value;
                        setPupil({ ...pupil });
                      }}
                    />
                  </div>
                  <div className="label_and_input">
                    <label htmlFor="moreDetails">פרטים נוספים:</label>
                    <textarea
                      id="moreDetails"
                      value={pupil.moreDetails}
                      type="text"
                      maxLength="200"
                      className="edit_pupil_input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="פרטים נוספים"
                      onChange={(e) => {
                        pupil.moreDetails = e.target.value;
                        setPupil({ ...pupil });
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
                    עריכת תלמיד
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

export default EditPupil;
