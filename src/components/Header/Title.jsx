import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Title = () => {
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const title = textRef.current;
    const circle = circleRef.current;
    const gradient = gradientRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Check if the mouse is over the circle
      const circleRect = circle.getBoundingClientRect();
      const isOverCircle =
        clientX >= circleRect.left &&
        clientX <= circleRect.right &&
        clientY >= circleRect.top &&
        clientY <= circleRect.bottom;

      if (isOverCircle) {
        // Scale the title inside the circle
        gsap.to(title, {
          duration: 0.3,
          scale: 1.2,
          ease: 'power2.out'
        });

        // Scale other elements behind the circle
        gsap.to('.element-behind-circle', {
          duration: 0.3,
          scale: 1.5,
          ease: 'power2.out'
        });

        // Animate gradient background
        gsap.to(gradient, {
          duration: 0.3,
          backgroundPosition: `${clientX - circleRect.left}px ${clientY - circleRect.top}px`,
          ease: 'power2.out'
        });
      } else {
        gsap.to(title, {
          duration: 0.3,
          scale: 1,
          ease: 'power2.out'
        });

        gsap.to('.element-behind-circle', {
          duration: 0.3,
          scale: 1,
          ease: 'power2.out'
        });

        // Reset gradient animation
        gsap.to(gradient, {
          duration: 0.3,
          backgroundPosition: 'center',
          ease: 'power2.out'
        });
      }

      // Move the circle along with the mouse
      gsap.to(circle, {
        duration: 0.3,
        x: clientX - circleRect.width / 2,
        y: clientY - circleRect.height / 2,
        ease: 'power2.out'
      });
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='w-1/5 min-h-32 flex items-center justify-center'>
      <div className='relative' style={{ width: '200px', height: '200px' }}>
        <span
          className='absolute w-full h-full rounded-full bg-gradient-to-br  shadow-xl blur-2xl'
          ref={circleRef}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <span ref={gradientRef} className='absolute inset-0 bg-gradient-to-br to-gray-900 from-sky-600 '></span>
        </span>
      
      </div>
    </div>
  );
};
