export function Footer(){
    return(
        <footer className= "bg-primary1 text-white p-2">
            <div className= "container flex flex-col sm:text-center md:grid-cols-5 overscroll-auto p-14 h-14 mt-4">        
                <div className= "grid mx-auto font-serif sm:grid-cols-1 md:grid-cols-5 gap-3">
                    
                    <div className="flex flex-col items-center justify-around mx-auto gap-3">
                       <img src="Navi.png" alt="Fly Logo" className="h-auto w-16 mx-auto"/> 
                    
                    </div> 
                    <div className="text-sm flex flex-col justify-center gap-3">
                        <a href="https://www.flyeducacao.org/pol%C3%ADtica-de-cookies" 
                        className="mb-2 hover:underline">Documentos instituitivos</a> 
                    </div>    
                    <div className="text-sm flex flex-col justify-center gap-3">
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_0474e31120564b9c88eae7d082eefa5b.pdf"
                        className="mb-2 hover:underline">Diretores e conselheiros eleitos</a>
                    </div>          
                    <div className="text-sm flex flex-col justify-center gap-3">     
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_74634e815830462abdd26398f5833ee8.pdf"
                        className="mb-2 hover:underline">Cartão CNPJ</a> 
                    </div>
                    <div className="text-sm flex flex-col justify-center gap-3">
                        <a href="https://www.flyeducacao.org/_files/ugd/d7a054_6db0f6de01a941ef9c8d6aea847bebd3.pdf" 
                        className="mb-2 hover:underline">Estatuto Social</a>
                    </div>

                </div>        
                    <div className="mx-auto flex items-center justify-center mt-4">
                        <p className="text-sm flex font-serif">Colaboradores do site:</p>       
                    </div> 
                    <div className="mx-auto flex items-center justify-center h-auto w-10 gap-2">
                        <img src="https://github.com/nadiduno.png" alt="Mulher parda, usando camisa branca, sorrindo, fundo claro."
                        className="mx-auto rounded-full h-5 w-5 border-spacing-3"/> 
                        <img src="https://github.com/ravelos.png" alt="Homem pardo, fundo branco."
                        className="mx-auto rounded-full h-5 w-5"/> 
                        <img src="https://github.com/LdeAlejandro.png" alt="Homem branco, cabelo longo, fundo amarelo."
                        className="mx-auto rounded-full h-5 w-5"/> 
                        <img src="https://github.com/daysibel1175.png" alt="Mulher parda, usando oculos de grau, fundo claro."
                        className="mx-auto rounded-full h-5 w-5"/> 
                        <img src="https://github.com/isaac-kapela.png" alt="Homem preto, usando tranças, fundo escuro."
                        className="mx-auto rounded-full h-5 w-5"/> 
                        <img src="https://github.com/jexaez.png" alt="Mulher..."
                        className="mx-auto rounded-full h-5 w-5"/>
                        <img src="https://github.com/adrianaessa.png" alt="Mulher branca, com cabelo cacheado, sorrindo, fundo branco"
                         className="mx-auto rounded-full h-5 w-5"/>           
                    </div>

                      
                <div>
                    <p className="text-sm italic font-serif text-center mt-5 mb-2">&copy;{new Date().getFullYear()} Fly. Todos os direitos reservados.</p>
                </div>                   
            </div>
        </footer>
    )
}