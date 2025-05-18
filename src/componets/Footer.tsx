
export function Footer(){
    return(
        <footer className= "bg-black text-white w-full py-[1.5rem]">
                <div className= "mx-auto grid text-center ittems-center justify-center font-primaryfont sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 lg:w-auto gap-3">
                    <div className="text-md flex flex-col items-center justify-center gap-3 mt-3">
                        <a href="https://www.flyeducacao.org/terms-and-conditions" 
                        className="hover:opacity-90 sm:gap-3 md:gap-5 lg:gap-6 hover:translate-x-1 transition-all duration-500">Termos e Condições de Uso</a> 
                    </div>    
                    <div className="text-md flex flex-col items-center justify-center gap-3 mt-3">
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_0474e31120564b9c88eae7d082eefa5b.pdf"
                        className="hover:opacity-90 sm:gap-3 md:gap-5 lg:gap-6 hover:translate-x-1 transition-all duration-500">Diretores e Conselheiros eleitos</a>
                    </div>          
                    <div className="text-md flex flex-col justify-center items-center gap-3 mt-3">     
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_74634e815830462abdd26398f5833ee8.pdf"
                        className="hover:opacity-90 sm:gap-3 md:gap-5 lg:gap-6 hover:translate-x-1 transition-all duration-500">Cartão CNPJ</a> 
                    </div>
                    <div className="text-md flex flex-col justify-center items-center gap-3 mt-3">
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_6db0f6de01a941ef9c8d6aea847bebd3.pdf" 
                        className="hover:opacity-90 sm:gap-3 md:gap-5 lg:gap-6 hover:translate-x-1 transition-all duration-500">Estatuto Social</a>
                    </div>

                </div>    

                <div className="mx-auto flex items-center justify-center mt-6 mb-2">
                        <p className="text-sm flex pb-1">Colaboradores do site:</p>       
                </div> 
            
                <div className="flex items-center justify-center gap-1 mx-2 max-w-full">
                     <a href="https://www.linkedin.com/in/adrianacamposguevara/" target="_blank">
                        <img src="https://github.com/adrianaessa.png" title="Adriana Guevara" alt="Mulher branca, com cabelo cacheado, sorrindo, fundo branco."
                        className="rounded-full sm:w-4 sm:h-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/>
                    </a> 
                    <a href="https://www.linkedin.com/in/alejandro-amoroso/?locale=pt_BR" target="_blank">
                        <img src="https://github.com/LdeAlejandro.png" title= "Alejandro Amoroso" alt="Homem branco, cabelo longo, fundo amarelo."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/> 
                    </a>
                    <a href="https://www.linkedin.com/in/daysibelcotizpitter?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                        <img src="https://github.com/daysibel1175.png" title="Daysibel Pitter" alt="Mulher parda, usando oculos de grau, fundo claro."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/> 
                    </a>
                    <a href="https://www.linkedin.com/in/jexaez/" target="_blank">
                        <img src="https://github.com/jexaez.png" title="Jani Exaez" alt="Mulher branca, usando óculos e camisa branca com desenhos de cor azul."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/>
                    </a>
                    <a href="https://www.linkedin.com/in/paula-gimenez-backend/" target="_blank">
                        <img src="https://github.com/pbgv2705.png" title="Paula Gimenez" alt="Mulher branca com cabelo branco, usando jaqueta marrom e cachecol cor laranja clara."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/>
                    </a>
                    <a href="https://www.linkedin.com/in/nadiduno/" target="_blank">
                        <img src="https://github.com/nadiduno.png" title="Nadi Duno" alt="Mulher parda, usando camisa branca, sorrindo, fundo claro."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/> 
                    </a>
                    <a href="https://www.linkedin.com/in/raveloswaldo/" target="_blank">
                        <img src="https://github.com/ravelos.png" title="Oswaldo Ravelo" alt="Homem pardo, fundo branco."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/> 
                    </a>
                    <a href="https://www.linkedin.com/in/thatiane-vasconcelos-790761156/" target="_blank">
                        <img src="https://github.com/vasconcelos3011.png" title="Thatiane Vasconcelos" alt="Mulher branca, com cabelo cumprido, sorrindo, fundo cinza."
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/>       
                    </a>
                    <a href="https://www.linkedin.com/in/dev-vverdum/" target="_blank">
                        <img src="https://github.com/vverdum.png" title="Valdirene Verdum"  alt="Mulher branca, usando oculos, sorrindo."  
                        className="rounded-full sm:h-4 sm:w-4 md:h-8 md:w-8 lg:h-8 lg:w-8 hover:opacity-90"/>
                    </a>
                </div>
                      
                <div>
                    <p className="text-sm mx-auto italic text-center mt-5 mb-2 pb-2">&copy;{new Date().getFullYear()} Fly. Todos os direitos reservados.</p>
                </div>                   
        </footer>
    )
}