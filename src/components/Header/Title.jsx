import React, { useEffect, useState } from 'react'

export const Title = () => {
    const [text, setText] = useState('');
    const fullText = "Welcome to Teleferik The ideal solution to transportation reservation problems in one place";
  
    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex === fullText.length) {
          clearInterval(interval);
        } else {
          setText(fullText.substring(0, currentIndex + 1));
          currentIndex++;

          if(currentIndex === fullText.length) {
            currentIndex = 0
          }
        }
      }, 80 ); // Adjust the interval speed as needed
     
      
      return () => clearInterval(interval);
    }, []);
  
  return (
    <p className="lg:text-4xl font-medium max-md:text-2xl text-gray-200 absolute top-32 left-0 right-0 mx-auto w-2/3 text-center max-md:w-5/6 max-md:top-18">{text}</p>
  )
}
