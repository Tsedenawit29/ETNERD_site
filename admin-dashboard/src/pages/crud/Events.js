import DataTable from '../../components/DataTable';

const Events = () => {
  const columns = [
    { key: 'name', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'event_date', label: 'Date' },
    { key: 'location', label: 'Location' },
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
      key: 'active',
      label: 'Active',
      render: (item) => (
        <span
          className={`inline-block w-10 h-6 rounded-full relative transition-colors duration-200 ${item.active ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${item.active ? 'translate-x-4' : ''}`}
          />
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created At',
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
  ];

  const formFields = [
    { name: 'name', label: 'Title', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'event_date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', required: true },
    { name: 'link', label: 'Link', type: 'text' },
    { name: 'image_url', label: 'Image', type: 'image' },
    { name: 'active', label: 'Active', type: 'switch' },
  ];

  return (
    <DataTable
      tableName="et_events"
      columns={columns}
      formFields={formFields}
      title="Events"
    />
  );
};

export default Events; 