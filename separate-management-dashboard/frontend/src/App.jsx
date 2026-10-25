import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BackendHealthProvider } from './context/BackendHealthContext';
import ManagementNavbar from './components/common/ManagementNavbar';
import Footer from './components/common/Footer';
import ServerWakeupBanner from './components/common/ServerWakeupBanner';
import ManagementConsole from './components/management/ManagementConsole';
import UsersAdminPage from './pages/UsersAdminPage';

function App() {
  return (
    <BackendHealthProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-on-background antialiased font-body">
            <ServerWakeupBanner />
            <ManagementNavbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<ManagementConsole />} />
                <Route path="/management" element={<ManagementConsole />} />
                <Route path="/admin/users" element={<UsersAdminPage />} />
                <Route path="/users" element={<UsersAdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </BackendHealthProvider>
  );
}

export default App;