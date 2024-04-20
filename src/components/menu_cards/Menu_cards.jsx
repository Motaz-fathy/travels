import gsap from "gsap";
import React, { useEffect } from "react";
import Slider from "../../sheard/Slider";

export const Menu_cards = ({ open_menu }) => {
  useEffect(
    () => {
      // Animate each card after 0.2s delay in sequence
      if (open_menu) {
        gsap.from(".menu-card", {
          x: "100%",
          y: "-50px",
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
    },
    [open_menu]
  );
  return (

    
          <Slider>
          {[1, 2, 3, 4, 5 , 6].map(item => {
            return (
              <a
                href="#"
                className="menu-card block p-4 max-sm:w-full max-sm:h-auto rounded-lg hover:scale-125 shadow-sm shadow-indigo-100 bg-gray-300"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2">
                  <dl>
                    <div>
                      <dt className="sr-only">Price</dt>

                      <dd className="text-sm text-gray-500">$240,000</dd>
                    </div>

                    <div>
                      <dt className="sr-only">Address</dt>

                      <dd className="font-medium">
                        123 Wallaby Avenue, Park Road
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <svg
                        className="size-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Parking</p>

                        <p className="font-medium">2 spaces</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <svg
                        className="size-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Bathroom</p>

                        <p className="font-medium">2 rooms</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <svg
                        className="size-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Bedroom</p>

                        <p className="font-medium">4 rooms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </Slider>
  
      
  );
};
