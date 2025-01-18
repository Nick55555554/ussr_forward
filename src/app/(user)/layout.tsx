import type { Metadata } from "next";
import "../layout.scss"
import SessionProvider from "../components/SessionComponent"
import { getServerSession } from "next-auth";
import NavMenu from "../components/NavMenu";
export const metadata: Metadata = {
  title: "Вперед, Советский Союз!",
  description: "Слава коммунистам",
};
  
export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  const session = await getServerSession();
  return (
    <html lang="ru">
      <body
        className="antialiased"
      >
        <SessionProvider session={session}> 
          <NavMenu/> 
          {children}
          <div className="static-foot">
          <ul className="ul">
            <li className="li">
              Контактный телефон: 
              <div className="dannie">+134123481</div>
            </li>
            <li className="li">
              Электронная почта:
              <div className="dannie">exmaple@gmail.ru</div> 
            </li>
            </ul>
        </div>
        </SessionProvider>
        
      </body>
    </html>
  );
}
