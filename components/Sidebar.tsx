import appLogo from "../assets/AlmoxarifadoFav.svg";

export default function Sidebar() {
    return (
        <div className="bg-[#fff] flex flex-col p-10 border-r border-[#EFF0F3]">
            <img src={appLogo} className="w-full" />
        </div>
    )
}