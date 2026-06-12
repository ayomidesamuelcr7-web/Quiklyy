import React from 'react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 relative font-sans">
      
      {/* Title */}
      <div className="w-full flex justify-center mt-12 mb-6">
        <h1 
          className="text-[#353535] text-center" 
          style={{ fontSize: '28px', fontWeight: 600, lineHeight: '34px', width: '326px' }}
        >
          Smart eats, fast savings
        </h1>
      </div>

      {/* Illustration */}
      <div className="flex-1 w-full flex items-center justify-center min-h-[287px] mb-8">
        {/* Replace with the actual image when provided */}
        <div className="w-full max-w-[391px] h-[287px] flex items-center justify-center">
           <img src="/illustration.png" alt="Smart eats illustration" className="w-full h-full object-contain" onError={(e) => {
             e.target.style.display = 'none';
             e.target.nextSibling.style.display = 'flex';
           }} />
           <div className="hidden w-full h-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex-col items-center justify-center text-gray-400">
             <span>Illustration Placeholder</span>
             <span className="text-xs mt-1">Add illustration.png to public/</span>
           </div>
        </div>
      </div>

      {/* Buttons & Footer */}
      <div className="w-full flex flex-col items-center gap-4 mb-4">
        
        {/* Sign up Button */}
        <button 
          onClick={() => onNavigate('signup')}
          className="bg-[#004067] text-white flex items-center justify-center rounded-full hover:bg-[#002f4d] transition-colors"
          style={{ width: '370px', height: '56px', fontSize: '20px', fontWeight: 600 }}
        >
          Sign up
        </button>

        {/* Log in Button */}
        <button 
          onClick={() => onNavigate('login')}
          className="bg-white flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors border border-[#004067]"
          style={{ width: '370px', height: '56px', fontSize: '20px', fontWeight: 600, color: '#1F1F1F' }}
        >
          Log in
        </button>

        {/* Or Divider */}
        <div className="flex items-center justify-center my-1 w-[370px]">
          <div style={{ width: '145px', height: '1px', backgroundColor: '#D9D9D9' }}></div>
          <span style={{ margin: '0 8px', fontSize: '11px', fontWeight: 600, color: '#000000' }}>Or</span>
          <div style={{ width: '145px', height: '1px', backgroundColor: '#D9D9D9' }}></div>
        </div>

        {/* Continue with Google Button */}
        <button 
          className="bg-white flex items-center justify-center gap-3 rounded-full hover:bg-gray-50 transition-colors border border-[#004067]"
          style={{ width: '370px', height: '56px', fontSize: '20px', fontWeight: 600, color: '#000000' }}
        >
          {/* Google G Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with google
        </button>

      </div>

      {/* Footer Text */}
      <div 
        className="text-center mt-2"
        style={{ width: '345px', fontSize: '11px', fontWeight: 300, color: '#000000' }}
      >
        By continuing, you agree to our <span style={{ fontWeight: 600 }}>Term of services</span> and acknowledge you’ve read our <span style={{ fontWeight: 600 }}>Privacy policy</span>
      </div>

    </div>
  );
};

export default LandingPage;
