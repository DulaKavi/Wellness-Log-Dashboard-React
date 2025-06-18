import React from 'react';

export const ApiStatus: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const isPostmanConfigured = apiUrl && !apiUrl.includes('your-mock-server-url');

  if (isPostmanConfigured) {
    return (
      <div className="card" style={{ 
        background: 'var(--success-color)', 
        color: 'white',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div>
            <strong>Postman Mock Server Connected</strong>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              API URL: {apiUrl}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ 
      background: 'var(--warning-color)', 
      color: 'white',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div>
          <strong>Using Fallback Mock API</strong>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Set up Postman Mock Server for full assessment compliance
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem' }}>
            See <code>postman/README.md</code> for setup instructions
          </div>
        </div>
      </div>
    </div>
  );
}; 