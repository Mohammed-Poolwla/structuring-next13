import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginPost } from '../../../auth/service';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== 'undefined') {
                    const res = await loginPost(credentials)
                        .then((re) => re.data)
                        .catch((err) => err.response.data);

                    if (res.user) {
                        console.log('user...', res.user);
                        // localStorage.setItem('test', "chk2!!!")
                        return {
                            id: res.user.id,
                            name: res.user.first_name + ' ' + res.user.last_name,
                            email: res.user.email,
                            image: null,
                            apiToken: res.user.token
                        };
                    } else {
                        console.log('user...', res.message);
                        return null;
                    }
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // the processing of JWT occurs before handling sessions.
            // console.log("jwt callback ", { token, user, session });

            if (user) {
                token.accessToken = user.apiToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = user.accessTokenExpires;
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        },

        //  The session receives the token from JWT
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken as string,
                    refreshToken: token.refreshToken as string,
                    role: token.role,
                    id: token.id
                },
                error: token.error
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
