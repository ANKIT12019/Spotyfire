import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import { motion } from "framer-motion";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;

	if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.2 }}
			variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'
		>
			{featuredSongs.map((song) => (
				<motion.div
					key={song._id}
					variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
					transition={{ duration: 0.35, ease: "easeOut" }}
					className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
        hover:bg-zinc-700/50 transition-all duration-300 group cursor-pointer relative hover:-translate-y-0.5'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0 transition-all duration-300 ease-out group-hover:scale-105'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate transition-colors duration-200 group-hover:text-white'>{song.title}</p>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
					</div>
					<PlayButton song={song} />
				</motion.div>
			))}
		</motion.div>
	);
};
export default FeaturedSection;
