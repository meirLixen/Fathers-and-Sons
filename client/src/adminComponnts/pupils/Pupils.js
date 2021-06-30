import "./Pupils.css";
import React, { useState } from "react";
import getPupils from "../../services/getPupils";
import { useEffect, useRef, useContext } from "react";

import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import cookies from "../../cookies/cookies";
import deletePupil from "../../services/deletePupil";
import Pupils2 from "./Pupils2";
import updatePoints from "../../services/updatePoints";

function Pupils() {
  const history = useHistory();
  const globalState = useContext(UserContext);
  const [pupils, setPupils] = useState(null);
  const iconGearRef = useRef(null);
  const buttonSubmit = useRef(null);

  const editPupil = (element) => {
    globalState.setTemporaryStorage(element);
    history.push("/admin_edit_pupil");
  };

  useEffect(() => {
    if (
      !globalState.token.adminToken &&
      !cookies.getCookie("_token_to_matmidim")
    ) {
      return history.push("/admin_login");
    }
    funcGetPupils();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const funcGetPupils = () => {
    getPupils(
      globalState.token.adminToken || cookies.getCookie("_token_to_matmidim")
    ).then((v) => {
      if (Array.isArray(v)) {
        v.sort(function (a, b) {
          return a.id - b.id;
        });
        setPupils([...v]);
      } else if (v !== "לא נמצאו רשומות") {
        alert(v);
        console.log(v);
        setPupils(null);
      } else {
        setPupils(null);
      }
    });
  };

  const newPoints = {};

  const onEditPoints = (id, points) => {
    newPoints[id] = +points;
  };

  const onSavePoints = () => {
    iconGearRef.current.style.display = "block";
    buttonSubmit.current.style.pointerEvents = "none";
    updatePoints(
      globalState.token.adminToken || cookies.getCookie("_token_to_matmidim"),
      newPoints
    )
      .then((v) => {
        setPupils(null);
        iconGearRef.current.style.display = "none";
        buttonSubmit.current.style.pointerEvents = "auto";
        if (v !== "הנתונים נשמרו") {
          alert(v);
          console.log(v);
        }
        funcGetPupils();
      })
      .catch((err) => console.error(err));
  };

  const onDeletePupil = (element) => {
    const _uuid = element._uuid;
    const uuidObj = { _uuid };
    if (window.confirm("בחרת למחוק נתונים. האם אתה בטוח?"))
      deletePupil(
        globalState.token.adminToken || cookies.getCookie("_token_to_matmidim"),
        uuidObj
      )
        .then((v) => {
          if (v !== "deleted pupil in DB") {
            alert(v);
            console.log(v);
          }
          funcGetPupils();
        })
        .catch((err) => console.error(err));
  };

  const addPupil = () => {
    history.push("/admin_add_pupil");
  };
  const goBack = () => history.push("/admin");
  return (
    <div className="pupils_page">
      <button
        onClick={goBack}
        className="go_back h-20 w-40 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        חזור אחורה{" "}
      </button>
      <h1 className="mb-5 text-center">תלמידים</h1>
      <div className="buttons">
        <button
          onClick={addPupil}
          className="add_pupil h-20 w-40 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          הוסף תלמיד
        </button>
        <button
          ref={buttonSubmit}
          onClick={() => onSavePoints()}
          className="relative h-20 w-40 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          שמירת נקודות
        </button>
      </div>
      <div dir="rtl" className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      שם התלמיד
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      מספר כרטיס
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      נקודות
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      פרטים נוספים
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!pupils
                    ? null
                    : pupils.map((element, index) => {
                        return (
                          <Pupils2
                            key={index + 88787}
                            element={element}
                            index={index}
                            onEditPoints={onEditPoints}
                            onDeletePupil={onDeletePupil}
                            editPupil={editPupil}
                          />
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pupils;
