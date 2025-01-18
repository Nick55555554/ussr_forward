"use client"
import { useEffect, useState } from "react";
import "./styles.scss"
import { PeriodsProps } from "@/utils";
import { useRouter } from "next/navigation";
import { AnimatedBox } from "../animatedBox/AnimatedBox";
import { fileTypeFromBuffer  } from 'file-type';
import Image from "next/image";


export const Period: React.FC<PeriodsProps> = ({id, name, start_date, end_date, title_image}) => {
    const [onMouse, setOnMouse] = useState<boolean>(true);
    const router = useRouter();

    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
    const getImageSrc = () => {
        if (title_image && title_image) {
            const uint8Array = new Uint8Array(title_image.data)
            ;
            if (uint8Array.length === 0) {
                console.error('Получен пустой массив байтов');
                return;
            }
            const blob = new Blob([uint8Array], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setImageSrc(url);
            return () => {
            URL.revokeObjectURL(url);
            };
        } else {
            console.error('title_image не имеет правильного формата');
        }
    };

    getImageSrc();
    }, [title_image]);

    const toPeriod = () => {
        if (router) {
            router.push(`/period/${id}`);
        } else {
            console.error('Router is not available');
        }
    };
    

    return(
        <AnimatedBox>
            <div className="flex justify-center items-center period">
            {imageSrc && (
                <Image
                src={imageSrc}
                alt="Title Image"
                className="
                rounded-3xl
                period-image
                "
                width={510}
                height={400}
                />
            )}
            <div className="overlay"></div>
            <h1 className="period-name">{name}</h1>
            </div>
        </AnimatedBox>
    )
}