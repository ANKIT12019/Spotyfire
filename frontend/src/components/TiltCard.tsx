import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";


type TiltCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
	children: ReactNode;
	intensity?: number;
	glowColorClassName?: string;
};

const TiltCard = ({
	children,
	className,
	intensity = 6,
	glowColorClassName = "from-emerald-400/30 via-sky-400/25 to-fuchsia-400/30",
	...motionProps
}: TiltCardProps) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const mouseX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
	const mouseY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

	const rotateX = useTransform(mouseY, [0, 1], [intensity, -intensity]);
	const rotateY = useTransform(mouseX, [0, 1], [-intensity, intensity]);
	const glowX = useTransform(mouseX, (v) => (v - 0.5) * 60);
	const glowY = useTransform(mouseY, (v) => (v - 0.5) * 60);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
		const px = (event.clientX - left) / width; // 0 -> 1
		const py = (event.clientY - top) / height; // 0 -> 1
		x.set(px);
		y.set(py);
	};

	const handleMouseLeave = () => {
		x.set(0.5);
		y.set(0.5);
	};

	return (
		<motion.div
			{...motionProps}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				perspective: 900,
			}}
			className={cn("relative group", className)}
		>
			<motion.div
				style={{ rotateX, rotateY }}
				whileHover={{ scale: 1.02 }}
				transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.6 }}
				className="relative will-change-transform"
			>
				{/* glow that follows cursor */}
				<motion.div
					style={{ x: glowX, y: glowY }}
					className={cn(
						"pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300",
						`bg-[radial-gradient(circle_at_center,theme(colors.emerald.400/.35)_0%,transparent_60%)]`
					)}
				/>
				<div className="relative">
					{children}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default TiltCard;

