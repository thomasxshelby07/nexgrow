
import dbConnect from "./db";
import HomePage from "./models/HomePage";

export async function getHomepageData() {
    try {
        await dbConnect();
        const data = await HomePage.findOne().lean();
        return data;
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return null;
    }
}
