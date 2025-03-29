import { CardVideo } from "./CardVideo"
import { videosData } from "./VideoData"

export function HeaderMain(){
    return(
        <div>
            
           {videosData.map((video) =>{
                return(
                    <CardVideo 
                        src={video.src}
                        title={video.title}
                        thumbnail={video.thumbnail}
                    />
                ) 
           })}
        </div>
    )
}