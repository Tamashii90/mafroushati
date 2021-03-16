import React from "react";
import RecentProds from "../components/RecentProds";
import FeaturedProds from "../components/FeaturedProds";
import ReviewCarousel from "../components/ReviewCarousel";
import SplashImg from "../components/SplashImg";
import Filler1 from "../components/Filler1";

export default function MainPage() {
  return (
    <>
      <SplashImg />
      <Filler1 />
      <FeaturedProds />
      <RecentProds />
      <ReviewCarousel />
    </>
  );
}
