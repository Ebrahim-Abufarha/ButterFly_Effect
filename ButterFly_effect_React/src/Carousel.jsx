import React from 'react';
import carousel1 from '/img/carousel-1.jpg';
import carousel2 from '/img/carousel-2.jpg';
import carousel3 from '/img/carousel-3.jpg';

function Carousel() {
  return (
    <div slider className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* slide 1 */}
      <div slide className="absolute w-full h-full transition-all duration-500">
        <img className="object-cover h-full" src={carousel1} alt="carousel image" />
        <div className="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
          <div className="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
            <i className="top-0.75 text-xxs relative text-slate-700 ni ni-camera-compact"></i>
          </div>
          <h5 className="mb-1 text-white">Get started with Argon</h5>
          <p className="dark:opacity-80">There's nothing I really wanted to do in life that I wasn't able to get good at.</p>
        </div>
      </div>

      {/* slide 2 */}
      <div slide className="absolute w-full h-full transition-all duration-500">
        <img className="object-cover h-full" src={carousel2} alt="carousel image" />
        <div className="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
          <div className="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
            <i className="top-0.75 text-xxs relative text-slate-700 ni ni-bulb-61"></i>
          </div>
          <h5 className="mb-1 text-white">Faster way to create web pages</h5>
          <p className="dark:opacity-80">That's my skill. I'm not really specifically talented at anything except for the ability to learn.</p>
        </div>
      </div>

      {/* slide 3 */}
      <div slide className="absolute w-full h-full transition-all duration-500">
        <img className="object-cover h-full" src={carousel3} alt="carousel image" />
        <div className="block text-start ml-12 left-0 bottom-0 absolute right-[15%] pt-5 pb-5 text-white">
          <div className="inline-block w-8 h-8 mb-4 text-center text-black bg-white bg-center rounded-lg fill-current stroke-none">
            <i className="top-0.75 text-xxs relative text-slate-700 ni ni-trophy"></i>
          </div>
          <h5 className="mb-1 text-white">Share with us your design tips!</h5>
          <p className="dark:opacity-80">Don't be afraid to be wrong because you can't learn anything from a compliment.</p>
        </div>
      </div>

      {/* Control buttons */}
      <button btn-next className="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-right active:scale-110 top-6 right-4"></button>
      <button btn-prev className="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-left active:scale-110 top-6 right-16"></button>
    </div>
  );
}

export default Carousel;