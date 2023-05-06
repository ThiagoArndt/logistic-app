import loginImage from "../../../public/static/login_image.png";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useRef, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SessionContent from "@/src/common/components/session/session-content";
import SessionHiddenInput from "@/src/common/components/session/session-hidden-input";
import { SessionInfoInterface } from "@/src/common/types/session-types";
import SessionSimpleInput from "@/src/common/components/session/session-simple-input";
import NotificationContext from "@/src/common/context/notification-context";
import FadeDown from "@/src/common/components/framer-animations/fadeDown";
import Head from "next/head";

const info: SessionInfoInterface = {
  title: "Log In to your Account",
  subtitle: "Welcome again! How are you doing?",
  btnTitle: "LogIn",
  firstPartDesc: "Don't have an account? ",
  secondPartDesc: "Create a new one here",
  image: loginImage,
};
const BASE_URL = process.env.BASE_URL;
export default function Login() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const notificationCtx = useContext(NotificationContext);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    notificationCtx.showNotification({
      message: "Carregando...",
      status: "pending",
    });

    await axios({
      method: "POST",

      data: {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      },
      baseURL: BASE_URL,
      url: "/api/auth/login",
    })
      .then(async (response) => {
        console.log(response);
        if (response.status == 200) {
          notificationCtx.showNotification({
            message: response.data.message,
            status: "success",
          });
          await router.push("/dashboard");
        }


      })
      .catch((err) => {
        console.log(err.response);
        notificationCtx.showNotification({
          message: err.response!.data.message as string,
          status: "error",
        });
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
      <Head>
        <title>Login | Almoxarifado</title>
      </Head>

      <FadeDown className="flex flex-col gap-2" delay={0.2}>
        <SessionSimpleInput
          icon={
            <MdOutlineEmail
              className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
              size={16}
            ></MdOutlineEmail>
          }
          placeHolder="Email"
          ref={emailRef}
        />
        <SessionHiddenInput
          icon={
            <HiOutlineLockClosed
              className="my-auto ml-5 text-gray group-hover:text-blue duration-300 group-focus-within:text-blue"
              size={16}
            ></HiOutlineLockClosed>
          }
          placeHolder="Password"
          ref={passwordRef}
        />
      </FadeDown>
    </SessionContent>
  );
}
