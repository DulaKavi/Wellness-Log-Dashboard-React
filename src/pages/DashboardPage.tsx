import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Layout } from '../components/custom/Layout';
import { WellnessLogForm } from '../components/custom/WellnessLogForm';
import { ApiStatus } from '../components/custom/ApiStatus';
import { useAuth } from '../context/AuthContext';
import { WellnessLog, WellnessLogForm as WellnessLogFormType } from '../types';
import { wellnessApi } from '../services/api';

// Lazy load the list component for performance optimization
const WellnessLogList = lazy(() => 
  import('../components/custom/WellnessLogList').then(module => ({
    default: module.WellnessLogList
  }))
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  // Load wellness logs
  useEffect(() => {
    const loadLogs = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const userLogs = await wellnessApi.getLogs(user.id);
        setLogs(userLogs.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (err) {
        setError('Failed to load wellness logs');
        console.error('Error loading logs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogs();
  }, [user]);

  const handleCreateLog = async (formData: WellnessLogFormType) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const newLog = await wellnessApi.createLog(user.id, formData);
      setLogs(prevLogs => [newLog, ...prevLogs]);
      setError('');
    } catch (err) {
      setError('Failed to save wellness log');
      console.error('Error creating log:', err);
      throw err; 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLog = async (logId: string) => {
    try {
      await wellnessApi.deleteLog(logId);
      setLogs(prevLogs => prevLogs.filter(log => log.id !== logId));
    } catch (err) {
      console.error('Error deleting log:', err);
      throw err;
    }
  };

  return (
    <Layout>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* API Status */}
        <ApiStatus />

        {/* Page Header */}
        <div className="text-center">
          <h2 style={{ marginBottom: '0.5rem' }}>
            Welcome to your Wellness Dashboard
          </h2>
          <p className="text-secondary">
            Track your Daily Mood, Sleep, and Activities to Monitor your Wellness Journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card" style={{ 
            background: 'var(--error-color)', 
            color: 'white',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form Section */}
        <div>
          <WellnessLogForm 
            onSubmit={handleCreateLog} 
            isLoading={isSubmitting}
          />
        </div>

        {/* Statistics Section */}
        {logs.length > 0 && (
          <div className="card">
            <h3 className="mb-4">Quick Stats</h3>
            <div className="grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div className="text-center">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {logs.length}
                </div>
                <div className="text-secondary">Total Logs</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {(logs.reduce((sum, log) => sum + log.sleepDuration, 0) / logs.length).toFixed(1)}h
                </div>
                <div className="text-secondary">Avg Sleep</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {logs.filter(log => log.mood === 'Happy').length}
                </div>
                <div className="text-secondary">Happy Days</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {logs.length > 0 ? Math.ceil((Date.now() - new Date(logs[logs.length - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </div>
                <div className="text-secondary">Days Tracking</div>
              </div>
            </div>
          </div>
        )}

        {/* Logs List Section */}
        <div>
          <Suspense fallback={
            <div className="card">
              <div className="text-center">
                <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
                <p className="mt-2">Loading wellness logs...</p>
              </div>
            </div>
          }>
            <WellnessLogList 
              logs={logs} 
              isLoading={isLoading}
              onDelete={handleDeleteLog}
            />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}; 