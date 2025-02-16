import { getPeriods, } from "@/utils";
import SelfEducationClinet from "./SelfEducationClient";

export default async function SelfEducationPage (){
    const periods = await getPeriods();

    return (
        <SelfEducationClinet periods={periods}/>
    );
};

