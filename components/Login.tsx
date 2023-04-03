import Image from "next/image";
import loginImage from "../assets/login_image.png";

export default function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-gray-100 flex flex-col justify-center">
        <form className=" max-w-[550px] w-full mx-auto bg-slate-600">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-nunito font-[700]">
              Log In to your Account
            </h2>
            <p className="font-sans font-normal">
              Welcome again! How are you doing?
            </p>
          </div>
          <div className="flex flex-col py-2">
            <label>Username</label>
            <input className="border p-2" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input className="border p-2" type="password" />
          </div>
          <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Sign In
          </button>
          <div className="flex flex-row justify-between">
            <p className="flex gap-2">
              <input type="checkbox" />
              Remember Me
            </p>
            <p>Create an account</p>
          </div>
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
