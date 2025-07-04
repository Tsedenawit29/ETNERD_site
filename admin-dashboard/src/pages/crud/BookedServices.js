import DataTable from '../../components/DataTable';

const BookedServices = () => {
  const columns = [
    { key: 'service', label: 'Service' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'content', label: 'Details' },
    {
      key: 'submitted_at',
      label: 'Date',
      render: (item) => item.submitted_at ? new Date(item.submitted_at).toLocaleDateString() : '',
    },
    {
      key: 'created_at',
      label: 'Booked At',
      render: (item) => item.created_at ? new Date(item.created_at).toLocaleString() : '',
    },
  ];

  return (
    <DataTable
      tableName="et_book"
      columns={columns}
      title="Booked Services"
      disableAddNew={true}
    />
  );
};

export default BookedServices; 