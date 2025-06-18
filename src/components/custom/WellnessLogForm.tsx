import React, { useState } from 'react';
import { WellnessLogForm as WellnessLogFormType, ValidationErrors } from '../../types';
import { validateWellnessLogForm, hasValidationErrors } from '../../utils/validation';

interface WellnessLogFormProps {
  onSubmit: (data: WellnessLogFormType) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<WellnessLogFormType>;
}

export const WellnessLogForm: React.FC<WellnessLogFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<WellnessLogFormType>({
    mood: 'Happy',
    sleepDuration: 8,
    activityNotes: '',
    ...initialData
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitError, setSubmitError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'sleepDuration' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
    
    // Clear field error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateWellnessLogForm(formData);
    setErrors(validationErrors);
    
    if (hasValidationErrors(validationErrors)) {
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      if (!initialData.mood) { // Only reset if not editing
        setFormData({
          mood: 'Happy',
          sleepDuration: 8,
          activityNotes: '',
        });
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to save wellness log');
    }
  };

  return (
    <div className="card">
      <h3 className="mb-4">Log Your Wellness</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mood" className="form-label">
            How are you feeling today?
          </label>
          <select
            id="mood"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="form-select"
            disabled={isLoading}
          >
            <option value="Happy">😊 Happy</option>
            <option value="Stressed">😰 Stressed</option>
            <option value="Tired">😴 Tired</option>
            <option value="Focused">🎯 Focused</option>
          </select>
          {errors.mood && <div className="form-error">{errors.mood}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="sleepDuration" className="form-label">
            Sleep Duration: {formData.sleepDuration} hours
          </label>
          <input
            type="range"
            id="sleepDuration"
            name="sleepDuration"
            min="0"
            max="12"
            step="0.5"
            value={formData.sleepDuration}
            onChange={handleChange}
            className="form-range"
            disabled={isLoading}
          />
          <div className="flex justify-between text-sm text-secondary mt-1">
            <span>0h</span>
            <span>6h</span>
            <span>12h</span>
          </div>
          {errors.sleepDuration && <div className="form-error">{errors.sleepDuration}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="activityNotes" className="form-label">
            Activity Notes ({formData.activityNotes.length}/200)
          </label>
          <textarea
            id="activityNotes"
            name="activityNotes"
            value={formData.activityNotes}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe your activities, thoughts, or anything notable about today..."
            rows={4}
            maxLength={200}
            disabled={isLoading}
            style={{ resize: 'vertical' }}
          />
          {errors.activityNotes && <div className="form-error">{errors.activityNotes}</div>}
        </div>

        {submitError && (
          <div className="form-error mb-4">{submitError}</div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="spinner" style={{ marginRight: '0.5rem' }}></div>
              Saving...
            </>
          ) : (
            initialData.mood ? 'Update Log' : 'Save Log'
          )}
        </button>
      </form>
    </div>
  );
}; 