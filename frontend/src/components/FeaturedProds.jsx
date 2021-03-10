import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "../scss/product-card.scss";
import "../scss/slick.css";
import Slider from "react-slick";
import Placeholder from "./Placeholder/ProductCarousel";
import useSWR from "swr";

export default function FeaturedProds() {
  const { data: prods } = useSWR("/api/products/featured");
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  if (!prods)
    return (
      <div className="container">
        <h1>Featured</h1>
        <div className="row justify-content-center justify-content-md-start">
          <Placeholder />
        </div>
      </div>
    );

  return (
    <div className="container">
      <h1>Featured</h1>
      <Slider {...settings}>
        {prods.map(product => (
          <div key={product._id} className="px-3">
            <ProductCard product={product} key={product._id} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
