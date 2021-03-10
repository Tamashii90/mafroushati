import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Placeholder from "./Placeholder/ReviewCarousel";
import useSWR from "swr";

const ReviewCarousel = () => {
  const { data: reviews } = useSWR("/api/review/featured");
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
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

  return (
    <div className="container">
      <h3>What Our Customers Say</h3>
      {!reviews && (
        <div className="row justify-content-center justify-content-md-start">
          <Placeholder />
        </div>
      )}
      {reviews && (
        <Slider {...settings}>
          {reviews.map(review => (
            <div key={review._id} className="text-center">
              <h2>
                <Link to={`/products/${review.prodId._id}`}>
                  {review.prodId.name}
                </Link>
              </h2>
              <h4>{review.user}</h4>
              <p className="pt-3">{review.content}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ReviewCarousel;
