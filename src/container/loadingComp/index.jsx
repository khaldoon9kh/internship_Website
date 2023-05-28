import React from 'react';
import { ReactComponent as LoadingSVG } from "../../svgs/loadingSVG.svg";
import "./index.css";

function LoadingComp() {

  return (
    <div className="loadingCont">
      <LoadingSVG/>
      <p>Loading, Please Wait</p>
    </div>
  );
}

export default LoadingComp;
