
import { useEffect, useRef } from "react";

export const useSlideOnScroll = (set) => {
    
    const slideRef = useRef();
    useEffect(() => {
        window.addEventListener("scroll", slideScroll);
    },[slideRef]);
  
    const slideScroll = event => {
        const topPosition = slideRef.current && slideRef.current.getBoundingClientRect().top+100;
        const onScrolling = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            if (topPosition && topPosition < scrollPosition) {
                set ? set(true) : setTimeout(()=>slideRef.current.classList += ' show',400);
                return window.removeEventListener("scroll", slideScroll)
            }
        }
        onScrolling()
    }

    return { slideRef };
  };