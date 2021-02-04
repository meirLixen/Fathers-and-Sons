import { useState, useEffect } from "react";
import "./Pupils2.css";

function Pupils2(props) {
  const element = props.element;
  const index = props.index;
  const onDeletePupil = props.onDeletePupil;
  const onEditPoints = props.onEditPoints;
  const editPupil = props.editPupil;

  const [addPointsInitialValue, setAddPointsInitialValue] = useState("");

  useEffect(() => {
    setAddPointsInitialValue("");
  }, [props]);

  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="inline-block ml-2 h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>

          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {`${element.firstName} ${element.lastName}`}
            </div>
            <div className="text-sm text-gray-500">{element.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {element.numberFromCard ? element.numberFromCard : "0000000000000000"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {element.points ? element.points : "0"}
        </span>
        <input
          value={addPointsInitialValue}
          className="change_points"
          placeholder="הוספת נקודות"
          min="0"
          type="number"
          onInput={(e) => {
            onEditPoints(element.id, e.target.value);
            setAddPointsInitialValue(e.target.value);
          }}
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {element.moreDetails ? element.moreDetails : "..."}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => editPupil(element)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          עריכה
        </button>
        <br />
        <button
          onClick={() => onDeletePupil(element)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          מחק
        </button>
      </td>
    </tr>
  );
}
export default Pupils2;
