import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

export default function Login({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      
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
          <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-3xl leading-none">Q</span>
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('signup')} className="font-medium text-brand-blue hover:text-blue-800 transition-colors">
            Sign up today
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          
          {errorMsg && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {errorMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                required 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" 
                placeholder="you@example.com" 
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-brand-accent hover:text-orange-500 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
              <input 
                required 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none" 
                placeholder="••••••••" 
              />
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="pt-2">
              <button disabled={loading} type="submit" className="w-full flex justify-center items-center gap-2 bg-brand-blue hover:bg-blue-900 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors">
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
