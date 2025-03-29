interface CardVideoProps{
  id?: number
  title?: string;
  src?:string;
  thumbnail?: string;

}


  export function  CardVideo ({ src,title }:CardVideoProps){

    return (
      
        <div className="">  
          <video className="ml-[3px] mr-[5px] mt-[32px]" controls>
            <source src={src} type="video/mp4" />
          </video>

          <div className="w-full bg-primary1 mt-[8px]" >
            <div className="ml-[29px]">
              <p className= "pt-[15px] text-primary2">{title}</p>
              <p className="text-white pb-[25px]">Outros detalhes do video</p>
            </div> 
          </div>

        </div>
   
    );
  };


