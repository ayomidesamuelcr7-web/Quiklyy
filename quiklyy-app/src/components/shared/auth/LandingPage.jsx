import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-blue flex flex-col justify-between items-center text-white px-6 py-12 relative overflow-hidden">
      {/* Abstract Background Elements matching a dynamic modern design */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 mt-12">
        {/* Placeholder for Character Illustration */}
        <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20 shadow-2xl">
          <svg className="w-32 h-32 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-center">
          Welcome to <span className="text-brand-accent">Quiklyy</span>
        </h1>
        <p className="text-lg text-blue-100 text-center mb-12 max-w-sm">
          Your one-stop solution for fast and reliable local shopping.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4 relative z-10 mb-8">
        <button 
          onClick={() => onNavigate('login')}
          className="w-full bg-brand-accent hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Log In
        </button>
        <button 
          onClick={() => onNavigate('signup')}
          className="w-full bg-white text-brand-blue font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
