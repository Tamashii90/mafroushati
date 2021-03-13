import React from "react";
import RecentProds from "../components/RecentProds";
import FeaturedProds from "../components/FeaturedProds";
import ReviewCarousel from "../components/ReviewCarousel";

export default function MainPage() {
  return (
    <>
      <div
        style={{ height: "calc(100vh - 60px)", backgroundColor: "red" }}
      ></div>
      <FeaturedProds />
      <RecentProds />
      <ReviewCarousel />
    </>
  );
}
