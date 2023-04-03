import Image from "next/image";
import loginImage from "../assets/login_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const changeFieldVisibility = () => {
    setIsVisible((prevCheck) => !prevCheck);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full pageanimation">
      <div className="bg-gray-100 flex flex-col justify-center gap-5">
        <form className=" flex flex-col max-w-[550px] w-full mx-auto gap-5">
          <div className="flex flex-col gap-2">
            <h2
              data-te-animation-init
              data-te-animation-reset="true"
              data-te-animation="[slide-right_1s_ease-in-out]"
              className="text-5xl font-nunito font-[700]"
            >
              Log In to your Account
            </h2>
            <p className="font-nunito text-xl text-gray">
              Welcome again! How are you doing?
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
                <MdOutlineEmail
                  className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
                  size={30}
                />
                <input
                  className="p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300 "
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
                <HiOutlineLockClosed
                  className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
                  size={30}
                />
                <input
                  className=" p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300"
                  type={!isVisible ? "password" : "text"}
                  placeholder="Password"
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
            </div>
            <div className="flex flex-row justify-between">
              <p className="flex gap-2 font-nunito text-gray text-lg">
                <input className="w-5" type="checkbox" />
                Remember Me
              </p>
              <p className=" text-blue text-lg font-nunito cursor-pointer">
                Forgot Password?
              </p>
            </div>
          </div>
          <button className="border-0 w-full py-4 font-nunito text-white text-xl bg-blue rounded-xl hover:bg-transparent">
            Log In
          </button>
        </form>
        <p className="text-center font-nunito">
          Dont have an accont?
          <span className="text-blue cursor-pointer"> Create an account</span>
        </p>
      </div>
      <div className="hidden md:block">
        <Image
          className="w-full h-full object-cover"
          quality={100}
          src={loginImage}
          alt=""
        />
      </div>
    </div>
  );
}
