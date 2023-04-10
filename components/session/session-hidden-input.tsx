import React, { forwardRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SessionInputInterface } from "./types/session-types";

const SessionHiddenInput = forwardRef(
  (props: SessionInputInterface, ref: any) => {
    const [isVisible, setIsVisible] = useState(false);

    const changeFieldVisibility = () => {
      setIsVisible((prevCheck) => !prevCheck);
    };

    return (
      <div className="group flex flex-row py-2 relative justify-center border rounded-xl border-lightGray focus:border-blue duration-300 focus-within:border-blue">
        {props.icon}
        <input
          className=" p-2 flex-grow ml-1 outline-none font-nunito text-base duration-300"
          type={!isVisible ? "password" : "text"}
          placeholder={props.placeHolder}
          ref={ref}
        />
        {!isVisible ? (
          <AiOutlineEyeInvisible
            cursor="pointer"
            onClick={changeFieldVisibility}
            className="my-auto mr-5 text-gray transition ease-in-out delay-150 bg-blue-500  hover:scale-105 duration-100"
            size={18}
          />
        ) : (
          <AiOutlineEye
            onClick={changeFieldVisibility}
            cursor="pointer"
            className="my-auto mr-5 text-blue transition animate-pop-in ease-in-out delay-150 bg-blue-500  hover:scale-105 duration-100"
            size={18}
          />
        )}
      </div>
    );
  }
);

export default SessionHiddenInput;
