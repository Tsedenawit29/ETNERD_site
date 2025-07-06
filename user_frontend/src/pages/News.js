import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import newsVideo from '../asset/news.mp4';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('et_news')
        .select('*')
        .eq('active', true)
        .order('published_date', { ascending: false });
      if (error) {
        setError('Failed to fetch news.');
        setLoading(false);
        return;
      }
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <section className="min-h-screen bg-white dark:bg-dashboard-primary-bg">
      {/* Hero Section with Video */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden flex items-center justify-center mb-10">
        <video
          src={newsVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display drop-shadow-lg mb-4">Latest News</h1>
          <p className="text-lg md:text-2xl text-white font-sans drop-shadow">Stay updated with our latest announcements and stories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading && <div className="text-center text-xl text-dashboard-primary dark:text-white">Loading news...</div>}
        {error && <div className="text-center text-red-500 font-semibold">{error}</div>}
        {!loading && !error && news.length === 0 && (
          <div className="text-center text-lg text-dashboard-primary dark:text-white">No news articles found.</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {news.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-dashboard-accent/10 p-6 md:p-8 h-full flex flex-col justify-between">
              {/* Top Row: Image + Title/Meta stacked */}
              <div className="flex flex-col md:flex-row items-start md:items-stretch gap-4 md:gap-6">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.headline}
                    className="w-full md:w-40 h-32 md:h-28 object-cover rounded-2xl border border-dashboard-accent/20 flex-shrink-0"
                  />
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl font-bold text-dashboard-primary dark:text-white font-display mb-1">{item.headline}</h2>
                  <div className="text-sm text-dashboard-primary/70 dark:text-gray-300 mb-1">
                    By <span className="font-semibold">{item.author}</span>
                    <span className="mx-2">|</span>
                    {item.published_date ? new Date(item.published_date).toLocaleDateString() : ''}
                  </div>
                </div>
              </div>
              {/* Content & Read More */}
              <div className="mt-4">
                <div className="prose max-w-none text-dashboard-primary dark:text-white text-lg mb-2" style={{ whiteSpace: 'pre-line' }}>
                  {item.content}
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-dashboard-accent dark:text-dashboard-accent-dark font-semibold hover:underline"
                  >
                    Read more
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News; 