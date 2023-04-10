import React, { forwardRef } from "react";

import { SessionInputInterface } from "./types/session-types";

const SessionSimpleInput = forwardRef(
  (props: SessionInputInterface, ref: any) => {
    return (
      <div className="group flex flex-row py-2 relative justify-center border rounded-xl border-lightGray focus:border-blue duration-300 focus-within:border-blue">
        {props.icon}
        <input
          className="p-2 flex-grow ml-1 outline-none font-nunito text-base duration-200 "
          type="text"
          placeholder={props.placeHolder}
          ref={ref}
        />
      </div>
    );
  }
);

export default SessionSimpleInput;

/*
 <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
      {icon}
      <input
        className="p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300 "
        type="text"
        placeholder={placeHolder}
        ref={ref}
      />
    </div>
*/
