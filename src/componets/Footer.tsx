export function Footer(){
    return(
        <footer className= "bg-primary1 text-white p-6 flex justify-center items-center">
            <div className= "container mx-auto flex flex-col justify-center sm:text-center md:text-center p-1 h-4 mt-4">
                <div className= "flex flex-col justify-center text-center font-serif hover:underline md:items-center">
                    <a href="https://www.flyeducacao.org/pol%C3%ADtica-de-cookies" className="mb-2">Documentos instituitivos</a>
                    <a href="https://www.flyeducacao.org/_files/ugd/d7a054_0474e31120564b9c88eae7d082eefa5b.pdf" className="mb-2">Diretores e conselheiros eleitos</a>
                    <a href="https://www.flyeducacao.org/_files/ugd/d7a054_74634e815830462abdd26398f5833ee8.pdf" className="mb-2">Cartão CNPJ</a>
                    <a href="https://www.flyeducacao.org/_files/ugd/d7a054_6db0f6de01a941ef9c8d6aea847bebd3.pdf" className="mb-2">Estatuto Social</a>
                    <div className= "flex flex-col items-center sm:grid-cols-1 md:grid-cols-1 md:items-end mt-4">
                        <img src="Navi.png" alt="Fly Logo" className="w-16 h-auto"/>
                    </div>        
                </div>            
                    <div>
                        <p className="text-sm font-serif text-center mt-4">&copy;{new Date().getFullYear()} Fly. Todos os direitos reservados.</p>
                    </div>                   
            </div>
        </footer>
    )
}