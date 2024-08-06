import React from 'react';


const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-700 shadow-md">
      <div className="container mx-auto py-4 px-6">
        <h1 className="text-white text-2xl font-bold">UniNotes</h1>
      </div>
    </header>
  );
};

export default Header;
