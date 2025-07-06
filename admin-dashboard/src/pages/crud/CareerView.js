import React from 'react';
import DataTable from '../../components/DataTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Full Name', accessor: 'full_name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Phone', accessor: 'phone' },
  { Header: 'Subject', accessor: 'subject' },
  { Header: 'Message', accessor: 'meassage' },
  { Header: 'CV', accessor: 'file_url', Cell: ({ value }) => value ? <a href={`https://lyuqbekqidamzuvgtinu.supabase.co/storage/v1/object/public/cvs/${value}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a> : 'N/A' },
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