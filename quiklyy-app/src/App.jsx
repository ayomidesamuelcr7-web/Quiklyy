import { useState, useEffect } from 'react';
import ConsumerDashboard from './components/consumer/ConsumerDashboard';
import BusinessDashboard from './components/business/BusinessDashboard';
import LandingPage from './components/shared/auth/LandingPage';
import Login from './components/shared/auth/Login';
import Signup from './components/shared/auth/Signup';
import { supabase } from './lib/supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [authView, setAuthView] = useState('landing'); 
  const [userRole, setUserRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserRole(session);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserRole(session);
      else setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (session) => {
    const userId = session.user.id;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (data && data.role) {
        setUserRole(data.role);
      } else if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it from metadata
        const metadata = session.user.user_metadata || {};
        const role = metadata.role || 'personal'; // Default to personal, not consumer
        
        const { error: insertError } = await supabase.from('profiles').insert([{
          id: userId,
          role: role,
          first_name: metadata.first_name,
          last_name: metadata.last_name,
          business_name: metadata.business_name,
          address: metadata.address,
        }]);
        
        if (insertError) {
          console.error("Failed to insert profile:", insertError);
        }
        
        setUserRole(role);
      } else {
        console.error("Error fetching profile:", error);
        setUserRole(session.user.user_metadata?.role || 'personal'); 
      }
    } catch (err) {
      console.error("Unexpected error in fetchUserRole:", err);
      setUserRole(session.user.user_metadata?.role || 'personal');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-brand-blue font-bold text-xl">Loading Quiklyy...</div>;
  }

  if (!session) {
    if (authView === 'landing') {
      return <LandingPage onNavigate={setAuthView} />;
    } else if (authView === 'login') {
      return <Login onNavigate={setAuthView} />;
    } else {
      return <Signup onNavigate={setAuthView} />;
    }
  }

  if (userRole === 'business') {
    return <BusinessDashboard session={session} onLogout={handleLogout} />;
  }

  return <ConsumerDashboard session={session} onLogout={handleLogout} />;
}

export default App;
