//import { Video } from "./Video"
//import { videosData } from "./VideoData"
import './HeaderMain.css';

export function HeaderMain() {
  return (
        
    <div className="header-container">
      <nav className="menu-nav">
          <ul>
            <li>Mercado</li>
            <li>Tecnologia</li>
            <li>Marketing e Empreendedorismo</li>
            <li>SuperProfs</li>
            <li>Colorindo</li>
            <li>Video Cursos</li>
            <li>Artigos</li>
          </ul>
        </nav>

        <div className="text-content">
          <p>
            Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica que imprecise, 
            e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja 
            de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não 
            só a cinco séculos.
          </p>
        </div>


        {/* {videosData.map((video) =>{
                  return(
                      <Video 
                          src={video.src}
                          title={video.title}
                          thumbnail={video.thumbnail}
                      />
                  ) 
              })} */}
      </div>  
  );
      
         
}