import Image from "next/image";
import loginImage from "../../assets/register_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useState, useRef } from "react";
import axios from "axios";

//TODO: Tratar para o usuário nunca inserir um campo vazio nos input, se nao vai dar merda, namoral.
export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const changeFieldVisibility = () => {
    setIsVisible((prevCheck) => !prevCheck);
  };
  //console.log(emailRef.current?.value, passwordRef.current?.value);
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios("https:sample-endpoint.com/user", {
      method: "POST",
      data: {
        username: usernameRef.current!.value,
      },
    }).then(function (response) {
      console.log(response);
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full pageanimation">
      <div className="bg-gray-100 flex flex-col justify-center gap-5">
        <form
          onSubmit={signUp}
          className=" flex flex-col max-w-[550px] w-full mx-auto gap-5"
        >
          <div className="flex flex-col gap-2">
            <h2
              data-te-animation-init
              data-te-animation-reset="true"
              data-te-animation="[slide-right_1s_ease-in-out]"
              className="text-5xl font-nunito font-[700]"
            >
              Register to an account
            </h2>
            <p className="font-nunito text-xl text-gray">
              Register to our service!
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
                <BiUser
                  className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
                  size={30}
                />
                <input
                  className="p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300 "
                  type="text"
                  placeholder="Username"
                  ref={usernameRef}
                />
              </div>
              <div className="group flex flex-row py-2 relative justify-center border-4 rounded-xl border-lightGray hover:border-blue duration-300 focus-within:border-blue">
                <MdOutlineEmail
                  className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
                  size={30}
                />
                <input
                  className="p-2 flex-grow ml-3 outline-none font-nunito text-xl group-hover:placeholder-blue duration-300 "
                  type="text"
                  placeholder="Email"
                  ref={emailRef}
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
                  ref={passwordRef}
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
          </div>
          <button className="border-0 w-full py-4 font-nunito text-white text-xl bg-blue rounded-xl hover:bg-transparent">
            Sign Up
          </button>
        </form>
      </div>

      <div className="hidden sm:block">
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
