import DataTable from '../../components/DataTable';

const OurWork = () => {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'link', label: 'Link' },
    {
      key: 'image_url',
      label: 'Image',
      render: (item) => (
        item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="h-10 w-10 object-cover rounded"
          />
        ) : 'No image'
      ),
    },
    {
      key: 'created_at',
      label: 'Created At',
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
  ];

  const formFields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'link', label: 'Link', type: 'text' },
    { name: 'image_url', label: 'Image', type: 'image' },
  ];

  return (
    <DataTable
      tableName="et_our_work"
      columns={columns}
      formFields={formFields}
      title="Our Work"
    />
  );
};

export default OurWork; 