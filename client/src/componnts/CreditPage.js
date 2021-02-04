import "./CreditPage.css";
import { useState } from "react";
import { useRef } from "react";
import NoOkDeal from "./NoOkDeal";
import { useContext } from "react";
import UserContext from "../UserContext";
import newDeal from "../services/newDeal";
import OkDeal from "./OkDeal";
import cookies from "../cookies/cookies";

function CreditPage() {
  const globalState = useContext(UserContext);
  const dealDetails = globalState.temporaryStorage || {};
  const setDealDetails = globalState.setTemporaryStorage;
  const [dealApproved, setDealApproved] = useState("");
  const iconGearRef = useRef(null);

  const onTransferCard = (Event) => {
    dealDetails.numberFromCard = Event.target.value;
    setDealDetails({ ...dealDetails });

    if (Event.target.value.length > 8) {
      iconGearRef.current.style.display = "block";
      newDeal(
        globalState.token.businessToken ||
          cookies.getCookie("_business_token_to_matmidim"),
        dealDetails
      )
        .then((v) => {
          iconGearRef.current.style.display = "none";
          dealDetails.numberFromCard = "";
          setDealDetails({ ...dealDetails });
          if (v === "There are not enough points") {
            setDealApproved("no");
          } else if (v === "ok") {
            setDealApproved("yes");
          } else if (typeof v === "string") {
            alert(v);
          } else {
            console.log(v);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const h1Ref = useRef(null);
  const noFocusInput = () => (h1Ref.current.style.color = "rgb(4 4 4 / 21%)");
  const focusInput = () => (h1Ref.current.style.color = "black");

  return (
    <div>
      <NoOkDeal dealApproved={dealApproved} />
      <OkDeal dealApproved={dealApproved} />

      <div className="credit_page">
        <h1 className="price">
          {"לתשלום:  " + globalState.temporaryStorage.price}
        </h1>
        <h1 dir="rtl" ref={h1Ref}>
          העבר כרטיס...
        </h1>
        <div>
          <input
            value={dealDetails.numberFromCard || ""}
            type="password"
            maxLength="9"
            onFocus={() => focusInput()}
            onBlur={() => noFocusInput()}
            autoFocus
            onChange={(Event) => onTransferCard(Event)}
          />
        </div>
        <div dir="rtl" className="mt-6 items-center">
          <img
            ref={iconGearRef}
            className="icon_gear"
            style={{ display: "none" }}
            src="https://img.icons8.com/ios-filled/50/000000/gear.png"
            alt="img"
          />
          {/* <span dir="rtl">רק רגע...</span>
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
          </svg> */}
        </div>
      </div>
    </div>
  );
}
export default CreditPage;
