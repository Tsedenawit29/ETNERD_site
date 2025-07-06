import React from 'react';
import DataTable from '../../components/DataTable';

const Services = () => {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'icon_name', label: 'Icon Name' },
    { key: 'image_url', label: 'Image', type: 'image' },
    { key: 'created_at', label: 'Created At' },
    { key: 'content', label: 'Full Content', type: 'expandable' },
    { key: 'features', label: 'Features' },
  ];

  const formFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: true },
    { name: 'icon_name', label: 'Icon Name', type: 'text', required: false },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    { name: 'features', label: 'Features (JSON array)', type: 'text', required: false },
    { name: 'image_url', label: 'Image', type: 'image', required: false },
  ];

  return (
    <DataTable
      tableName="et_services"
      columns={columns}
      formFields={formFields}
      title="Services"
    />
  );
};

export default Services; 