import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OurParentAction } from "../redux/actions/Ui/UiActions";
import { gsap } from "gsap";
export const PartnerLogos = () => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const { ourPartener } = useSelector(state => state.OurPartnerReducer);
  const logos = ourPartener || [];

  useEffect(
    () => {
      dispatch(OurParentAction());
    },
    [dispatch]
  );

  useEffect(() => {
    if(logos.length !== 0 ){
      const carousel = carouselRef.current;
      const logosWidth = carousel.scrollWidth / 2;
  
      const animation = gsap.to(carousel, {
        x: `-=${logosWidth}`,
        ease: 'circ.inOut',
        duration: 20,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % logosWidth)
        }
      });

      return () => {
        animation.kill();
      };
    }



  }, [logos]);


  return (
    <div className="overflow-hidden  py-20 -rotate-2 ">
      <div ref={carouselRef} className="flex  ">
        {logos.map((logo, index) =>
          <img
            key={index}
            src={logo.image}
            alt={`Logo ${index + 1}`}
            className="h-32 mx-2 rounded-full "
          />
          
        )}
         {logos.map((logo, index) =>
          <img
            key={index}
            src={logo.image}
            alt={`Logo ${index + 1}`}
            className="h-32 mx-2 rounded-full "
          />
         
        )}
      </div>
    </div>
  );
};
