import ContactContent from "../components/Contact/ContactContent"
import { motion } from 'framer-motion'

export default function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}>
            <ContactContent />
        </motion.div>
    )
}