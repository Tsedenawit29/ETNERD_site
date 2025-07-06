import React from 'react';
import DataTable from '../../components/DataTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Title', accessor: 'title' },
  { Header: 'Specification', accessor: 'specficaton' },
  { Header: 'Eligibility', accessor: 'elgblity' },
  { Header: 'Active', accessor: 'active' },
  { Header: 'Created At', accessor: 'created_at' },
];

const formFields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'active', label: 'Active', type: 'switch' },
  { name: 'specficaton', label: 'Specification', type: 'textarea', required: true },
  { name: 'elgblity', label: 'Eligibility', type: 'textarea', required: true },
];

const Jobs = () => (
  <DataTable
    tableName="et_jobs"
    columns={columns}
    formFields={formFields}
    title="Manage Jobs"
  />
);

export default Jobs; 