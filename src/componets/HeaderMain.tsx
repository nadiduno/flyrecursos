import './HeaderMain.css';
import desktopImage from '../assets/large.jpg';
import mobileImage from '../assets/small.jpg'; 

export function HeaderMain() {
    return (
        <div className="header-container">
            <div className="hero-container">
                <img 
                    src={desktopImage} 
                    alt="Banner principal" 
                    className="hero-image desktop-image"
                />
                
                <img 
                    src={mobileImage} 
                    alt="Banner mobile" 
                    className="hero-image mobile-image"
                />
                
                <div className="overlay-content">
                    <nav className="menu-nav">
                        <ul>
                            <li>Mercado</li>
                            <li>Tecnologia</li>
                            <li>Marketing e Empreendedorismo</li>
                            <li>SuperProfs</li>
                            <li>Colorindo</li>
                            <li>Vídeo Cursos</li>
                            <li>Artigos</li>
                        </ul>
                    </nav>
                    
                    <div className="hero-text">
                        <p>
                            Lorem Ipsum é simplesmente uma simulação de texto da
                            indústria tipográfica e de impressos, e vem sendo utilizado
                            desde o século XVI, quando um impressor desconhecido
                            pegou uma bandeja de tipos e os embaralhou para fazer
                            um livro de modelos de tipos. Lorem Ipsum sobreviveu não
                            só a cinco séculos.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
                             suscipit, voluptate asperiores saepe ratione dolorum quis consectetur
                              dolore! Enim nobis illum similique, accusantium temporibus est a aspernatur impedit. Sequi, ut?
                        </p>
                    </div>
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
        
      </div>  
  );
}