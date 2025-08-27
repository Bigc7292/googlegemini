
import React from 'react';

const LogoIcon: React.FC = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-brand-blue/30 backdrop-blur-sm border-b border-brand-gold/20 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-4">
          <LogoIcon />
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider">
              Seek Beyond Realty
            </h1>
            <p className="text-sm text-brand-gold/80">AI Marketing Video Generator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
