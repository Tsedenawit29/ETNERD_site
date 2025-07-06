import React from 'react';
import {
  IconShieldCheck,
  IconSearch,
  IconFileText,
  IconAlertCircle,
  IconUserCog,
  IconServer,
  IconCloud,
  IconHeadset,
  IconShield,
  IconUsers,
} from '@tabler/icons-react';

const iconMap = {
  'shield-check': IconShieldCheck,
  'magnifying-glass': IconSearch,
  'file-text': IconFileText,
  'alert-circle': IconAlertCircle,
  'user-cog': IconUserCog,
  'server': IconServer,
  'cloud': IconCloud,
  'headset': IconHeadset,
  'shield': IconShield,
  'users': IconUsers,
};

export default function ServiceIcon({ iconName, className = 'w-10 h-10 text-dashboard-primary' }) {
  const IconComponent = iconMap[iconName] || IconShield;
  return <IconComponent className={className} />;
} 