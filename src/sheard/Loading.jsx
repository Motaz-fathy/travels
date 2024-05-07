import React from "react";

export const Loading = () => {
  return (
    <div className="w-full h-auto bg-gray-200 flex justify-center items-center ">
       <div className="md:flex md:space-x-4 w-full mx-auto  ">
        <section className="w-full mx-auto px-4  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 ">
     
  
          {
            [1,2,3,4,5,6,7,8].map(() => {
              return (
                <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-6 mb-4 backdrop-filter backdrop-blur-lg ">
                <div className="flex flex-col items-center gap-2 w-full ">
                  <div className="flex justify-between items-center w-full">
                    <div className="animate-pulse px-6 py-6 bg-gray-300 "></div>
                     <span className="animate-pulse px-4 py-1 bg-gray-300 "></span>
                  </div>
        
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start items-center gap-2 ">
                      <div className="border-gray-300 border-l-2 w-2 h-40 animate-pulse"></div>
                      <div className="flex flex-col items-start gap-2 ">
                      <span className="animate-pulse px-6 py-2 bg-gray-300 "> </span>
                      <span className="animate-pulse px-6 py-2 bg-gray-300 "></span>
                      <span className="animate-pulse px-6 py-2 bg-gray-300 "> </span>
                      <span className="animate-pulse px-6 py-2 bg-gray-300 "></span>
                      </div>
        
                    </div>
                   <div className="animate-pulse px-6 py-2 bg-gray-300 "></div>
                  </div>
                   
                   <div  className="flex justify-between items-center w-full">
                    <span className="px-2 py-1 rounded-2xl bg-gray-300 text-white animate-pulse"></span>
                    <div className="flex justify-center items-center gap-2 ">
                      <div className="flex flex-col items-end gap-2 ">
                        <span className="animate-pulse px-6 py-2 bg-gray-300 "></span>
                        <span className="animate-pulse px-6 py-2 bg-gray-300 "> </span>
                      </div>
                       <button className="w-20 h-10 bg-gray-300 text-white rounded-lg  animate-pulse px-2">  </button>
                    </div>
                   </div>
        
                </div>
                </div>
              )
            })
          }
        
        
        </section>
        </div>
    </div>
  );
};
