
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Registration from './components/Registration';
import Guidelines from './components/Guidelines';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import RegistrationForm from './components/RegistrationForm';

const MainSite: React.FC = () => (
  <>
    <Header />
    <main>
      <Hero />
      <About />
      <Events />
      <Registration />
      <Guidelines />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const path = window.location.pathname;

  const renderPage = () => {
    // NOTE: This is a simple client-side router for demonstration.
    // For a production app, a library like react-router-dom would be recommended.
    switch (path) {
      case '/admin':
        // This would be replaced by a secure login page (e.g., using Supabase Auth UI).
        return <AdminLogin />;
      case '/dashboard':
        // In a real application, this route should be protected.
        // This would involve checking the user's authentication status (e.g., from a Supabase session)
        // and redirecting to '/admin' if they are not logged in.
        // Direct URL access should be prevented without a valid session.
        return <AdminDashboard />;
      case '/register':
        return <RegistrationForm />;
      default:
        return <MainSite />;
    }
  };

  return (
    <div className="bg-[#01041a] text-gray-200 font-inter">
      {renderPage()}
    </div>
  );
};

export default App;