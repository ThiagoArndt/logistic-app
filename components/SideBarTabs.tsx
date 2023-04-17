import autoAnimate from "@formkit/auto-animate";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import FadeDown from "./framer-animations/fadeDown";

interface props {
    icon: React.ReactNode;
    selected?: boolean;
    to?: string;
    onClick?: (e: any) => void;
    danger?: boolean
}

export default function Tab(props: props) {
    const router = useRouter();

    const parent = useRef(null);
    
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    return (
        <button 
            ref={parent}
            className={`flex flex-col w-full gap-1 items-center justify-center hover:opacity-40 aspect-square transition-all rounded-[6px] ${props.danger ? "text-red" : props.selected ? "text-blue" : "text-[#999]"}`} 
            onClick={props.to ? () => router.push(props.to!) : props.onClick}
        >
            <div className="whitespace-nowrap">{props.icon}</div>
            { 
                props.selected && 
                    <div className="w-[3px] aspect-square rounded-full bg-blue" />
            }
        </button>
    )
}