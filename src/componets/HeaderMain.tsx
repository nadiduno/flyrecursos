import { Video } from "./Video"
import { videosData } from "./VideoData"

export function HeaderMain(){
    return(
        <div>
            
           {videosData.map((video) =>{
                return(
                    <Video 
                        src={video.src}
                        title={video.title}
                        thumbnail={video.thumbnail}
                    />
                ) 
           })}
        </div>
    )
}