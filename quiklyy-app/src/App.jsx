import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConsumerDashboard from './components/consumer/ConsumerDashboard';
import BusinessDashboard from './components/business/BusinessDashboard';
import LandingPage from './components/shared/auth/LandingPage';
import Login from './components/shared/auth/Login';
import Signup from './components/shared/auth/Signup';
import { supabase } from './lib/supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (currentSession) => {
    const userId = currentSession.user.id;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (data && data.role) {
        setUserRole(data.role);
      } else if (error && error.code === 'PGRST116') {
        const metadata = currentSession.user.user_metadata || {};
        const role = metadata.role || 'personal'; 
        
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
        setUserRole(currentSession.user.user_metadata?.role || 'personal'); 
      }
    } catch (err) {
      console.error("Unexpected error in fetchUserRole:", err);
      setUserRole(currentSession.user.user_metadata?.role || 'personal');
    } finally {
      setLoading(false);
    }
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#004466] font-bold text-xl">Loading Quiklyy...</div>;
  }

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    
    const isBusiness = userRole === 'business';
    
    if (allowedRole === 'business' && !isBusiness) {
      return <Navigate to="/consumer/shop" replace />; 
    }
    
    if (allowedRole === 'personal' && isBusiness) {
      return <Navigate to="/business" replace />; 
    }
    
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!session ? <LandingPage /> : <Navigate to={userRole === 'business' ? '/business' : '/consumer/shop'} replace />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to={userRole === 'business' ? '/business' : '/consumer/shop'} replace />} />
        <Route path="/signup" element={!session ? <Signup /> : <Navigate to={userRole === 'business' ? '/business' : '/consumer/shop'} replace />} />
        
        {/* Protected Routes */}
        <Route 
          path="/business/*" 
          element={
            <ProtectedRoute allowedRole="business">
              <BusinessDashboard session={session} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/consumer/*" 
          element={
            <ProtectedRoute allowedRole="personal">
              <ConsumerDashboard session={session} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
