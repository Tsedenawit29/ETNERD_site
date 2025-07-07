import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import FileUpload from './FileUpload';
import Modal from './Modal';

const DataTable = ({
  tableName,
  columns,
  formFields = [],
  title,
  onEdit,
  onDelete,
  onAdd,
  disableAddNew = false,
  onItemSeen,
}) => {
  console.log('DataTable received formFields:', formFields);
  console.log('Table name:', tableName);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null
  });
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    item: null
  });

  const detailsModalRef = useRef(detailsModal);

  useEffect(() => {
    fetchData();
  }, [tableName]);

  useEffect(() => {
    // When details modal opens for et_book, mark as seen
    if (
      detailsModal.isOpen &&
      tableName === 'et_book' &&
      detailsModal.item &&
      detailsModal.item.seen === false
    ) {
      const markBookingSeen = async () => {
        await supabase.from('et_book').update({ seen: true }).eq('id', detailsModal.item.id);
        // Optionally update local data
        setData((prev) =>
          prev.map((row) =>
            row.id === detailsModal.item.id ? { ...row, seen: true } : row
          )
        );
        if (onItemSeen) onItemSeen(detailsModal.item.id);
      };
      markBookingSeen();
    }
  }, [detailsModal, tableName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const dataToSubmit = { ...formData };
      console.log('Original form data:', dataToSubmit);

      // Remove any remaining _url fields that might be used for UI only
      Object.keys(dataToSubmit).forEach(key => {
        if (key.endsWith('_url') && key !== 'file_url' && key !== 'image_url') {
          delete dataToSubmit[key];
        }
      });

      console.log('Data to submit after processing:', dataToSubmit);

      if (editingId) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToSubmit)
          .eq('id', editingId);

        if (error) throw error;

        setModalConfig({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'Item has been updated successfully.',
          onConfirm: null
        });
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([dataToSubmit]);

        if (error) throw error;

        setModalConfig({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'New item has been created successfully.',
          onConfirm: null
        });
      }

      setIsModalOpen(false);
      setEditingId(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: `Error saving data: ${error.message}`,
        onConfirm: null
      });
    }
  };

  const handleEdit = (item) => {
    // When editing, use the item data directly as the column names are correct
    setFormData(item);
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const { error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', id);
          
          if (error) throw error;
          
          setModalConfig({
            isOpen: true,
            type: 'success',
            title: 'Success!',
            message: 'Item has been deleted successfully.',
            onConfirm: null
          });
          
          fetchData();
        } catch (error) {
          setModalConfig({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: `Error deleting item: ${error.message}`,
            onConfirm: null
          });
        }
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const renderCardContent = (item) => {
    switch (tableName) {
      case 'resources':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Category:</span> {item.category}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              {truncateText(item.content)}
            </p>
            {item.file_url && (
              <a 
                href={item.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-dashboard-accent dark:text-dashboard-accent-light hover:underline"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View File
              </a>
            )}
          </div>
        );

      case 'our_work':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              {truncateText(item.description)}
            </p>
            {item.link && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-dashboard-accent dark:text-dashboard-accent-light hover:underline"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Link
              </a>
            )}
          </div>
        );

      case 'events':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.name}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">Location:</span> {item.location}
              </p>
              <p className="text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">Date:</span> {new Date(item.event_date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              {truncateText(item.description)}
            </p>
            <div className="flex items-center justify-between">
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-dashboard-accent dark:text-dashboard-accent-light hover:underline"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Link
                </a>
              )}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                item.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {item.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.headline}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">Author:</span> {item.author}
              </p>
              <p className="text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">Date:</span> {new Date(item.published_date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              {truncateText(item.content, 200)}
            </p>
            <div className="flex items-center justify-between">
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-dashboard-accent dark:text-dashboard-accent-light hover:underline"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Link
                </a>
              )}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                item.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {item.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        );

      case 'contact_messages':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Email:</span> <a href={`mailto:${item.email}`} className="text-dashboard-accent hover:text-dashboard-accent-dark dark:text-dashboard-accent-dark dark:hover:text-dashboard-accent-darker hover:underline transition-colors duration-200">{item.email}</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              {truncateText(item.message)}
            </p>
          </div>
        );

      case 'et_book':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Email:</span> <a href={`mailto:${item.email}`} className="text-dashboard-accent underline hover:text-dashboard-primary">{item.email}</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Phone:</span> {item.phone}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Subject:</span> {item.subject}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Meassage:</span> {item.content}
            </p>
            {item.file_url && (
              <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">File Url:</span> <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-dashboard-accent underline hover:text-dashboard-primary break-all">{item.file_url}</a>
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Seen:</span> {item.seen ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Yes</span> : <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">No</span>}
            </p>
          </div>
        );

      case 'et_contact_messages':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Email:</span> <a href={`mailto:${item.email}`} className="text-dashboard-accent underline hover:text-dashboard-primary">{item.email}</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Subject:</span> {item.subject}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Meassage:</span> {item.message}
            </p>
            {item.file_url && (
              <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">File Url:</span> <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-dashboard-accent underline hover:text-dashboard-primary break-all">{item.file_url}</a>
              </p>
            )}
          </div>
        );

      case 'et_career':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.full_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Email:</span> <a href={`mailto:${item.email}`} className="text-dashboard-accent underline hover:text-dashboard-primary">{item.email}</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Phone:</span> {item.phone}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Subject:</span> {item.subject}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Message:</span> {item.meassage}
            </p>
            {item.file_url && (
              <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">File Url:</span> <a href={`https://lyuqbekqidamzuvgtinu.supabase.co/storage/v1/object/public/etfiles/cvs/${item.file_url}`} target="_blank" rel="noopener noreferrer" className="text-dashboard-accent underline hover:text-dashboard-primary break-all">{item.file_url}</a>
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Created At:</span> {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
            </p>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-2 p-2">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-24 object-cover rounded border border-dashboard-accent mb-1"
              />
            )}
            <h3 className="text-base font-semibold text-gray-900 dark:text-dashboard-primary-bright truncate">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-dashboard-primary-bright truncate">
              {truncateText(item.content, 120)}
            </p>
            <button
              className="mt-1 px-3 py-1 rounded bg-dashboard-accent text-white text-xs font-semibold hover:bg-dashboard-primary transition-all duration-200"
              onClick={() => setDetailsModal({ isOpen: true, item })}
            >
              Details
            </button>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-2 p-2">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.headline}
                className="w-full h-24 object-cover rounded border border-dashboard-accent mb-1"
              />
            )}
            <h3 className="text-base font-semibold text-gray-900 dark:text-dashboard-primary-bright truncate">
              {item.headline}
            </h3>
            <p className="text-xs text-gray-600 dark:text-dashboard-primary-bright truncate">
              {truncateText(item.content, 120)}
            </p>
            <button
              className="mt-1 px-3 py-1 rounded bg-dashboard-accent text-white text-xs font-semibold hover:bg-dashboard-primary transition-all duration-200"
              onClick={() => setDetailsModal({ isOpen: true, item })}
            >
              Details
            </button>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            {Object.entries(item).map(([key, value]) => (
              key !== 'id' && key !== 'created_at' && (
                <div key={key}>
                  <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span> {
                      typeof value === 'boolean' ? (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                          value ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {value ? 'Yes' : 'No'}
                        </span>
                      ) : (
                        value?.toString() || '-'
                      )
                    }
                  </p>
                </div>
              )
            ))}
          </div>
        );
    }
  };

  const renderDetailsContent = (item) => {
    const imageSection = (imageUrl, alt) => (
      <div className="mb-6">
        <img 
          src={imageUrl} 
          alt={alt} 
          className="w-full h-64 object-cover rounded-xl border-2 border-dashboard-accent shadow-lg"
        />
      </div>
    );

    switch (tableName) {
      case 'resources':
        return (
          <div className="space-y-6">
            {item.image_url && imageSection(item.image_url, item.title)}
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Title</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright">{item.title}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Category</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright">{item.category}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Content</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright whitespace-pre-wrap">{item.content}</p>
              </div>

              {item.file_url && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">File</h4>
                  <a 
                    href={item.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-dashboard-accent text-dashboard-primary rounded-lg hover:bg-dashboard-accent-dark transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View File
                  </a>
                </div>
              )}
            </div>
          </div>
        );

      case 'our_work':
        return (
          <div className="space-y-6">
            {/* Title and Description - Side by side */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'title')?.label}
                  {formFields.find(f => f.name === 'title')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'title'))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'description')?.label}
                  {formFields.find(f => f.name === 'description')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'description'))}
              </div>
            </div>
            {/* Link and Image - Side by side */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'link')?.label}
                  {formFields.find(f => f.name === 'link')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'link'))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'image_url')?.label}
                  {formFields.find(f => f.name === 'image_url')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'image_url'))}
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            {item.image_url && imageSection(item.image_url, item.name)}
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Name</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright">{item.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Location</h4>
                  <p className="text-gray-700 dark:text-dashboard-primary-bright">{item.location}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Date</h4>
                  <p className="text-gray-700 dark:text-dashboard-primary-bright">{new Date(item.event_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Status</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    item.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Description</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright whitespace-pre-wrap">{item.description}</p>
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-6">
            {item.image_url && imageSection(item.image_url, item.headline)}
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Headline</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright">{item.headline}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Author</h4>
                  <p className="text-gray-700 dark:text-dashboard-primary-bright">{item.author}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Published Date</h4>
                  <p className="text-gray-700 dark:text-dashboard-primary-bright">{new Date(item.published_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Status</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    item.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2">Content</h4>
                <p className="text-gray-700 dark:text-dashboard-primary-bright whitespace-pre-wrap">{item.content}</p>
              </div>
            </div>
          </div>
        );

      case 'et_career':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright">
              {item.full_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Email:</span> <a href={`mailto:${item.email}`} className="text-dashboard-accent underline hover:text-dashboard-primary">{item.email}</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Phone:</span> {item.phone}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Subject:</span> {item.subject}
            </p>
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Message:</span> {item.meassage}
            </p>
            {item.file_url && (
              <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
                <span className="font-medium">File Url:</span> <a href={`https://lyuqbekqidamzuvgtinu.supabase.co/storage/v1/object/public/etfiles/cvs/${item.file_url}`} target="_blank" rel="noopener noreferrer" className="text-dashboard-accent underline hover:text-dashboard-primary break-all">{item.file_url}</a>
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-dashboard-primary-bright">
              <span className="font-medium">Created At:</span> {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {Object.entries(item).map(([key, value]) => (
              key !== 'id' && (
                <div key={key}>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-dashboard-primary-bright mb-2 capitalize">
                    {key.replace(/_/g, ' ')}
                  </h4>
                  <p className="text-gray-700 dark:text-dashboard-primary-bright">
                    {typeof value === 'boolean' ? (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        value ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {value ? 'Yes' : 'No'}
                      </span>
                    ) : (
                      value?.toString() || '-'
                    )}
                  </p>
                </div>
              )
            ))}
          </div>
        );
    }
  };

  const renderFormField = (field) => {
    console.log('Rendering field:', field.name, 'type:', field.type, 'value:', formData[field.name]);
    
    if (!field) {
      console.log('Field is undefined!');
      return <div>Field not found</div>;
    }
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className="w-full px-4 py-3 border border-dashboard-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-dashboard-primary focus:border-dashboard-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm hover:border-dashboard-accent-dark dark:hover:border-dashboard-accent-darker transition-colors duration-200"
            rows={4}
          />
        );
      case 'image':
        return (
          <FileUpload
            onUpload={(url) => setFormData({ ...formData, [field.name]: url })}
            currentUrl={formData[field.name]}
            accept="image/*"
          />
        );
      case 'file':
        return (
          <FileUpload
            onUpload={(url) => setFormData({ ...formData, [field.name]: url })}
            currentUrl={formData[field.name]}
            accept="*/*"
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
            className="w-4 h-4 text-dashboard-primary bg-gray-100 border-gray-300 rounded focus:ring-dashboard-primary dark:focus:ring-dashboard-accent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        );
      case 'switch':
        console.log('Rendering SWITCH for field:', field.name, 'value:', formData[field.name]);
        return (
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                const newValue = !(formData[field.name] || false);
                console.log('Switch clicked, new value:', newValue);
                setFormData({ ...formData, [field.name]: newValue });
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dashboard-primary focus:ring-offset-2 ${
                (formData[field.name] || false) ? 'bg-dashboard-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  (formData[field.name] || false) ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-gray-700 dark:text-dashboard-primary">
              {(formData[field.name] || false) ? 'Active' : 'Inactive'}
            </span>
          </div>
        );
      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
              className="w-full px-4 py-3 border border-dashboard-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-dashboard-primary focus:border-dashboard-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-dashboard-primary shadow-sm hover:border-dashboard-accent-dark dark:hover:border-dashboard-accent-darker transition-colors duration-200 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:dark:invert [&::-webkit-calendar-picker-indicator]:dark:brightness-0 [&::-webkit-calendar-picker-indicator]:dark:saturate-100 [&::-webkit-calendar-picker-indicator]:dark:hue-rotate-[180deg]"
            />
          </div>
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className="w-full px-4 py-3 border border-dashboard-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-dashboard-primary focus:border-dashboard-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm hover:border-dashboard-accent-dark dark:hover:border-dashboard-accent-darker transition-colors duration-200"
          >
            <option value="">Select a category</option>
            {field.options && field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        console.log('Using DEFAULT case for field:', field.name, 'type:', field.type);
        // Special handling for active field if it's not being caught by switch case
        if (field.name === 'active' && field.type === 'switch') {
          console.log('FALLBACK: Rendering switch for active field');
          return (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  const newValue = !(formData[field.name] || false);
                  console.log('Switch clicked, new value:', newValue);
                  setFormData({ ...formData, [field.name]: newValue });
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dashboard-primary focus:ring-offset-2 ${
                  (formData[field.name] || false) ? 'bg-dashboard-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    (formData[field.name] || false) ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-gray-700 dark:text-dashboard-primary">
                {(formData[field.name] || false) ? 'Active' : 'Inactive'}
              </span>
            </div>
          );
        }
        return (
          <input
            type="text"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className="w-full px-4 py-3 border border-dashboard-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-dashboard-primary focus:border-dashboard-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm hover:border-dashboard-accent-dark dark:hover:border-dashboard-accent-darker transition-colors duration-200"
          />
        );
    }
  };

  const renderFormFields = () => {
    switch (tableName) {
      case 'services':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                Title <span className="text-red-500 ml-1">*</span>
              </label>
              {renderFormField({ name: 'title', type: 'text', required: true })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[220px]">
              <div className="flex flex-col h-full min-h-[180px]">
                <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                  Description <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex-1 flex items-stretch">
                  {renderFormField({ name: 'description', type: 'textarea', required: true })}
                </div>
              </div>
              <div className="flex flex-col h-full min-h-[180px]">
                <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                  Image <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex-1 flex items-center justify-center">
                  {renderFormField({ name: 'image_url', type: 'image', required: true })}
                </div>
              </div>
            </div>
          </div>
        );
      case 'resources':
        return null;
      case 'our_work':
        return (
          <div className="space-y-6">
            {/* Title and Description - Side by side */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'title')?.label}
                  {formFields.find(f => f.name === 'title')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'title'))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'description')?.label}
                  {formFields.find(f => f.name === 'description')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'description'))}
              </div>
            </div>
            {/* Link and Image - Side by side */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'link')?.label}
                  {formFields.find(f => f.name === 'link')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'link'))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {formFields.find(f => f.name === 'image_url')?.label}
                  {formFields.find(f => f.name === 'image_url')?.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(formFields.find(f => f.name === 'image_url'))}
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4 lg:space-y-6">
            {/* Title and Active - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Title *
                </label>
                {renderFormField({ name: 'name', type: 'text', required: true })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Active
                </label>
                {renderFormField({ name: 'active', type: 'switch' })}
              </div>
            </div>
            {/* Location and Date - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Location *
                </label>
                {renderFormField({ name: 'location', type: 'text', required: true })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Date *
                </label>
                {renderFormField({ name: 'event_date', type: 'date', required: true })}
              </div>
            </div>
            {/* Link and Description - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Link
                </label>
                {renderFormField({ name: 'link', type: 'text' })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Description
                </label>
                {renderFormField({ name: 'description', type: 'textarea' })}
              </div>
            </div>
            {/* Image - Full width below */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                Image
              </label>
              {renderFormField({ name: 'image_url', type: 'image' })}
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-4 lg:space-y-6">
            {/* Title and Active - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Title *
                </label>
                {renderFormField({ name: 'headline', type: 'text', required: true })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Active
                </label>
                {renderFormField({ name: 'active', type: 'switch' })}
              </div>
            </div>
            {/* Author and Published Date - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Author *
                </label>
                {renderFormField({ name: 'author', type: 'text', required: true })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Published Date *
                </label>
                {renderFormField({ name: 'published_date', type: 'date', required: true })}
              </div>
            </div>
            {/* Link and Content - Side by side on larger screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Link
                </label>
                {renderFormField({ name: 'link', type: 'text' })}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  Content *
                </label>
                {renderFormField({ name: 'content', type: 'textarea', required: true })}
              </div>
            </div>
            {/* Image - Full width below */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                Image
              </label>
              {renderFormField({ name: 'image_url', type: 'image' })}
            </div>
          </div>
        );

      case 'et_jobs':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                  Title <span className="text-red-500 ml-1">*</span>
                </label>
                {renderFormField(formFields.find(f => f.name === 'title'))}
              </div>
              <div className="flex flex-col justify-end">
                <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                  Active
                </label>
                {renderFormField(formFields.find(f => f.name === 'active'))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                  Specification <span className="text-red-500 ml-1">*</span>
                </label>
                {renderFormField(formFields.find(f => f.name === 'specficaton'))}
              </div>
              <div>
                <label className="block text-sm font-medium text-dashboard-primary dark:text-dashboard-primary-bright mb-2">
                  Eligibility <span className="text-red-500 ml-1">*</span>
                </label>
                {renderFormField(formFields.find(f => f.name === 'elgblity'))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 dark:text-dashboard-primary-bright mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(field)}
              </div>
            ))}
          </div>
        );
    }
  };

  if (loading) return <div className="text-dashboard-primary dark:text-dashboard-primary-bright">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-dashboard-primary-bright">{title}</h1>
        {!disableAddNew && (
          <button
            onClick={() => {
              // Initialize formData with default values
              const initialData = {};
              
              // Set default values based on table type
              if (tableName === 'events' || tableName === 'news') {
                initialData.active = false; // Initialize active to false for events and news
              }
              
              console.log('Initializing form data:', initialData);
              setFormData(initialData);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-dashboard-accent text-dashboard-primary rounded-xl hover:bg-dashboard-accent-dark transition-colors duration-200 text-sm lg:text-base"
          >
            Add New
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Delete Button - Top Right */}
            <div className="relative">
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-1.5 lg:p-2 bg-dashboard-accent hover:bg-dashboard-accent-dark rounded-full transition-colors duration-200 z-10"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              {/* Image Section */}
              {item.image_url && (
                <div className="w-full h-32 sm:h-40 lg:h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title || item.name || item.headline || 'Item'}
                    className="w-full h-full object-cover border-b-2 border-dashboard-accent"
                  />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-3 lg:p-4">
              {renderCardContent(item)}
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setDetailsModal({ isOpen: true, item })}
                  className="flex-1 px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-dashboard-primary dark:text-dashboard-primary-bright hover:bg-dashboard-accent-dark/20 rounded-lg transition-colors duration-200"
                >
                  Details
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-dashboard-primary dark:text-dashboard-primary-bright hover:bg-dashboard-accent-dark/20 rounded-lg transition-colors duration-200"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 lg:p-4 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="bg-dashboard-accent-light dark:bg-gray-900 rounded-xl p-4 lg:p-8 w-full max-w-4xl lg:max-w-5xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto border border-dashboard-accent shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-dashboard-primary-bright">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                  setFormData({});
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {renderFormFields()}
              <div className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4 mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    setFormData({});
                  }}
                  className="px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base text-gray-700 dark:text-dashboard-primary-bright hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 lg:px-6 py-2 lg:py-3 bg-dashboard-accent text-dashboard-primary rounded-xl hover:bg-dashboard-accent-dark transition-colors duration-200 border border-dashboard-accent shadow-md hover:shadow-lg text-sm lg:text-base"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification/Confirmation Modal */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Details Modal */}
      {detailsModal.isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 lg:p-4 z-50"
          onClick={() => setDetailsModal({ isOpen: false, item: null })}
        >
          <div 
            className="bg-white dark:bg-black rounded-xl p-4 lg:p-8 w-full max-w-3xl lg:max-w-4xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto border border-dashboard-accent shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-dashboard-primary-bright">
                {tableName === 'resources' ? 'Resource Details' :
                 tableName === 'our_work' ? 'Work Details' :
                 tableName === 'events' ? 'Event Details' :
                 tableName === 'news' ? 'News Details' : 'Item Details'}
              </h2>
              <button
                onClick={() => setDetailsModal({ isOpen: false, item: null })}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 lg:space-y-6">
              {detailsModal.item && renderDetailsContent(detailsModal.item)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable; 