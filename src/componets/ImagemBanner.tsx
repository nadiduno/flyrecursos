import desktopImage from '../assets/large.jpg';
import mobileImage from '../assets/small.jpg';

export function ImagemBanner() {
  return (
    <>
      <img
        src={mobileImage}
        alt="Banner mobile"
        className="w-full h-full object-cover object-center top-0 left-0 block md:hidden"
      />
      <img
        src={desktopImage}
        alt="Banner principal"
        className="w-full h-full object-cover absolute top-0 left-0 hidden md:block"
      />
    </>
  );
}
