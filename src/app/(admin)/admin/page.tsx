import { ArtcileForm } from './ArticleForm'
import { PeriodChunks } from './PeriodChunks'
import { PeriodForm } from './PeriodForm'
import './styles.scss'

export default function AdminPage(){
    return(
        <div className='adminPage'>
            <div className='gridSector'>
                <div className='grid_ch'>  
                    <h1>Статьи</h1>
                    <ArtcileForm/>
                </div>
                <div className='grid_ch'>
                    <h1>Периоды</h1>
                    <PeriodForm/>
                </div>
            </div>
            <PeriodChunks/>
                
            
        </div>
    )
}