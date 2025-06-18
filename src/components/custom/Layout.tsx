import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ 
        background: 'var(--surface-color)', 
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 0'
      }}>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                Wellness Dashboard
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-secondary"
                style={{ 
                  padding: '0.5rem', 
                  minWidth: 'auto',
                  width: '40px',
                  height: '40px'
                }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              
              {/* User Info & Logout */}
              {user && (
                <div className="flex items-center gap-2">
                  <span className="text-secondary">
                    Welcome, {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: 'var(--surface-color)', 
        borderTop: '1px solid var(--border-color)',
        padding: '1rem 0'
      }}>
        <div className="container">
          <div className="text-center text-secondary">
            <p>&copy; 2025 Wellness Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 