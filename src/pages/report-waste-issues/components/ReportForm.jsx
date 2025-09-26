import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    issueType: '',
    location: '',
    description: '',
    photos: [],
    useCurrentLocation: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const issueTypes = [
    {
      id: 'uncollected',
      label: 'Uncollected Trash',
      description: 'Garbage that has not been picked up on schedule',
      icon: 'Trash2'
    },
    {
      id: 'illegal_dumping',
      label: 'Illegal Dumping',
      description: 'Waste dumped in unauthorized locations',
      icon: 'AlertTriangle'
    },
    {
      id: 'damaged_bins',
      label: 'Damaged Bins',
      description: 'Broken or damaged waste collection bins',
      icon: 'Trash'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhotoUpload = (files) => {
    const newPhotos = Array.from(files)?.slice(0, 5 - formData?.photos?.length);
    const photoUrls = newPhotos?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file?.name
    }));

    setFormData(prev => ({
      ...prev,
      photos: [...prev?.photos, ...photoUrls]
    }));
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev?.photos?.filter(photo => photo?.id !== photoId)
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handlePhotoUpload(e?.dataTransfer?.files);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.issueType) {
      newErrors.issueType = 'Please select an issue type';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.trim()?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onSubmit(formData);
      
      // Reset form
      setFormData({
        issueType: '',
        location: '',
        description: '',
        photos: [],
        useCurrentLocation: false
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          handleInputChange('location', `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`);
          handleInputChange('useCurrentLocation', true);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get current location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-standard hover-lift tap-shrink fade-in-fast">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Submit New Report</h2>
          <p className="text-sm text-muted-foreground">Help us keep your community clean</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Issue Type Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Issue Type <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {issueTypes?.map((type) => (
              <button
                key={type?.id}
                type="button"
                onClick={() => handleInputChange('issueType', type?.id)}
                className={`
                  p-4 rounded-lg border-2 text-left transition-standard
                  hover:scale-micro hover:shadow-elevation-1 hover-lift tap-shrink
                  ${formData?.issueType === type?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card text-foreground hover:border-primary/30'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={type?.icon} 
                    size={20} 
                    className={formData?.issueType === type?.id ? 'text-primary' : 'text-muted-foreground'} 
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{type?.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type?.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {errors?.issueType && (
            <p className="text-error text-sm mt-2">{errors?.issueType}</p>
          )}
        </div>

        {/* Location Input */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Input
              label="Location"
              type="text"
              placeholder="Enter street address or landmark"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              error={errors?.location}
              required
              description="Provide the exact location of the issue"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              onClick={getCurrentLocation}
              iconName="MapPin"
              iconPosition="left"
              fullWidth
              className="h-10 hover-lift tap-shrink transition-standard"
            >
              Use Current Location
            </Button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description <span className="text-error">*</span>
          </label>
          <textarea
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            placeholder="Describe the issue in detail. Include any relevant information that would help our team address the problem effectively."
            rows={4}
            maxLength={500}
            className={`
              w-full px-3 py-2 border rounded-lg resize-none
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              transition-colors duration-200
              ${errors?.description 
                ? 'border-error text-error' :'border-border text-foreground bg-input'
              }
            `}
          />
          <div className="flex justify-between items-center mt-2">
            {errors?.description ? (
              <p className="text-error text-sm">{errors?.description}</p>
            ) : (
              <p className="text-muted-foreground text-sm">
                Minimum 10 characters required
              </p>
            )}
            <span className="text-muted-foreground text-sm">
              {formData?.description?.length}/500
            </span>
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Photos (Optional)
          </label>
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center transition-standard cursor-pointer
              ${dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:shadow-elevation-1'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">
              Drag and drop photos here, or click to select
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Up to 5 photos, max 10MB each (JPG, PNG, WEBP)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e?.target?.files)}
              className="hidden"
              id="photo-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              iconName="Camera"
              iconPosition="left"
              className="hover-lift tap-shrink transition-standard"
            >
              Select Photos
            </Button>
          </div>

          {/* Photo Preview */}
          {formData?.photos?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground mb-3">
                Uploaded Photos ({formData?.photos?.length}/5)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {formData?.photos?.map((photo) => (
                  <div key={photo?.id} className="relative group hover-lift transition-standard">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={photo?.url}
                        alt={photo?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removePhoto(photo?.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      iconName="X"
                      iconSize={12}
                    >
                      <span className="sr-only">Remove photo</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
            className="min-w-32 hover-lift tap-shrink transition-standard"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;