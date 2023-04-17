import appLogo from "../../../public/almoxarifadofav.svg";

import Image from "next/image";
import Tab from "./SideBarTabs";
import { Archive, Home, LogOut, ShoppingBag, Sliders } from "react-feather";
import { useState } from "react";

export default function Sidebar() {
    const [selected, setSelected] = useState(false);

    return (
        <div className="bg-[#fff] flex flex-col items-center justify-between p-10 border-r border-[#EFF0F3]">
            <div className="flex gap-6 flex-col">
                <Image src={appLogo} alt="Logo" className="w-full cursor-pointer hover:opacity-40 transition-all duration-200" />

                <div className="w-full h-[2px] rounded-full bg-[#EFF0F3]" />

                <Tab 
                    icon={<Home size={18}/>}
                    selected={selected}
                    to=""
                    onClick={() => setSelected(!selected)}
                />

                <Tab 
                    icon={<Archive size={18}/>}
                    to=""
                />

                <Tab 
                    icon={<ShoppingBag size={18}/>}
                    to=""
                />
            </div>

            <div className="w-full flex flex-col gap-6">
                <Tab 
                    icon={<Sliders size={18}/>}
                    onClick={() => alert("Voce esta nas configuracoes")}
                />

                <Tab 
                    icon={<LogOut size={18}/>}
                    danger
                    to="/login"
                />
            </div>
        </div>
    )
}