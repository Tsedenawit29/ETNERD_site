import DataTable from '../../components/DataTable';

const ContactMessages = () => {
  const columns = [
    { key: 'name', label: 'Name' },
    {
      key: 'email',
      label: 'Email',
      render: (item) => (
        <a href={`mailto:${item.email}`} className="text-dashboard-accent underline hover:text-dashboard-primary">
          {item.email}
        </a>
      ),
    },
    { key: 'message', label: 'Message' },
    { key: 'subject', label: 'Subject' },
    {
      key: 'created_at',
      label: 'Received At',
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
  ];

  return (
    <DataTable
      tableName="et_contact_messages"
      columns={columns}
      title="Contact Messages"
      disableAddNew={true}
    />
  );
};

export default ContactMessages; 