interface VideoProps{
  id?: number
  title?: string;
  src?:string;
  thumbnail?: string;

}


  export function  Video ({ src,title }:VideoProps){

    return (
      
        <div>  
          <video className="w-full mt-[32px]" controls>
            <source src={src} type="video/mp4" />
          </video>

          <div className="w-full bg-primary1" >
            <div className="ml-[29px]">
              <p className= "pt-[15px] text-primary2">{title}</p>
              <p className="text-white pb-[25px]">Outros detalhes do video</p>
            </div> 
          </div>

        </div>
   
    );
  };


