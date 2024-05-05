import React, { useEffect, useState } from 'react'

export const Title = () => {
    const [text, setText] = useState('');
    const fullText = "Telefreik is a safe, easy and fast application that enables you to search and compare prices and different modes in different times";
  
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
    <p className="text-lg font-medium text-gray-200 absolute top-1/3 left-0 right-0 mx-auto w-1/3 text-center max-md:w-5/6 max-md:top-24">{text}</p>
  )
}
