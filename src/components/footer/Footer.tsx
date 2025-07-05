import { Collaborator } from "../Collaborator";
import logo from "../assets/Navi.png";

const collaborators = [
  {
    name: "Adriana Guevara",
    imageUrl: "https://github.com/adrianaessa.png",
    linkedinUrl: "https://www.linkedin.com/in/adrianacamposguevara/",
    altText: "Mulher branca, com cabelo cacheado, sorrindo, fundo branco.",
  },
  {
    name: "Alejandro Amoroso",
    imageUrl: "https://github.com/LdeAlejandro.png",
    linkedinUrl: "https://www.linkedin.com/in/alejandro-amoroso/?locale=pt_BR",
    altText: "Homem branco, cabelo longo, fundo amarelo.",
  },
  {
    name: "Daysibel Pitter",
    imageUrl: "https://github.com/daysibel1175.png",
    linkedinUrl:
      "https://www.linkedin.com/in/daysibelcotizpitter?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    altText: "Mulher parda, usando oculos de grau, fundo claro.",
  },
  {
    name: "Jani Exaez",
    imageUrl: "https://github.com/jexaez.png",
    linkedinUrl: "https://www.linkedin.com/in/jexaez/",
    altText:
      "Mulher branca, usando óculos e camisa branca com desenhos de cor azul.",
  },
  {
    name: "Paula Gimenez",
    imageUrl: "https://github.com/pbgv2705.png",
    linkedinUrl: "https://www.linkedin.com/in/paula-gimenez-backend/",
    altText:
      "Mulher branca com cabelo branco, usando jaqueta marrom e cachecol cor laranja clara.",
  },
  {
    name: "Nadi Duno",
    imageUrl: "https://github.com/nadiduno.png",
    linkedinUrl: "https://www.linkedin.com/in/nadiduno/",
    altText: "Mulher parda, usando camisa branca, sorrindo, fundo claro.",
  },
  {
    name: "Oswaldo Ravelo",
    imageUrl: "https://github.com/ravelos.png",
    linkedinUrl: "https://www.linkedin.com/in/raveloswaldo/",
    altText: "Homem pardo, fundo branco.",
  },
  {
    name: "Thatiane Vasconcelos",
    imageUrl: "https://github.com/vasconcelos3011.png",
    linkedinUrl: "https://www.linkedin.com/in/thatiane-vasconcelos-790761156/",
    altText: "Mulher branca, com cabelo cumprido, sorrindo, fundo cinza.",
  },
  {
    name: "Valdirene Verdum",
    imageUrl: "https://github.com/vverdum.png",
    linkedinUrl: "https://www.linkedin.com/in/dev-vverdum/",
    altText: "Mulher branca, usando oculos, sorrindo.",
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary3  text-white w-full py-[1.5rem] rounded-2xl text-[14px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
        <div className="mb-4">
          <img
            className="h-auto w-[40%] md:w-[50%] object-contain"
            src={logo}
            alt="fly logo"
          />
        </div>

        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.flyeducacao.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://www.flyeducacao.org/transparencia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Transparência
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.flyeducacao.org/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Carreiras e voluntariado
              </a>
            </li>
            <li>
              <a
                href="https://www.flyeducacao.org/contato"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/flyeducacao/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/flyeducacao/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@flyeducacaocultura1916"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.flyeducacao.org/_files/ugd/d7a054_037066e32d514af58b94eb1fff2c16a4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Estatuto social
              </a>
            </li>
            <li>
              <a
                href="https://www.flyeducacao.org/_files/ugd/d7a054_5f81febe170e4959b34f502ed2f1977d.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Diretores e conselheiros
              </a>
            </li>
            <li>
              <a
                href="https://www.flyeducacao.org/_files/ugd/d7a054_cb4442e7e7fb4da8aba6b1bff1f405c0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Cartão CNPJ
              </a>
            </li>
            <li>
              <a
                href="https://www.flyeducacao.org/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Termos & Condições{" "}
              </a>
            </li>
            <li>
              <a
                href="https://www.flyeducacao.org/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Política de Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Termos & Condições
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Política de Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Cartão CNPJ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex items-center justify-center mt-6 mb-2">
        <p className="text-sm flex pb-1">Colaboradores do site:</p>
      </div>
      <div className="flex items-center justify-center gap-1 mx-2 max-w-full">
        {collaborators.map((collaborator, index) => (
          <Collaborator
            key={index}
            name={collaborator.name}
            imageUrl={collaborator.imageUrl}
            linkedinUrl={collaborator.linkedinUrl}
            altText={collaborator.altText}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between text-[10px] px-10 mt-5 mb-2 pb-2 ">
        <p className="">&copy;{new Date().getFullYear()} por Fly</p>
        <p>brasil@flyeducacao.org</p>
      </div>
    </footer>
  );
}
