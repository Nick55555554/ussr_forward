import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionComponent"
import "@/app/layout.scss";
export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    return (
        <html lang="ru">
            <body>
                <SessionProvider session={session}>
                        {children}
                </SessionProvider>
            </body>
        </html>
    );
}
