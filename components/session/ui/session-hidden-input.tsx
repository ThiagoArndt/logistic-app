import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SessionInputInterface } from "../types/session-types";

function SessionHiddenInput({ icon, placeHolder, ref }: SessionInputInterface) {
  const [isVisible, setIsVisible] = useState(false);

  const changeFieldVisibility = () => {
    setIsVisible((prevCheck) => !prevCheck);
  };

  return (
    <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
      {icon}
      <input
        className=" p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300"
        type={!isVisible ? "password" : "text"}
        placeholder={placeHolder}
        ref={ref}
      />
      {!isVisible ? (
        <AiOutlineEyeInvisible
          cursor="pointer"
          onClick={changeFieldVisibility}
          className="my-auto mr-5 text-gray transition ease-in-out delay-150 bg-blue-500  hover:scale-105 duration-100"
          size={30}
        />
      ) : (
        <AiOutlineEye
          cursor="pointer"
          onClick={changeFieldVisibility}
          className="my-auto mr-5 text-blue transition ease-in-out delay-150 bg-blue-500  hover:scale-105 duration-100"
          size={30}
        />
      )}
    </div>
  );
}

export default SessionHiddenInput;
