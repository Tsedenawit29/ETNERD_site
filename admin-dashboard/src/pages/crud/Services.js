import React from 'react';
import DataTable from '../../components/DataTable';

const Services = () => {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'image_url', label: 'Image' },
    { key: 'created_at', label: 'Created At' },
  ];

  const formFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    { name: 'image_url', label: 'Image', type: 'image', required: true },
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