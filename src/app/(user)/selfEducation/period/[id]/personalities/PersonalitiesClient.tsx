'use client'
import { PersonalitiesProps, sectionFetch } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.scss"
import SectionPersonPart from "@/app/UI/sectionPart/SectionPesonality";

export default function PersonalitiesClient(){
    const {id} = useParams()
    const [personalities, setPersonalities] = useState<PersonalitiesProps[]>([])
    useEffect(() => {
        if(id){
            const personalitiesFetch = async () => {
                const newBooks = await sectionFetch('personalities',id)
                setPersonalities(newBooks)
            }
            personalitiesFetch()
        }

    },[])
    useEffect(() => console.log(personalities),[personalities])
    return(
        <div className="person-page">
            <div className="SectionPersonsParts">
                {personalities &&
                personalities.map((personality) => (
                    <SectionPersonPart
                    id={personality.id}
                    title_image={personality.title_image}
                    name={personality.name}
                    period_id={personality.period_id}
                    key={personality.id}
                    />
                ))
                }
            </div>

        </div>
    )
}