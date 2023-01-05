import React, { useState } from "react";
function Loader({text}) {

  return (
    <>
      <div className="">
        <div
          className="position-fixed w-100"
          style={{
            zIndex: 9199900,
            marginTop: -51,
            height: '120%',
            marginLeft: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter:' blur(2px)'
          }}
        >
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="d-flex  flex-wrap align-items-center justify-content-center">
              <img 
               width={150} className="mt-n4 " src='\loader.svg' alt="" />
              <h2
                className="text-white w-100 text-center mt-5"
              >
                {text}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loader;
