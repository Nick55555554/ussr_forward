import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
            params: {
              prompt: "consent", // Запрашивает согласие пользователя каждый раз
              access_type: "offline", // Запрашивает Refresh Token
              response_type: "code" // Указывает, что вы хотите получить код авторизации
                }
            }  
        })
    ], pages: {
        signIn: '/signin',
    },
    
    secret: process.env.NEXTAUTH_SECRET as string, 
    callbacks: {
        async redirect({baseUrl }: {baseUrl: string }) {
            return baseUrl; 
        }
    }
}
export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};

