import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpeg";
import banner3 from "../assets/banner3.jpeg";


const HeroSlider = () => {

    const imageStyle = {
  width: "100%",
  height: "500px",
  objectFit: "cover",
};

    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            loop={true}
        >
            <SwiperSlide>
                <img
                    src={banner1}
                    alt="Banner 1"
                    style={imageStyle}
                />
            </SwiperSlide>

            <SwiperSlide>
                <img
                    src={banner2}
                    alt="Banner 2"
                    style={imageStyle}
                />
            </SwiperSlide>

            <SwiperSlide>
                <img
                    src={banner3}
                    alt="Banner 3"
                    style={imageStyle}
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default HeroSlider;