import { Link } from "react-router-dom";

export function TextUnauthorized() {
  
  return (
    <div className="rounded-2xl p-[0.25rem] md:p-[3rem] z-20 h-fit w-full text-xs bg-white m-4 bg-opacity-70 ">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-black md:text-2xl lg:text-3xl pb-8">
          Oops! Parece que você tentou acessar uma página que exige{" "}
          <span className="text-primary2">uma permissão especial.</span>
        </h1>
        <p className="text-sm leading-relaxed text-gray-800 md:text-[17px] mt-3">
          Não se preocupe, isso é normal! Alguns conteúdos são reservados para quem tem acesso exclusivo.
          <br /><br />
          Se você é <span className="text-primary2">estudante da Fly</span>{" "}e está tentando fazer login, por favor,{" "}
          <Link to="/login" className="text-primary2 hover:underline">
            clique aqui.
          </Link>
          <br /><br />
          Ou se você acredita que deveria ter acesso a essa área, fale com o suporte para que a gente possa te ajudar.
        </p>
      </div>
    </div>
  );
}
