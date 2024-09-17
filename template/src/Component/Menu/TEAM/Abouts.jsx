import React from "react";

const Abouts = () => {
  return (
    <div>
        <h1 className="text-4xl font-semibold text-blue-600 text-center mb-9">OUR TEAM MEMBER</h1>
      <div className="grid grid-cols-3 gap-3">
      <div className="card bg-base-100 w-96 shadow-2xl border-2">
          <figure className="px-10 pt-10 avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src="https://i.ibb.co/5TJ9L7r/spiderman1.jpg" />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="font-semibold">NAME: <span className="text-2xl font-bold text-blue-600">Akram Hossain</span></h2>
            <h2 className="font-semibold">
              ID: <span className="text-blue-600 font-semibold text-2xl">C221161</span>
            </h2>
            <h2 className="font-semibold">
             Role: <span className="text-red-600 font-semibold text-xl">DATABASE DESIGN + WEBSITE</span>
            </h2>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-2xl border-2">
          <figure className="px-10 pt-10 avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src="https://i.ibb.co/8XwmrSX/photo-6055218333726392604-y.jpg" />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="font-semibold">NAME: <span className="text-2xl font-bold text-blue-600">iftehad kamal</span></h2>
            <h2 className="font-semibold">
              ID: <span className="text-blue-600 font-semibold text-2xl">C221185</span>
            </h2>
            <h2 className="font-semibold">
             Role: <span className="text-red-600 font-semibold text-xl">DATABASE DESIGN</span>
            </h2>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-2xl border-2">
          <figure className="px-10 pt-10 avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src="https://i.ibb.co/1bSD72S/photo-6055218333726392603-y.jpg" />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="font-semibold">NAME: <span className="text-2xl font-bold text-blue-600">Asif Kabir</span></h2>
            <h2 className="font-semibold">
              ID: <span className="text-blue-600 font-semibold text-2xl">C221173</span>
            </h2>
            <h2 className="font-semibold">
             Role: <span className="text-red-600 font-semibold text-xl">DATABASE DESIGN</span>
            </h2>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Abouts;
