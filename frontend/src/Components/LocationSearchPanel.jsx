import React from 'react'

const LocationSearchPanel = (props) => {
  // sample array for location
  const locations = [
    "Lane no 4,Sukhsagar Nagar Katraj,Pune ",
    "Lane no 8,Sukhsagar Nagar Katraj,Pune malhotra's house",
    "Lane no 5,Sukhsagar Nagar Katraj,Pune",
    "Lane no 6,Sukhsagar Nagar Katraj,Pune",
  ]

  return (
    <div>
      {/* this is just a sample data */}
      {locations.map(function (elem, index) {
        return (
          <div
            key={index}
            onClick={() => {
              props.setvehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className='border-2 p-3 rounded-xl border-gray-100 active:border-black flex gap-4 items-center my-4 justify-start'
          >
            <h2 className='tex-lg font-medium bg-[#eee] h-5 w-5 flex intems-center justify-center rounded-full'>
              <i className="fa-solid fa-location-crosshairs text-xl"></i>
            </h2>
            <h4>{elem}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel
