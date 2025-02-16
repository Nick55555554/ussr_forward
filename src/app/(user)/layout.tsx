import type { Metadata } from "next";
import "../layout.scss";
import SessionProvider from "../components/SessionComponent";
import { getServerSession } from "next-auth";
import NavMenu from "../components/NavMenu";
import { SingOut } from "../components/SingOut";

export const metadata: Metadata = {
  title: "Вперед, Советский Союз!",
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
          <header>
            <NavMenu />
          </header>
          <main>{children}</main>
          <footer className="static-foot">
            <ul className="ul">
              <li className="li">
                Контактный телефон:
                <div className="dannie">+134123481</div>
              </li>
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
