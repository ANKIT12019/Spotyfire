// import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
// import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
	const { isAdmin, user } = useAuthStore();
	console.log({ isAdmin, user });

	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-2 items-center'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotyfire
			</div>
			<div className='flex items-center gap-4'>
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

				{/* <SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<UserButton /> */}
				
				{/* Mock user display */}
				<div className='flex items-center gap-2 text-sm'>
					<span>Welcome, {user?.fullName || 'Demo User'}</span>
					<img src={user?.imageUrl || '/spotify.png'} className='size-8 rounded-full' alt='User' />
				</div>
			</div>
		</div>
	);
};
export default Topbar;
