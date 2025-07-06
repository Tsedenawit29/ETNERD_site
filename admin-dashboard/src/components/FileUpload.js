import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

// This component works for both create and edit forms, always allowing upload or URL entry.
const FileUpload = ({ onUpload, currentUrl, accept = '*/*' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Validate file type for images
    if (accept === 'image/*' && !file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Generate a unique file name
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const bucket = accept === 'image/*' ? 'etimages' : 'etfiles';

      // Upload the file
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL - using the correct path
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      console.log('File uploaded successfully:', {
        bucket,
        path: data.path,
        publicUrl
      });

      // Update the form with the URL
      onUpload(publicUrl);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (urlInput.trim()) {
      onUpload(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-3 lg:space-y-4" onClick={(e) => e.stopPropagation()}>
      {currentUrl ? (
        <div className="space-y-2">
          {accept === 'image/*' ? (
            <img
              src={currentUrl}
              alt="Preview"
              className="max-w-full h-32 sm:h-40 lg:h-48 object-contain rounded-lg"
            />
          ) : (
            <div className="p-3 lg:p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 break-all">
                {currentUrl}
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => onUpload('')}
              className="px-2 lg:px-3 py-1 text-xs lg:text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="px-2 lg:px-3 py-1 text-xs lg:text-sm text-dashboard-accent hover:bg-dashboard-accent-dark rounded-md"
            >
              Change URL
            </button>
          </div>
          {showUrlInput && (
            <form onSubmit={handleUrlSubmit} className="mt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-dashboard-accent bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="submit"
                className="px-3 lg:px-4 py-2 bg-dashboard-accent text-white rounded-md hover:bg-dashboard-accent-dark transition-colors duration-200 text-sm"
              >
                Add URL
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUrlInput(false);
                  setUrlInput('');
                }}
                className="px-3 lg:px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
              >
                Cancel
              </button>
            </form>
          )}
          {/* Always show upload area in edit mode */}
          <div
            className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 lg:p-6 text-center transition-colors cursor-pointer hover:border-dashboard-accent dark:hover:border-dashboard-accent mt-2`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={accept}
              className="hidden"
            />
            {isUploading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 lg:h-8 lg:w-8 border-b-2 border-dashboard-accent"></div>
              </div>
            ) : (
              <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-dashboard-accent hover:text-dashboard-accent-dark">
                  Click to upload
                </span>{' '}
                or drag and drop
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {accept === 'image/*'
                ? 'PNG, JPG, GIF up to 10MB'
                : 'Any file up to 10MB'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 lg:space-y-4">
          <div
            className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 lg:p-6 text-center transition-colors ${
              !showUrlInput ? 'cursor-pointer hover:border-dashboard-accent dark:hover:border-dashboard-accent' : ''
            }`}
            onClick={() => !showUrlInput && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={accept}
              className="hidden"
            />
            {showUrlInput ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter URL"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-dashboard-accent focus:border-dashboard-accent bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="px-3 lg:px-4 py-2 bg-dashboard-accent text-white rounded-md hover:bg-dashboard-accent-dark transition-colors duration-200 text-sm"
                  >
                    Add URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUrlInput(false);
                      setUrlInput('');
                    }}
                    className="px-3 lg:px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 lg:h-8 lg:w-8 border-b-2 border-dashboard-accent"></div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-8 w-8 lg:h-12 lg:w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-dashboard-accent hover:text-dashboard-accent-dark">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {accept === 'image/*'
                        ? 'PNG, JPG, GIF up to 10MB'
                        : 'Any file up to 10MB'}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUrlInput(true);
                      }}
                      className="mt-2 text-xs lg:text-sm text-dashboard-accent hover:text-dashboard-accent-dark dark:text-dashboard-accent-dark dark:hover:text-dashboard-accent-light"
                    >
                      Or add a URL instead
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs lg:text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUpload; 