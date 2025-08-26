import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;

	if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
			{featuredSongs.map((song, index) => (
				<div
					key={song._id}
					data-state='visible'
					style={{ animationDelay: `${index * 60}ms` }}
					className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-all duration-300 group cursor-pointer relative data-[state=visible]:animate-in data-[state=visible]:fade-in-0 data-[state=visible]:slide-in-from-bottom-2 hover:-translate-y-0.5'
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
				</div>
			))}
		</div>
	);
};
export default FeaturedSection;
