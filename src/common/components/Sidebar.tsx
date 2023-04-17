import Image from "next/image";
import Tab from "./SideBarTabs";
import { Archive, Home, LogOut, ShoppingBag, Sliders } from "react-feather";

export default function Sidebar() {
  return (
    <div className="bg-[#fff] flex flex-col items-center justify-between p-10 border-r border-[#EFF0F3]">
      <div className="flex gap-6 flex-col">
        <Image
          src="/static/almoxarifadofav.svg"
          width={100}
          height={100}
          quality={100}
          alt="Logo"
          className="w-full"
        />

        <div className="w-full h-[2px] rounded-full bg-[#EFF0F3]" />

        <Tab icon={<Home size={18} />} selected to="" />

        <Tab icon={<Archive size={18} />} to="" />

        <Tab icon={<ShoppingBag size={18} />} to="" />
      </div>

      <div className="w-full flex flex-col gap-6">
        <Tab icon={<Sliders size={18} />} to="" />

        <Tab icon={<LogOut size={18} />} danger to="" />
      </div>
    </div>
  );
}
