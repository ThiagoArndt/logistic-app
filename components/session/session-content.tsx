import Image from "next/image";
import { SessionInterface } from "./types/session-types";
import Layout from "../ui/layout";

export default function SessionContent(props: SessionInterface) {
  const { children, info, navigationHandler, onSubmitHandler } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full fadeDown ">
      <div className="bg-gray-100 flex flex-col justify-center gap-5">
        <Layout>
          <form
            onSubmit={onSubmitHandler}
            className=" flex flex-col max-w-[550px] mx-auto gap-5 lg: w-9/12"
          >
            <div className="flex flex-col gap-2">
              <h2
                data-te-animation-init
                data-te-animation-reset="true"
                data-te-animation="[slide-right_1s_ease-in-out]"
                className="text-4xl font-nunito font-[700] sm:text-5xl"
              >
                {info.title}
              </h2>
              <p className="font-nunito text-xl text-gray">{info.subtitle}</p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">{children}</div>
            </div>
            <button className="border-0 w-full py-4 font-nunito text-white text-xl bg-blue rounded-xl hover:bg-transparent">
              {info.btnTitle}
            </button>

            <p className="text-center font-nunito">
              {info.firstPartDesc}
              <span
                onClick={navigationHandler}
                className="text-blue cursor-pointer"
              >
                {" "}
                {info.secondPartDesc}
              </span>
            </p>
          </form>
        </Layout>
      </div>

      <div className="hidden  lg:block">
        <Image
          className="w-full h-full object-cover"
          quality={100}
          src={info.image}
          alt=""
        />
      </div>
    </div>
  );
}
