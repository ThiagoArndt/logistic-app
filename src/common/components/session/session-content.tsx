import Image from "next/image";
import { SessionInterface } from "../../types/session-types";
import Layout from "../ui/layout";
import FadeDown from "../framer-animations/fadeDown";
import Fade from "../framer-animations/fade";

export default function SessionContent(props: SessionInterface) {
  const { children, info, navigationHandler, onSubmitHandler } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      <div className="bg-gray-100 flex flex-col px-4 justify-center gap-5">
        <Layout>
          <form
            onSubmit={onSubmitHandler}
            className=" flex flex-col max-w-[550px] mx-auto gap-5 lg: w-full"
          >
            <div className="flex flex-col gap-2">
              <FadeDown>
                <h2
                  data-te-animation-init
                  data-te-animation-reset="true"
                  data-te-animation="[slide-right_1s_ease-in-out]"
                  className="text-2xl font-nunito font-[700] sm:text-3xl"
                >
                  {info.title}
                </h2>
              </FadeDown>
              <FadeDown delay={0.1}>
                <p className="font-nunito text-lg text-gray">{info.subtitle}</p>
              </FadeDown>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">{children}</div>
            </div>

            <FadeDown delay={0.3}>
              <button className="border-0 w-full py-4 font-nunito text-white text-base bg-blue rounded-xl hover:brightness-90 transition-all duration-200 hover:bg-transparent">
                {info.btnTitle}
              </button>
            </FadeDown>

            <Fade delay={0.4}>
              <p className="text-center text-sm font-nunito">
                {info.firstPartDesc}
                <span
                  onClick={navigationHandler}
                  className="text-blue cursor-pointer select-none hover:opacity-60 transition-all duration-200"
                >
                  {" "}
                  {info.secondPartDesc}
                </span>
              </p>
            </Fade>
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
