import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

// Sample data for when backend is not available
const sampleSongs: Song[] = [
	{
		_id: "101",
		title: "Tum Hi Ho",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/7.jpg",
		audioUrl: "/songs/7.mp3",
		duration: 38,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "102",
		title: "Channa Mereya",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/8.jpg",
		audioUrl: "/songs/8.mp3",
		duration: 42,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "103",
		title: "Phir Bhi Tumko Chaahunga",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/9.jpg",
		audioUrl: "/songs/9.mp3",
		duration: 45,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "104",
		title: "Shayad",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/10.jpg",
		audioUrl: "/songs/10.mp3",
		duration: 40,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "105",
		title: "Kesariya",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/11.jpg",
		audioUrl: "/songs/11.mp3",
		duration: 43,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "106",
		title: "Apna Bana Le",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/12.jpg",
		audioUrl: "/songs/12.mp3",
		duration: 41,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "1",
		title: "Stay With Me",
		artist: "Sarah Mitchell",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/1.mp3",
		duration: 46,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "2",
		title: "Midnight Drive",
		artist: "The Wanderers",
		imageUrl: "/cover-images/2.jpg",
		audioUrl: "/songs/2.mp3",
		duration: 41,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "3",
		title: "Lost in Tokyo",
		artist: "Electric Dreams",
		imageUrl: "/cover-images/3.jpg",
		audioUrl: "/songs/3.mp3",
		duration: 24,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "4",
		title: "Summer Daze",
		artist: "Coastal Kids",
		imageUrl: "/cover-images/4.jpg",
		audioUrl: "/songs/4.mp3",
		duration: 24,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "5",
		title: "Neon Lights",
		artist: "Night Runners",
		imageUrl: "/cover-images/5.jpg",
		audioUrl: "/songs/5.mp3",
		duration: 36,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "6",
		title: "Mountain High",
		artist: "The Wild Ones",
		imageUrl: "/cover-images/6.jpg",
		audioUrl: "/songs/6.mp3",
		duration: 40,
		albumId: null,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}
];

const sampleAlbums: Album[] = [
	{
		_id: "1",
		title: "Summer Vibes",
		artist: "Coastal Kids",
		imageUrl: "/cover-images/4.jpg",
		releaseYear: 2024,
		songs: sampleSongs.slice(0, 3),
	},
	{
		_id: "2",
		title: "Night Drive",
		artist: "The Wanderers",
		imageUrl: "/cover-images/2.jpg",
		releaseYear: 2024,
		songs: sampleSongs.slice(1, 4),
	}
];

interface MusicStore {
	songs: Song[];
	albums: Album[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	albums: sampleAlbums,
	songs: sampleSongs,
	isLoading: false,
	error: null,
	currentAlbum: null,
	madeForYouSongs: sampleSongs.slice(0, 4),
	featuredSongs: sampleSongs.slice(0, 6),
	trendingSongs: sampleSongs.slice(2, 6),
	stats: {
		totalSongs: sampleSongs.length,
		totalAlbums: sampleAlbums.length,
		totalUsers: 1,
		totalArtists: 7,
	},

	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error: any) {
			console.log("Backend unavailable, fetching real songs from iTunes API:", error.message);
			try {
				const songs = await searchItunesSongs("arijit singh", 18);
				set({ songs });
			} catch (e: any) {
				console.log("iTunes API failed, falling back to sample songs:", e.message);
				set({ songs: sampleSongs });
			}
		} finally {
			set({ isLoading: false });
		}
	},

	fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/stats");
			set({ stats: response.data });
		} catch (error: any) {
			console.log("Using sample stats due to API error:", error.message);
			set({ stats: {
				totalSongs: sampleSongs.length,
				totalAlbums: sampleAlbums.length,
				totalUsers: 1,
				totalArtists: 7,
			}});
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			console.log("Using sample albums due to API error:", error.message);
			set({ albums: sampleAlbums });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			console.log("Using sample album due to API error:", error.message);
			const album = sampleAlbums.find(a => a._id === id);
			set({ currentAlbum: album || null });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/featured");
			set({ featuredSongs: response.data });
		} catch (error: any) {
			console.log("Backend unavailable, fetching featured from iTunes API:", error.message);
			try {
				const songs = await searchItunesSongs("arijit singh", 6);
				set({ featuredSongs: songs });
			} catch (e: any) {
				set({ featuredSongs: sampleSongs.slice(0, 6) });
			}
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			set({ madeForYouSongs: response.data });
		} catch (error: any) {
			console.log("Backend unavailable, fetching made-for-you from iTunes API:", error.message);
			try {
				const songs = await searchItunesSongs("arijit singh acoustic", 4);
				set({ madeForYouSongs: songs });
			} catch (e: any) {
				set({ madeForYouSongs: sampleSongs.slice(0, 4) });
			}
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			console.log("Backend unavailable, fetching trending from iTunes API:", error.message);
			try {
				const songs = await searchItunesSongs("arijit singh hits", 6);
				set({ trendingSongs: songs });
			} catch (e: any) {
				set({ trendingSongs: sampleSongs.slice(2, 6) });
			}
		} finally {
			set({ isLoading: false });
		}
	},
}));

// Helper: fetch real songs from iTunes Search API and map to Song type
async function searchItunesSongs(term: string, limit: number): Promise<Song[]> {
	const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=${limit}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`iTunes search failed: ${res.status}`);
	const data = await res.json();
	const now = new Date().toISOString();
	return (data.results || [])
		.filter((r: any) => r.previewUrl && r.trackId)
		.map((r: any) => ({
			_id: String(r.trackId),
			title: r.trackName,
			artist: r.artistName,
			imageUrl: typeof r.artworkUrl100 === "string" ? r.artworkUrl100.replace("100x100bb", "512x512bb") : "/cover-images/1.jpg",
			audioUrl: r.previewUrl,
			duration: r.trackTimeMillis ? Math.floor(r.trackTimeMillis / 1000) : 30,
			albumId: r.collectionId ? String(r.collectionId) : null,
			createdAt: now,
			updatedAt: now,
		}));
}
