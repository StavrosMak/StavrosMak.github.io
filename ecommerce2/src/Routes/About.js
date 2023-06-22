import AboutUs from '../components/AboutUs/AboutUs';
import { motion } from 'framer-motion'

export default function About() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}>
            <AboutUs />
        </motion.div>

    )

}