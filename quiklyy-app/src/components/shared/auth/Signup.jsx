import { useState } from 'react';
import { Store, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

export default function Signup({ onNavigate }) {
  const [accountType, setAccountType] = useState('personal'); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName: '',
    address: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (accountType === 'personal') {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setErrorMsg("First name and last name are required.");
        return;
      }
    }

    if (accountType === 'business') {
      if (!formData.businessName.trim()) {
        setErrorMsg("Business name is required.");
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: accountType,
            first_name: accountType === 'personal' ? formData.firstName : null,
            last_name: accountType === 'personal' ? formData.lastName : null,
            business_name: accountType === 'business' ? formData.businessName : null,
            address: accountType === 'business' ? formData.address : null,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user && !authData.session) {
        setSuccessMsg("Account created! Please check your email to confirm your address.");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between py-8 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex-grow flex flex-col justify-center">
        
        <div className="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="Quiklyy Logo" 
            className="w-[60px] h-[60px] rounded-[16px] object-cover shadow-sm" 
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }} 
          />
          <div className="hidden w-[60px] h-[60px] rounded-[16px] bg-[#004466] items-center justify-center shadow-sm">
            <span className="text-white font-bold text-3xl leading-none">Q</span>
          </div>
        </div>

        <h2 className="text-center text-[22px] font-bold text-black tracking-tight mb-6">
          Create your account
        </h2>

        <div className="px-5 sm:px-10">
          
          <div className="flex bg-[#f2f2f2] p-1 rounded-[12px] mb-6">
            <button
              onClick={() => setAccountType('personal')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-[10px] text-[13px] font-medium transition-colors ${
                accountType === 'personal' ? 'bg-white text-[#004466] shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} className={accountType === 'personal' ? 'text-[#004466]' : 'text-gray-400'} />
              Personal
            </button>
            <button
              onClick={() => setAccountType('business')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-[10px] text-[13px] font-medium transition-colors ${
                accountType === 'business' ? 'bg-white text-[#004466] shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Store size={16} className={accountType === 'business' ? 'text-[#004466]' : 'text-gray-400'} />
              Business
            </button>
          </div>

          {successMsg && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {accountType === 'personal' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-800 mb-1.5">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-[14px] px-4 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" placeholder="John" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Last name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-[14px] px-4 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" placeholder="Doe" />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Business Name</label>
                  <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full border border-gray-300 rounded-[14px] px-4 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" placeholder="e.g., Local Green Grocers" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Store Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-[14px] px-4 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" placeholder="123 Market St, City" />
                </div>
              </>
            )}

            <div>
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">{accountType === 'personal' ? 'Email Address' : 'Business Email'}</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-[14px] px-4 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" placeholder="Example@email.com" />
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Password</label>
              <div className="relative">
                <input 
                  required 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  autoComplete="new-password"
                  className="w-full border border-gray-300 rounded-[14px] pl-4 pr-12 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" 
                  placeholder="Enter your password" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-800 mb-1.5">Password</label>
              <div className="relative">
                <input 
                  required 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  autoComplete="new-password"
                  className="w-full border border-gray-300 rounded-[14px] pl-4 pr-12 py-3.5 text-sm focus:ring-1 focus:ring-[#004466] focus:border-[#004466] outline-none text-black placeholder:text-gray-400" 
                  placeholder="Confirm your password" 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button disabled={loading} type="submit" className="w-full flex justify-center items-center bg-[#004466] hover:bg-[#00334d] disabled:bg-opacity-70 text-white font-medium py-3.5 px-4 rounded-[16px] transition-colors">
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-black font-bold">Or</span>
                </div>
              </div>

              <button 
                type="button" 
                onClick={handleGoogleSignup}
                className="w-full flex justify-center items-center gap-3 bg-white border border-[#004466] hover:bg-gray-50 text-black font-medium py-3.5 px-4 rounded-[16px] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with google
              </button>
            </div>
          </form>

        </div>
      </div>

      <div className="px-6 pb-2 pt-6 text-center">
        <p className="text-[11px] text-gray-600 leading-snug">
          By continuing, you agree to our <span className="font-bold text-black">Term of services</span> and acknowledge<br/>you've read our <span className="font-bold text-black">Privacy policy</span>
        </p>
      </div>
    </div>
  );
}
