import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import { SessionStrategy } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions = {
    // Use Prisma adapter for NextAuth
    adapter: PrismaAdapter(prisma),
    providers: [
        // GitHub Provider
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // Optionally add authorization params if needed
            authorization: {
                params: { scope: 'openid email profile' },
            },
        }),
        // Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Validate input
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                }

                // Find user by email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // Check if user exists and has a hashed password
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                // Compare provided password with stored hashed password
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                // Return user if password matches
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }
                return user; // Successful login returns the user object
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development", // Enable debug mode for development
    session: {
        strategy: "jwt" as SessionStrategy, // Use JWT for session strategy
    },
    secret: process.env.NEXTAUTH_SECRET, // Secret for encryption
    pages: {
        signIn: '/auth/signin', // Custom sign-in page path
    },
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: any, user?: any }) {
            // Add user to the token if available
            if (user) {
                token.id = user.id; // Store user ID in token
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: { session: any, token: any }) {
            // Add user ID to the session if available
            if (token) {
                session.user.id = token.id; // Store user ID in session
            }
            return session;
        },
    },
};
