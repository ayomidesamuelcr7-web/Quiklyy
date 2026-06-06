import { useState } from 'react';
import { Store, User, ArrowRight } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

export default function Signup({ onNavigate }) {
  const [accountType, setAccountType] = useState('personal'); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
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
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords don't match!");
        return;
      }
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

      if (authData.user) {
        if (!authData.session) {
          setSuccessMsg("Account created! Please check your email to confirm your address.");
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center">
            <span className="text-white font-bold text-3xl leading-none">Q</span>
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="font-medium text-brand-blue hover:text-blue-800 transition-colors">
            Sign in instead
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              onClick={() => setAccountType('personal')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                accountType === 'personal' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={18} />
              Personal
            </button>
            <button
              onClick={() => setAccountType('business')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                accountType === 'business' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Store size={18} />
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            {accountType === 'personal' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input required type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="••••••••" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="e.g., Local Green Grocers" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="contact@business.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="123 Market St, City" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input required type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" placeholder="••••••••" />
                  </div>
                </div>
              </>
            )}

            <div className="pt-2">
              <button disabled={loading} type="submit" className="w-full flex justify-center items-center gap-2 bg-brand-blue hover:bg-blue-900 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors">
                {loading ? 'Creating...' : 'Create Account'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
