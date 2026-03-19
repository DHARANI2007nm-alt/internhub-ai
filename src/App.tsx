import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { usePageLoad } from '@/hooks/usePageLoad';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Home from '@/pages/Home';
import Listings from '@/pages/Listings';
import InternshipDetails from '@/pages/InternshipDetails';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Admin from '@/pages/Admin';

function App() {
  const { showOverlay } = usePageLoad(800);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          {/* Page Load Overlay */}
          <PageOverlay isVisible={showOverlay} />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/internships" element={<Listings />} />
              <Route path="/internship/:id" element={<InternshipDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          
          {/* Toast notifications */}
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
