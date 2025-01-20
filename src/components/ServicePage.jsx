import React from 'react';

const ServicePage = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 flex items-center justify-center">
      <h1 className="text-5xl font-mono font-bold">{title}</h1>
    </div>
  );
};

export default ServicePage;
