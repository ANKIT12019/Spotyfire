import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";

type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};
const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<motion.h2
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.35 }}
					className='text-xl sm:text-2xl font-bold'
				>
					{title}
				</motion.h2>
				<Button variant='link' className='text-sm text-zinc-400 hover:text-white'>
					Show all
				</Button>
			</div>

			<motion.div
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
			>
				{songs.map((song) => (
					<TiltCard
						key={song._id}
						variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlayButton song={song} />
						</div>
						<h3 className='font-medium mb-2 truncate'>{song.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
					</TiltCard>
				))}
			</motion.div>
		</div>
	);
};
export default SectionGrid;
