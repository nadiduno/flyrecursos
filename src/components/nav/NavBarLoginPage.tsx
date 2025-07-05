import logo from "../../assets/logo.png";



export function NavbarLoginPage() {
   
    return (
        <div className="w-full h-[80px] flex justify-between py-4 px-3 items-center">
            <div className="lg:w-[6%] h-[100%] flex items-center justify-start xs:w-[20%]" >
                <img
                    className="h-full w-full object-contain"
                    src={logo}
                    alt="fly logo"
                />
            </div>
        </div>
    );
}