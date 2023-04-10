import { RefObject, useContext, useRef } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError, AxiosResponse } from "axios";
import SessionContent from "@/components/session/session-content";
import SessionHiddenInput from "@/components/session/session-hidden-input";
import SessionSimpleInput from "@/components/session/session-simple-input";
import registerImage from "../../assets/register_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { SessionInfoInterface } from "@/components/session/types/session-types";
import NotificationContext from "@/common/store/notification-context";

const info: SessionInfoInterface = {
  title: "Register to an Account",
  subtitle: "Register to our service!",
  btnTitle: "Sign up",
  firstPartDesc: "Already have an account? ",
  secondPartDesc: "Login here",
  image: registerImage,
};

const BASE_URL = process.env.BASE_URL;
export default function Register() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(usernameRef, emailRef, passwordRef);
    if (validadeInputText(usernameRef, emailRef, passwordRef) == false) {
      return;
    }
    notificationCtx.showNotification({
      message: "Carregando...",
      status: "pending",
    });
    axios({
      method: "POST",
      data: {
        username: usernameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      },
      baseURL: BASE_URL,
      url: "/api/register",
    })
      .then(async (response: AxiosResponse) => {
        if (response.data == "User already exists") {
          notificationCtx.showNotification({
            message: "Usuário já existente",
            status: "error",
          });
          return;
        }
        if (response.status >= 200 && response.status < 400) {
          notificationCtx.showNotification({
            message: "Usuário registrado com sucesso!",
            status: "success",
          });
          await router.push("/login");
        }
        console.log(response);
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 401) {
          notificationCtx.showNotification({
            message: "Oops, credenciais inválidos",
            status: "error",
          });
        }
        notificationCtx.showNotification({
          message: "Algo de errado aconteceu",
          status: "error",
        });
      });
  };

  const validadeInputText = (
    userText: RefObject<HTMLInputElement>,
    emailText: RefObject<HTMLInputElement>,
    passwordText: RefObject<HTMLInputElement>
  ): boolean => {
    if (
      userText.current == null ||
      emailText.current == null ||
      passwordText.current == null
    ) {
      notificationCtx.showNotification({
        message: "Todos os campos devem estar preenchidos",
        status: "error",
      });
      return false;
    } else if (userText.current.value.length < 2) {
      notificationCtx.showNotification({
        message: "Nome do usuário inválido",
        status: "error",
      });
      return false;
    } else if (validEmail.test(emailText.current.value) === false) {
      notificationCtx.showNotification({
        message: "Email inválido",
        status: "error",
      });
      return false;
    } else if (validPassword.test(passwordText.current.value) === false) {
      notificationCtx.showNotification({
        message: "Senha inválida",
        status: "error",
      });
      return false;
    }
    return true;
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
            size={16}
          ></BiUser>
        }
        placeHolder="Username"
        ref={usernameRef}
      ></SessionSimpleInput>

      <SessionSimpleInput
        icon={
          <MdOutlineEmail
            className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
            size={16}
          ></MdOutlineEmail>
        }
        placeHolder="Email"
        ref={emailRef}
      ></SessionSimpleInput>
      <SessionHiddenInput
        icon={
          <HiOutlineLockClosed
            className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
            size={16}
          ></HiOutlineLockClosed>
        }
        placeHolder="Password"
        ref={passwordRef}
      ></SessionHiddenInput>
    </SessionContent>
  );
}
