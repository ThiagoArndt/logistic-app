import { motion } from "framer-motion";

interface props {
    className?: string;
    children: React.ReactNode;
    delay?: number;
}

const item = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

export default function FadeDown(props: props) {
    return (
        <motion.div
            exit="hidden"
            className={props.className}
            initial="hidden"
            animate="visible"
            variants={item}
            transition={{ delay: props.delay ? props.delay : 0 }}
        >
            { props.children }
        </motion.div>
    )
}