import { motion } from "framer-motion";

const AnimatedBackground = () => {
	return (
		<div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
			<motion.div
				className='absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-500/30 via-sky-500/25 to-fuchsia-500/20 blur-3xl'
				animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className='absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-violet-500/20 to-emerald-500/25 blur-3xl'
				animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
				transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
			/>
			<motion.div
				className='absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-sky-500/20 via-teal-500/25 to-emerald-500/20 blur-3xl'
				animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
				transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/10 to-zinc-950/40' />
		</div>
	);
};

export default AnimatedBackground;

