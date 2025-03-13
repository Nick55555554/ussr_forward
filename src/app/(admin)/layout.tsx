import type { Metadata } from "next";
import "../layout.scss";
import SessionProvider from "../components/SessionComponent";
import { getServerSession } from "next-auth";
import { SingOut } from "../components/SingOut";

export const metadata: Metadata = {
    title: "Панель администратора",
    description: "Слава коммунистам",
};

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();

    return (
    <html lang="ru">
        <body className="antialiased">
        <SessionProvider session={session}>
            <main>{children}</main>
            <footer className="static-foot">
            <ul className="ul">
                <li className="li">
                    <div className="dannie">
                    <SingOut/>
                </div>
                </li>
            </ul>
            </footer>
        </SessionProvider>
        </body>
    </html>
);
}
