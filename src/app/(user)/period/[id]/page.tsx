import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PeriodClient from "./PeriodClient";

export default async function PeriodPage() {
    const session = await getServerSession();
    if(!session || !session.user){
        redirect("/api/auth/signin");
    } 
    return(
        <PeriodClient>
            
        </PeriodClient>
    )
}