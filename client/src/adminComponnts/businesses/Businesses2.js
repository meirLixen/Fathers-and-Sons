import "./Businesses2.css";

function Businesses2(props) {
  const element = props.element;
  const index = props.index;
  const onDeletePupil = props.onDeletePupil;
  const editPupil = props.editPupil;

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
              {element.brand}
            </div>
            <div className="text-sm text-gray-500">{element.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{element.contact}</div>

        <div className="text-sm text-gray-900">{`0${element.phone}`}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {element.amountToPay ? element.amountToPay : "0"}
        </span>
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
export default Businesses2;
