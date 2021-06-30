import "./Businesses.css";
import React, { useState } from "react";
import getBusinesses from "../../services/getBusinesses";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";
import cookies from "../../cookies/cookies";
import deleteBusiness from "../../services/deleteBusiness";
import Businesses2 from "./Businesses2";

function Businesses() {
  const editPupil = (element) => {
    globalState.setTemporaryStorage(element);
    history.push("/admin_edit_business");
  };

  const history = useHistory();
  const globalState = useContext(UserContext);
  const [Businesses, setBusinesses] = useState(null);

  useEffect(() => {
    if (
      !globalState.token.adminToken &&
      !cookies.getCookie("_token_to_matmidim")
    ) {
      return history.push("/admin_login");
    }
    funcGetBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const funcGetBusinesses = () => {
    getBusinesses(
      globalState.token.adminToken || cookies.getCookie("_token_to_matmidim")
    ).then((v) => {
      if (Array.isArray(v)) {
        v.sort(function (a, b) {
          return a.id - b.id;
        });
        setBusinesses([...v]);
      } else if (v !== "לא נמצאו רשומות") {
        alert(v);
        console.log(v);
        setBusinesses(null);
      } else {
        setBusinesses(null);
      }
    });
  };

  const onDeleteBusiness = (business) => {
    const _uuid = business._uuid;
    const businessObj = { _uuid };
    if (window.confirm("בחרת למחוק נתונים. האם אתה בטוח?"))
      deleteBusiness(
        globalState.token.adminToken || cookies.getCookie("_token_to_matmidim"),
        businessObj
      )
        .then((v) => {
          if (v !== "deleted business in DB") {
            alert(v);
            console.log(v);
          }
          funcGetBusinesses();
        })
        .catch((err) => console.error(err));
  };

  const addBusiness = () => {
    history.push("/admin_add_business");
  };
  const goBack = () => history.push("/admin");
  return (
    <div className="Businesses_page">
      <button
        onClick={goBack}
        className="go_back h-20 w-40 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        חזור אחורה{" "}
      </button>
      <h1 className="mb-5 text-center">בתי עסק</h1>
      <div className="buttons">
        <button
          onClick={addBusiness}
          className="add_pupil h-20 w-40 m-4 flex justify-center items-center border border-transparent text-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          הוסף בית עסק
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
                      מותג
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      איש קשר
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      סכום לתשלום
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
                  {!Businesses
                    ? null
                    : Businesses.map((element, index) => {
                        return (
                          <Businesses2
                            key={index + 88787}
                            element={element}
                            index={index}
                            onDeletePupil={onDeleteBusiness}
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
export default Businesses;
