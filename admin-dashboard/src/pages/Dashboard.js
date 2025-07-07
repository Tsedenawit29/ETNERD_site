import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import Jobs from './crud/Jobs';
import CareerView from './crud/CareerView';

const Dashboard = () => {
  const [stats, setStats] = useState({
    et_services: 0,
    et_news: 0,
    et_contactMessages: 0,
    et_bookedServices: 0,
    et_jobs: 0,
    et_career: 0,
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
        console.log('Fetching dashboard stats...');
        
        const [
          { count: et_services, error: servicesError },
          { count: et_news, error: newsError },
          { count: et_contactMessages, error: contactError },
          { count: et_bookedServices, error: bookedServicesError },
          { count: et_jobs, error: jobsError },
          { count: et_career, error: careerError },
        ] = await Promise.all([
          supabase.from('et_services').select('*', { count: 'exact', head: true }),
          supabase.from('et_news').select('*', { count: 'exact', head: true }),
          supabase.from('et_contact_messages').select('*', { count: 'exact', head: true }),
          supabase.from('et_booked_services').select('*', { count: 'exact', head: true }),
          supabase.from('et_jobs').select('*', { count: 'exact', head: true }),
          supabase.from('et_career').select('*', { count: 'exact', head: true }),
        ]);

        // Log any errors
        if (servicesError) console.error('Services Error:', servicesError);
        if (newsError) console.error('News Error:', newsError);
        if (contactError) console.error('Contact Error:', contactError);
        if (bookedServicesError) console.error('Booked Services Error:', bookedServicesError);
        if (jobsError) console.error('Jobs Error:', jobsError);
        if (careerError) console.error('Career Error:', careerError);

        const newStats = {
          et_services: et_services || 0,
          et_news: et_news || 0,
          et_contactMessages: et_contactMessages || 0,
          et_bookedServices: et_bookedServices || 0,
          et_jobs: et_jobs || 0,
          et_career: et_career || 0,
        };

        console.log('Dashboard stats:', newStats);
        setStats(newStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values if there's an error
        setStats({
          et_services: 0,
          et_news: 0,
          et_contactMessages: 0,
          et_bookedServices: 0,
          et_jobs: 0,
          et_career: 0,
        });
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 ${color}`}>
      <h3 className="text-lg font-semibold text-dashboard-primary dark:text-dashboard-primary-bright">{title}</h3>
      <p className="text-3xl font-bold text-dashboard-primary dark:text-dashboard-primary-bright mt-2">{value}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-black dark:to-black p-4">
      <h1 className="text-3xl font-bold mb-8 text-dashboard-primary dark:text-dashboard-primary-bright text-center drop-shadow-lg">Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
        <StatCard
          title="Services"
          value={stats.et_services}
          color="bg-gradient-to-br from-dashboard-primary/80 to-dashboard-accent/80 shadow-xl"
        />
        <StatCard
          title="News Articles"
          value={stats.et_news}
          color="bg-gradient-to-br from-blue-900/80 to-dashboard-accent/80 shadow-xl"
        />
        <StatCard
          title="Contact Messages"
          value={stats.et_contactMessages}
          color="bg-gradient-to-br from-blue-900/80 to-dashboard-primary/80 shadow-xl"
        />
        <StatCard
          title="Booked Services"
          value={stats.et_bookedServices}
          color="bg-gradient-to-br from-dashboard-primary/80 to-blue-900/80 shadow-xl"
        />
        <StatCard
          title="Jobs"
          value={stats.et_jobs}
          color="bg-gradient-to-br from-dashboard-primary/80 to-dashboard-accent/80 shadow-xl"
        />
        <StatCard
          title="Career Submissions"
          value={stats.et_career}
          color="bg-gradient-to-br from-dashboard-primary/80 to-blue-900/80 shadow-xl"
        />
      </div>
      {/* Recent Actions Card */}
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-dashboard-primary dark:text-dashboard-primary-bright mb-6 text-center">Recent Actions</h2>
        <div className="space-y-4">
          {recentActions.map((action) => (
            <div key={action.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-dashboard-primary/10 to-dashboard-accent/10 dark:from-dashboard-primary/20 dark:to-dashboard-accent/20 shadow hover:shadow-lg transition-all duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-dashboard-accent/20 dark:bg-dashboard-accent-dark/30 rounded-full flex items-center justify-center text-dashboard-accent dark:text-dashboard-accent-dark">
                {getActionIcon(action.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-dashboard-primary dark:text-dashboard-primary-bright truncate">
                  {action.action}
                </p>
                <p className="text-xs text-dashboard-primary/70 dark:text-dashboard-primary-bright/70 truncate">
                  {action.item}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-dashboard-primary/50 dark:text-dashboard-primary-bright/50">
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