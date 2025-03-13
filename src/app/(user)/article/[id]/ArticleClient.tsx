'use client'
import { ArticlesProps } from '@/utils';
import { url } from '@/utils';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import "./styles.scss"
import { saveAs } from "file-saver";
import { AlignmentType, Document, ImageRun, Packer, Paragraph, TextRun } from "docx";
import { VscPinned } from "react-icons/vsc";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useSession } from 'next-auth/react';



export default function ArtilceClient() {
    const { id } = useParams();
    const [dataArticles, setDataArticles] = useState<ArticlesProps>();
    const [pin, setPin] = useState<boolean>();
    const [rate, setRate] = useState<number>();
    const [pinnedArticle, setPinnedArticle] = useState<boolean>(false);
    const [pinAlert, setPinAlert] = useState<boolean>(false);
    const [selectedStar, setSelectedStar] = useState<number>(-1);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [error, setError] = useState<string>("");
    const paragraphs = dataArticles?.content.trim().split('\n');
    const {data: session} = useSession()

    
    useEffect(() => {
        const handleFetch = async (user_email:string | null | undefined) => {
            
            try {
                const responseArticles = await 
                    fetch(`${url}/api/articles/${id}`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({user_email}),
                        }
                    )
                ;

                if (!responseArticles.ok) {
                    const errorMessage = await responseArticles.text(); 
                    throw new Error(`Ошибка сети: ${errorMessage}`);
                }

                const resultArticles = await responseArticles.json();
                setDataArticles(resultArticles.article);
                setPin(resultArticles.itsPinned);
                setRate(resultArticles.degree);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } 
        };

        handleFetch(session?.user?.email);
    }, [id]);
    
    useEffect(() => {
        if(rate && pin){
            setSelectedStar(rate-1);
            setPinnedArticle(pin);
        }
        
    },[rate,pin])

    function createStyledParagraph(text:string) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    size: 28,
                    font: "Arial",
                }),
            ],
        });
    }

    const generateDoc = async () => {
        const illustrations = dataArticles?.illustrations || [];
        const children: any = [];
        
        if (paragraphs) {
            let i = 0;
            let count = 0;
            const imagePromises = [];
    
            for (const paragraphText of paragraphs) {
                const paragraph = createStyledParagraph(paragraphText);
                children.push(paragraph);
                i += 1;
                
                if (i % (Math.floor(paragraphs.length / illustrations.length)) === 0) {
                    const illustrationUrl = illustrations[count];
                    
                    count += 1
                    
                    try {
                        const response = await fetch(illustrationUrl);
                        if (!response.ok) {
                            throw new Error(`Ошибка сети: ${response.statusText}`);
                        }
                        const blob = await response.blob();
                        const arrayBuffer = await blob.arrayBuffer();
    
                        const img = new Image();
                        img.src = URL.createObjectURL(blob);
    
                    
                        const imagePromise = new Promise<void>((resolve) => {
                            img.onload = () => {
                                const width = 600; 
                                const height = (img.height / img.width) * width; 
    
                                children.push(new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    spacing: {
                                        before: 400,
                                        after: 200,
                                    },
                                    children: [
                                        new ImageRun({
                                            data: arrayBuffer,
                                            transformation: {
                                                width: width, 
                                                height: height, 
                                            },
                                            type: "jpg",
                                        }),
                                    ],
                                }));
                                resolve();
                            };

                            img.onerror = () => {
                                
                                resolve(); 
                            };
                        });
    
                        imagePromises.push(imagePromise); 
                    } catch (err) {
                        console.error(err instanceof Error ? err.message : 'Неизвестная ошибка при загрузке изображения');
                    }
                }
            }
    
            
            await Promise.all(imagePromises);
    
            
            const doc = new Document({
                background: {
                    color: "C45911",
                },
                sections: [
                    {
                        children: children, 
                    },
                ],
            });
    
            Packer.toBlob(doc).then((blob) => {
                saveAs(blob, dataArticles?.title);
            });
        } else {
            console.error("No paragraphs available");
        }
    };

    //Закрепление статьи

    const sendData = async (url:string, article_id:any, user_email:any) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ article_id, user_email }), 
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json(); 
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    
    const prevPinnedArticle = useRef(pinnedArticle);

    const handlePinToggle = () => {
        const articleUrl = `${url}/api/pinArticle/${pinnedArticle ? 'remove' : 'create'}`;
        sendData(articleUrl, id, session?.user?.email);
        setPinnedArticle(!pinnedArticle); 
        prevPinnedArticle.current = !pinnedArticle; 

        if (!pinnedArticle) {
            setPinAlert(true);
            const timer = setTimeout(() => {
                setPinAlert(false);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    };
    

    //Оценка статьи
    const rateArticle = async ( article_id:any, user_email:any, degree:number) => {
        try {
            const response = await fetch(`${url}/api/rateArticle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ article_id,user_email, degree }), 
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleStarClick = (index:number) => {
        setSelectedStar(index);  
        if (timer) {
            clearTimeout(timer);
        }              
        setTimer(setTimeout(() => {; 
            rateArticle(Number(id),session?.user?.email,index+1);
        }, 1000)); 
    };
    return (
        <div className='articlePage'>
            <div className='flex-label'>
                <h1 className='bold-label inline'>{dataArticles?.title}</h1>
                    <div className='flex flex-row justify-center items-center gap-10'>
                        <div className={` ${pinAlert ? "message active" : "message invisible"}`} >Статья сохранена</div>
                        <button className='label-button' onClick={handlePinToggle}>
                            <VscPinned size={50} className={pinnedArticle ? 'text-red-500' : ""}/>
                        </button>
                        <button className='label-button' onClick={generateDoc}>
                            <MdOutlineSaveAlt size={45} className='opacity-75'/>
                        </button>
                    </div>
            </div>
            <div className='article-content'>
                {paragraphs?.map((paragraphText, index) => (
                <p key={index} className='paragraph'>
                    {paragraphText}
                </p>
                ))}
            <div className='rating'>
                <h5 className="bg-white rounded-lg p-4 shadow-lg">Пожалуйста, оцените статью 
                    <ul className='rating-stars'>
                    {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="flex items-center">
                    <input
                        type="radio"
                        id={`star-${index}`}
                        name="stars"
                        className="hidden peer"
                        checked={selectedStar === index}
                        onChange={() => handleStarClick(index)}
                    />
                    <label htmlFor={`star-${index}`} className="cursor-pointer">
                        <div
                            className={`star ${
                                selectedStar >= index ? 'filled' : ''
                            }`}
                        />
                    </label>
                </div>
            ))}
                    </ul>
                </h5>
            </div>
            </div>
        </div>
    );
};