import React, { useState, useMemo } from 'react';
import { WellnessLog } from '../../types';

interface WellnessLogListProps {
  logs: WellnessLog[];
  isLoading?: boolean;
  onDelete?: (logId: string) => Promise<void>;
}

export const WellnessLogList: React.FC<WellnessLogListProps> = ({ 
  logs, 
  isLoading = false,
  onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return logs;
    
    return logs.filter(log => 
      log.activityNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.mood.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  const handleDelete = async (logId: string) => {
    if (!onDelete) return;
    
    setDeletingId(logId);
    try {
      await onDelete(logId);
    } catch (error) {
      console.error('Failed to delete log:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodEmoji = (mood: string) => {
    const moodEmojis = {
      'Happy': '😊',
      'Stressed': '😰',
      'Tired': '😴',
      'Focused': '🎯'
    };
    return moodEmojis[mood as keyof typeof moodEmojis] || '😊';
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="text-center">
          <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
          <p className="mt-2">Loading your wellness logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4 flex-mobile-col gap-mobile-2">
        <h3>Your Wellness Journey</h3>
        <div className="form-group" style={{ marginBottom: 0, minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search by activity notes or mood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="text-center" style={{ padding: '2rem' }}>
          {logs.length === 0 ? (
            <>
              <p>No wellness logs yet.</p>
              <p className="text-secondary">Start logging your wellness journey!</p>
            </>
          ) : (
            <p>No logs match your search criteria.</p>
          )}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Mood</th>
                <th>Sleep</th>
                <th>Activity Notes</th>
                {onDelete && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{formatDate(log.createdAt)}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getMoodEmoji(log.mood)} {log.mood}
                    </span>
                  </td>
                  <td>{log.sleepDuration}h</td>
                  <td>
                    <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {log.activityNotes}
                    </div>
                  </td>
                  {onDelete && (
                    <td>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="btn btn-danger"
                        disabled={deletingId === log.id}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        {deletingId === log.id ? (
                          <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {logs.length > 0 && (
        <div className="text-center mt-4 text-secondary">
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
      )}
    </div>
  );
}; 