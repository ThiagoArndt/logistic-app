import React from "react";
import { SessionInputInterface } from "../types/session-types";

function SessionSimpleInput({ icon, placeHolder, ref }: SessionInputInterface) {
  return (
    <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
      {icon}
      <input
        className="p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300 "
        type="text"
        placeholder={placeHolder}
        ref={ref}
      />
    </div>
  );
}

export default SessionSimpleInput;
