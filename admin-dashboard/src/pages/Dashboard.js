import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    ourWork: 0,
    services: 0,
    events: 0,
    news: 0,
    contactMessages: 0,
  });

  const [recentActions, setRecentActions] = useState([
    {
      id: 1,
      action: 'Added new services',
      item: 'AI Ethics Guidelines',
      time: '2 hours ago',
      type: 'services'
    },
    {
      id: 2,
      action: 'Updated event',
      item: 'Tech Conference 2024',
      time: '4 hours ago',
      type: 'event'
    },
    {
      id: 3,
      action: 'Published news article',
      item: 'Latest AI Developments',
      time: '1 day ago',
      type: 'news'
    },
    {
      id: 4,
      action: 'Added work item',
      item: 'Community Outreach Program',
      time: '2 days ago',
      type: 'work'
    },
    {
      id: 5,
      action: 'Replied to contact message',
      item: 'Partnership inquiry',
      time: '3 days ago',
      type: 'message'
    }
  ]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: et_ourWork },
          { count: et_services },
          { count: et_events },
          { count: et_news },
          { count: et_contactMessages },
        ] = await Promise.all([
          supabase.from('et_our_work').select('*', { count: 'exact', head: true }),
          supabase.from('et_services').select('*', { count: 'exact', head: true }),
          supabase.from('et_events').select('*', { count: 'exact', head: true }),
          supabase.from('et_news').select('*', { count: 'exact', head: true }),
          supabase.from('et_contact_messages').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          et_ourWork,
          et_services,
          et_events,
          et_news,
          et_contactMessages,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 ${color}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-sai-teal-200">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-sai-teal-200 mt-2">{value}</p>
    </div>
  );

  const getActionIcon = (type) => {
    switch (type) {
      case 'services':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'event':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'news':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'work':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        );
      case 'message':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-sai-teal-200">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Our Work Items"
          value={stats.ourWork}
          color="bg-blue-900/20"
        />
        <StatCard
          title="Services"
          value={stats.services}
          color="bg-blue-900/20"
        />
        <StatCard
          title="Events"
          value={stats.events}
          color="bg-blue-900/20"
        />
        <StatCard
          title="News Articles"
          value={stats.news}
          color="bg-blue-900/20"
        />
        <StatCard
          title="Contact Messages"
          value={stats.contactMessages}
          color="bg-blue-900/20"
        />
      </div>

      {/* Recent Actions Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 lg:p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-sai-teal-200 mb-4">Recent Actions</h2>
        <div className="space-y-3 lg:space-y-4">
          {recentActions.map((action) => (
            <div key={action.id} className="flex items-center space-x-3 lg:space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-sai-teal-100 dark:bg-sai-teal-900/30 rounded-full flex items-center justify-center text-sai-teal-600 dark:text-sai-teal-300">
                {getActionIcon(action.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-sai-teal-200 truncate">
                  {action.action}
                </p>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 truncate">
                  {action.item}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {action.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 