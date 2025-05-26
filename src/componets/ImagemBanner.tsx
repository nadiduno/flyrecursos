import desktopImage from '../assets/large.jpg';
import mobileImage from '../assets/small.jpg';

export function ImagemBanner() {
  return (
    <>
      <img
        src={mobileImage}
        alt="Banner mobile"
        className="w-full h-full object-cover object-center md:hidden"
      />
      <img
        src={desktopImage}
        alt="Banner principal"
        className="w-full h-full object-cover hidden md:block md:object-left lg:object-center"
      />
    </>
  );
}
