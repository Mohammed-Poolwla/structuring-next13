import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        name: string;
        apiToken?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: string;
        role: {
            id: number;
            name: string;
        };
        permissions: string[];
    }
    interface Session {
        user: User & DefaultSession['user'];
    }
}
