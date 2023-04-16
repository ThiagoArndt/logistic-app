import { User } from "react-feather";

interface props {

}

export default function Header(props: props) {
    return(
        <div className="flex items-center border-b border-[#EFF0F3] justify-between px-10 py-5">
            <div className="select-none">
                <h1 className="font-semibold text-[#666]">Dashboard</h1>
            </div>

            <div className="flex gap-[6px] select-none p-2 rounded-[6px] hover:bg-[#fefe] transition-all duration-200 cursor-pointer">
                <div className="w-[35px] flex text-[#666] items-center justify-center aspect-square rounded-full bg-[#efefef] border border-[#EFF0F3]">
                    <User size={12}/>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-sm font-semibold text-[#666]">Tiana Mango</h1>
                    <p className="text-xs text-[#666]">Admin</p>
                </div>
            </div>
        </div>
    )
}