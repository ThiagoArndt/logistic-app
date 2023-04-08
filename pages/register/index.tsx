import Image from "next/image";
import loginImage from "../../assets/register_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useState, useRef } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import SessionContent from "@/components/session/session-content";
import { SessionInfoInterface } from "@/components/session/types/session-types";
import registerImage from "../../assets/register_image.png";
import SessionSimpleInput from "@/components/session/ui/session-simple-input";
import SessionHiddenInput from "@/components/session/ui/session-hidden-input";

const info: SessionInfoInterface = {
  title: "Register to an Account",
  subtitle: "Register to our service!",
  btnTitle: "Sign up",
  firstPartDesc: "Already have an account? ",
  secondPartDesc: "Login here",
  image: registerImage,
};

const BASE_RUL = process.env.BASE_URL;
//TODO: Tratar para o usuário nunca inserir um campo vazio nos input, se nao vai dar merda, namoral.
export default function Register() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: usernameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      },
      url: `${BASE_RUL}/api/register`,
    })
      .then((response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 400)
          console.log(response);
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 401) {
          console.log(err);
        } else {
          console.log(err);
        }
        console.log(err);
      });
  };

  const navigateToLogin = async () => {
    await router.push("/login");
  };

  return (
    <SessionContent
      info={info}
      navigationHandler={navigateToLogin}
      onSubmitHandler={registerHandler}
    >
      <SessionSimpleInput
        icon={
          <BiUser
            className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
            size={30}
          ></BiUser>
        }
        placeHolder="Username"
        ref={emailRef}
      ></SessionSimpleInput>

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
        ref={emailRef}
      ></SessionHiddenInput>
    </SessionContent>
  );
}
