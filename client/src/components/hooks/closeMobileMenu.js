import { useEffect, useRef } from "react";

export const useCloseMobileMenu = handleClick => {
    const innerBorderRef = useRef();
    const oneMore = useRef();
  
    const onClick = event => {
        
      if (innerBorderRef.current && !innerBorderRef.current.contains(event.target) && oneMore.current && !oneMore.current.contains(event.target)) {
        handleClick(false);
      } else{
      }
    };
    useMountEffect(() => {
      document.addEventListener("click", onClick, true);
      return () => {
        document.removeEventListener("click", onClick, true);
      };
    });
  
    return { innerBorderRef, oneMore };
  };
  
  const useMountEffect = fun => useEffect(fun, [fun]);