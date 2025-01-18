import { url } from "@/utils";
import SelfEducationClinet from "./SelfEducationClient";

const getPeriods = async () => {
    try {
        const result = await fetch(`${url}/api/periods/`);
        
        if (!result.ok) {
            throw new Error(`Ошибка сети: ${result.status} ${result.statusText}`);
        }

        return await result.json();
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        throw error;
    }
};

export default async function SelfEducationPage (){
    const periods = await getPeriods();
    return (
        <SelfEducationClinet periods={periods}/>
    );
};

