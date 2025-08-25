import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`Connected to MongoDB ${conn.connection.host}`);
	} catch (error) {
		console.log("Failed to connect to MongoDB", error.message);
		console.log("⚠️  App will continue without database connection");
		console.log("💡 To fix this, set up MongoDB or update MONGODB_URI in .env");
		// Don't exit - let the app continue
	}
};
