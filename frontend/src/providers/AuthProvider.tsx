import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
// import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	// const { getToken, userId } = useAuth();
	const [loading, setLoading] = useState(true);
	const { initSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				// Mock authentication for demo purposes
				const mockToken = "mock-token-123";
				const mockUserId = "mock-user-123";
				
				updateApiToken(mockToken);
				
				// Set mock admin status
				useAuthStore.setState({ 
					isAdmin: true, 
					isLoading: false,
					user: {
						_id: mockUserId,
						clerkId: mockUserId,
						fullName: "Demo User",
						imageUrl: "/spotify.png"
					}
				});
				
				// Initialize socket with mock user
				initSocket(mockUserId);
				
			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();

		// clean up
		return () => disconnectSocket();
	}, [initSocket, disconnectSocket]);

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);

	return <>{children}</>;
};
export default AuthProvider;
