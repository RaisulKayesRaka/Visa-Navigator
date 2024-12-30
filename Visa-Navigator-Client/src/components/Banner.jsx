import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      modules={[Pagination, Navigation, Keyboard]}
      className="mySwiper"
      aria-label="Visa Navigator Carousel"
    >
      <SwiperSlide>
        <section className="h-96 bg-[#4682A9] text-white">
          <div className="relative mb-8 h-full rounded bg-[url('../assets/banner1.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="mx-auto w-11/12 max-w-screen-2xl text-center text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                <Typewriter
                  words={["Find the best visa options for you"]}
                  loop={0}
                  cursor
                />
              </h2>
            </div>
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="h-96 bg-[#4682A9] text-white">
          <div className="relative mb-8 h-full rounded bg-[url('../assets/banner2.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="mx-auto w-11/12 max-w-screen-2xl text-center text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                <Typewriter
                  words={["Get expert guidance on your visa application"]}
                  loop={0}
                  cursor
                />
              </h2>
            </div>
          </div>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="h-96 bg-[#4682A9] text-white">
          <div className="relative mb-8 h-full rounded bg-[url('../assets/banner3.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded bg-[#4682A9]/70">
              <h2 className="mx-auto w-11/12 max-w-screen-2xl text-center text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                <Typewriter
                  words={["Secure your visa approval with our expertise"]}
                  loop={0}
                  cursor
                />
              </h2>
            </div>
          </div>
        </section>
      </SwiperSlide>
    </Swiper>
  );
}
