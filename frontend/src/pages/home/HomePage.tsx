import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	return (
		<main className='relative rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<Topbar />
			<AnimatedBackground />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<motion.h1
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className='text-2xl sm:text-3xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 bg-[length:200%_100%] bg-clip-text text-transparent'
						style={{ backgroundPosition: "0% 50%" }}
					>
						Good afternoon
					</motion.h1>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
						<FeaturedSection />
					</motion.div>

					<motion.div
						initial="hidden"
						animate="show"
						variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
						className='space-y-8'
					>
						<motion.div
							variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
							transition={{ duration: 0.45, ease: "easeOut" }}
						>
							<SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={isLoading} />
						</motion.div>
						<motion.div
							variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
							transition={{ duration: 0.45, ease: "easeOut" }}
						>
							<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
						</motion.div>
					</motion.div>
				</div>
			</ScrollArea>
		</main>
	);
};
export default HomePage;
