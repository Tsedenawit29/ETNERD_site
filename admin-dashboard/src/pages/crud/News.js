import DataTable from '../../components/DataTable';

const News = () => {
  const columns = [
    { key: 'headline', label: 'Title' },
    { key: 'content', label: 'Content' },
    { key: 'author', label: 'Author' },
    {
      key: 'published_date',
      label: 'Published Date',
      render: (item) => new Date(item.published_date).toLocaleDateString(),
    },
    { key: 'link', label: 'Link' },
    {
      key: 'image_url',
      label: 'Image',
      render: (item) => (
        item.image_url ? (
          <img
            src={item.image_url}
            alt={item.headline}
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
    { name: 'headline', label: 'Title', required: true },
    { name: 'content', label: 'Content', type: 'textarea', required: true },
    { name: 'author', label: 'Author', required: true },
    { name: 'published_date', label: 'Published Date', type: 'date', required: true },
    { name: 'link', label: 'Link', type: 'text' },
    { name: 'image_url', label: 'Image', type: 'image' },
    { name: 'active', label: 'Active', type: 'switch' },
  ];

  return (
    <DataTable
      tableName="et_news"
      columns={columns}
      formFields={formFields}
      title="News"
    />
  );
};

export default News; 