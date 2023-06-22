import Banner from "../components/Banner/Banner";
import Info from "../components/InfoSection/info";
import FeaturedCollections from "../components/FeaturedCollectionSection/FeaturedCollectionSection"
import CategorySection from "../components/CategoriesSection/CategorySection";
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}>
            <Banner />
            <Info />
            <FeaturedCollections />
            <CategorySection />
        </motion.div>
    )


}