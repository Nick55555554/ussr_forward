"use client"
import "./styles.scss"
import { PeriodsProps } from "@/utils";
import {usePathname, useRouter} from "next/navigation";
import { AnimatedBox } from "../animatedBox/AnimatedBox";
import Image from "next/image";


export const Period: React.FC<PeriodsProps> = (
    {id, name, start_date, end_date, title_image}) => 
{
    const router = useRouter();
    const pathname = usePathname()

    const toPeriod = () => {
        if (router) {
            router.push(`${pathname}/period/${id}`);
        } else {
            console.error('Router is not available');
        }
    };
    

    return(
        <AnimatedBox className="cursor-pointer">
            <div className="flex justify-center items-center period"
            onClick={toPeriod}
            >
                <Image
                src={title_image}
                alt="Title Image"
                className="
                rounded-3xl
                period-image
                "
                width={510} height={400}
                />
            <div className="overlay"></div>
            <h1 className="period-name">{name}</h1>
            </div>
        </AnimatedBox>
    )
}