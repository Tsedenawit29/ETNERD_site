import React from 'react';
import DataTable from '../../components/DataTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Full Name', accessor: 'full_name' },
  {
    key: 'email',
    label: 'Email',
    render: (row) => (
      <a href={`mailto:${row.email}`} className="text-dashboard-accent underline hover:text-dashboard-primary">
        {row.email}
      </a>
    ),
  },
  { Header: 'Phone', accessor: 'phone' },
  { Header: 'Subject', accessor: 'subject' },
  { Header: 'Message', accessor: 'meassage' },
  { Header: 'CV', accessor: 'file_url', Cell: ({ value }) => {
    if (!value) return 'N/A';
    // Remove all leading 'cvs/' or 'cvs\\'
    const cleanValue = value.replace(/^(cvs[\\/]+)+/i, '');
    return (
      <a
        href={`https://lyuqbekqidamzuvgtinu.supabase.co/storage/v1/object/public/etfiles/cvs/${cleanValue}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {cleanValue}
      </a>
    );
  }},
  { Header: 'Created At', accessor: 'created_at' },
];

const CareerView = () => (
  <DataTable
    tableName="et_career"
    columns={columns}
    title="Career Submissions (CVs)"
    disableAddNew={true}
  />
);

export default CareerView; 