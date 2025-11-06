import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import image1 from "../../assets/Brown and Beige Modern New Product Sale Banner Landscape.png";
// import image2 from "../../assets/Gold and Black Elegant New Year Sale Banner.png";
// import image3 from "../../assets/Cream and Gold Festive Sale Banner.png";

import image1 from "../../assets/hoiche2.jpg";
import image2 from "../../assets/final.webp";
import image3 from "../../assets/banner7.webp";

function Banner() {
  const images = [
    { id: 1, img: image1 },
    { id: 2, img: image2 },
    { id: 3, img: image3 },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="mt-16 w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((item) => (
          <div key={item.id} className="w-full relative">
            <img
              src={item.img}
              alt={`slide-${item.id}`}
              className="w-full h-56 md:h-98 lg:h-[600px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>

  );
}

export default Banner;
