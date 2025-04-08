
export function Footer(){
    return(
        <footer className= "bg-black text-white p-4 w-full">
            <div className= "container flex flex-col mx-auto text-center items-center justify-center sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mt-5 mb-0 lg:px-8 lg:w-full"> 

                <div className= "grid mx-auto text-center items-center justify-center font-primaryfont sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">

                    <div className="text-md flex flex-col items-center justify-center gap-3">
                        <a href="https://www.flyeducacao.org/pol%C3%ADtica-de-cookies" 
                        className="hover:opacity-70 sm:gap-3 md:gap-5 lg:gap-6">Documentos instituitivos</a> 
                    </div>    
                    <div className="text-md flex flex-col items-center justify-center gap-3">
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_0474e31120564b9c88eae7d082eefa5b.pdf"
                        className="hover:opacity-70 sm:gap-3 md:gap-5 lg:gap-6">Diretores e Conselheiros eleitos</a>
                    </div>          
                    <div className="text-md flex flex-col justify-center items-center gap-3">     
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_74634e815830462abdd26398f5833ee8.pdf"
                        className="hover:opacity-70 sm:gap-3 md:gap-5 lg:gap-6">Cartão CNPJ</a> 
                    </div>
                    <div className="text-md flex flex-col justify-center items-center gap-3">
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_6db0f6de01a941ef9c8d6aea847bebd3.pdf" 
                        className="hover:opacity-70 sm:gap-3 md:gap-5 lg:gap-6">Estatuto Social</a>
                    </div>

                </div>    

                <div className="mx-auto flex items-center justify-center mt-8">
                        <p className="text-sm flex font-serif pb-1">Colaboradores do site:</p>       
                </div> 
            
                <div className="mx-auto flex items-center justify-center text-center sm:grid-cols-1 sm:gap-2 md:gap-4 mt-3">
                     <a href="www.linkedin.com/in/adrianacamposguevara">
                        <img src="https://github.com/adrianaessa.png" title="Adriana Guevara" alt="Mulher branca, com cabelo cacheado, sorrindo, fundo branco."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/>
                    </a>
                    
                    <a href="https://www.linkedin.com/in/alejandro-amoroso/?locale=pt_BR">
                        <img src="https://github.com/LdeAlejandro.png" title= "Alejandro Amoroso" alt="Homem branco, cabelo longo, fundo amarelo."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/> 
                    </a>

                    <a href="https://www.linkedin.com/in/daysibelcotizpitter?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                        <img src="https://github.com/daysibel1175.png" title="Daysibel Pitter" alt="Mulher parda, usando oculos de grau, fundo claro."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/> 
                    </a>
                   
                    <a href="#">
                        <img src="https://github.com/isaac-kapela.png" title="Isaac Kapela" alt="Homem preto, usando tranças, fundo escuro."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/> 
                    </a>

                    <a href="https://www.linkedin.com/in/jexaez/">
                        <img src="https://github.com/jexaez.png" title="Jani Exaez" alt="Mulher branca, usando óculos e camisa branca com desenhos de cor azul."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/>
                    </a>

                    <a href="https://www.linkedin.com/in/nadiduno/">
                        <img src="https://github.com/nadiduno.png" title="Nadi Duno" alt="Mulher parda, usando camisa branca, sorrindo, fundo claro."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/> 
                    </a>

                    <a href="https://www.linkedin.com/in/raveloswaldo/">
                        <img src="https://github.com/ravelos.png" title="Oswaldo Ravelo" alt="Homem pardo, fundo branco."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/> 
                    </a>

                    <a href="https://www.linkedin.com/in/thatiane-vasconcelos-790761156/">
                        <img src="https://github.com/vasconcelos3011.png" title="Thatiane Vasconcelos" alt="Mulher branca, com cabelo cumprido, sorrindo, fundo cinza."
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/>       
                    </a>

                    <a href="https://www.linkedin.com/in/dev-vverdum/">
                        <img src="https://github.com/vverdum.png" title="Valdirene Verdum"  alt="Mulher branca, usando oculos, sorrindo."  
                        className="mx-auto rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8"/>
                    </a>


                </div>

                      
                <div>
                    <p className="text-sm mx-auto italic font-serif text-center mt-5 mb-0">&copy;{new Date().getFullYear()} Fly. Todos os direitos reservados.</p>
                </div>                   
            </div>
        </footer>
    )
}