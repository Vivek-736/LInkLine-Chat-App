import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getSession() {
    try {
        const session = await getServerSession(authOptions);
        return session;
    } catch (error) {
        console.error("Error fetching session:", error);
        return null;
    }
}
