import { animateScroll as scroll } from "react-scroll";

export const scrollToTop = (duration = 1000) => {
  scroll.scrollToTop({
    duration: duration,
    smooth: true,
  });
};
