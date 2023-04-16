import { motion } from "framer-motion";

interface props {
    className?: string;
    children: React.ReactNode;
    delay?: number;
    duration?: number;
}

const item = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1
    }
}

export default function Fade(props: props) {
    return (
        <motion.div
            exit="hidden"
            className={props.className}
            initial="hidden"
            animate="visible"
            variants={item}
            transition={{ 
                delay: props.delay ? props.delay : 0, 
                duration: props.duration ? props.duration : .8 
            }}
        >
            { props.children }
        </motion.div>
    )
}