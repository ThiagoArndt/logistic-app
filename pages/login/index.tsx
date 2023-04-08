import Image from "next/image";
import loginImage from "../../assets/login_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useState, useRef, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import SessionContent from "@/components/session/session-content";

import SessionHiddenInput from "@/components/session/session-hidden-input";
import { SessionInfoInterface } from "@/components/session/types/session-types";
import SessionSimpleInput from "@/components/session/session-simple-input";
import NotificationContext from "@/common/store/notification-context";

const info: SessionInfoInterface = {
  title: "Log In to your Account",
  subtitle: "Welcome again! How are you doing?",
  btnTitle: "LogIn",
  firstPartDesc: "Dont't have an account? ",
  secondPartDesc: "Create a new one here",
  image: loginImage,
};
const BASE_URL = process.env.BASE_URL;
export default function Login() {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios({
      method: "POST",

      data: {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      },
      baseURL: BASE_URL,
      url: "/api/login",
    })
      .then(async (response) => {
        console.log(response);
        if (response.status == 200) {
          await router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log("caiu no catch");
        console.log(err);
      });
  };

  const navigateToRegister = async () => {
    await router.push("/register");
  };

  return (
    <SessionContent
      info={info}
      navigationHandler={navigateToRegister}
      onSubmitHandler={loginHandler}
    >
      <SessionSimpleInput
        icon={
          <MdOutlineEmail
            className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
            size={30}
          ></MdOutlineEmail>
        }
        placeHolder="Email"
        ref={emailRef}
      ></SessionSimpleInput>

      <SessionHiddenInput
        icon={
          <HiOutlineLockClosed
            className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
            size={30}
          ></HiOutlineLockClosed>
        }
        placeHolder="Password"
        ref={passwordRef}
      ></SessionHiddenInput>
    </SessionContent>
  );
}
