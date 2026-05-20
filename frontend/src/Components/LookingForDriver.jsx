import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center w-full absolute top-0"
        onClick={() => {
          props.setVehicalFound(false);
        }}
      >
        {" "}
        <i className="text-3xl text-gray-200 ri-arrow-down-line"></i>
      </h5>
      <h3 className="text-xl font-semibol mb-3">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-27 "
          src="https://mobile-content.uber.com/launch-experience/top_bar_rides_3d.png"
          alt=""
        />

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
              <i className="text-lg ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-small -mt-1 text-gray-600">
                Kankariya Talab Ahemadabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5  p-3 border-b-1">
           <i className="ri-map-pin-4-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-small -mt-1 text-gray-600">
                Kankariya Talab Ahemadabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 ml-3">
               <i className=" ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> ₹193.20</h3>
              <p className="text-small -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
