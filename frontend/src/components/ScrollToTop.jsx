import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation()]);
  return null;
}
