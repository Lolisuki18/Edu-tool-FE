import PeopleIcon from '@mui/icons-material/People';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SchoolIcon from '@mui/icons-material/School';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { GitHub, TrendingUp } from '@mui/icons-material';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

export const Dashboard = () => {
  const stats = [
    {
      label: 'Tổng nhóm',
      value: '24',
      change: '+3',
      icon: <PeopleIcon />,
      iconBg: 'bg-blue-500',
    },
    {
      label: 'Giảng viên',
      value: '8',
      change: '+1',
      icon: <ImportContactsIcon />,
      iconBg: 'bg-purple-500',
    },
    {
      label: 'Sinh viên',
      value: '120',
      change: '+12',
      icon: <SchoolIcon />,
      iconBg: 'bg-green-500',
    },
    {
      label: 'Repositories',
      value: '24',
      change: '+4',
      icon: <CallSplitIcon />,
      iconBg: 'bg-orange-500',
    },
  ];

  const integrations = [
    {
      name: 'Jira Cloud',
      status: 'Đồng bộ: 5 phút trước',
      icon: <IntegrationInstructionsIcon />,
      iconBg: 'bg-blue-500',
      statusColor: 'text-green-600',
      buttonLabel: 'Kết nối',
    },
    {
      name: 'GitHub',
      status: 'Đồng bộ: 2 phút trước',
      icon: <GitHub />,
      iconBg: 'bg-gray-800',
      statusColor: 'text-green-600',
      buttonLabel: 'Kết nối',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-600 mt-1">Quản lý dự án Edutool cho trường học FPT</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.iconBg} rounded-lg p-3`}>
                <span className="w-6 h-6 text-white">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {integrations.map(integration => (
          <div
            key={integration.name}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${integration.iconBg} rounded-lg p-3 text-2xl`}>
                  {integration.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                  <p className={`text-sm ${integration.statusColor}`}>{integration.status}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                {integration.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {[
            {
              user: 'Nguyễn Văn A',
              action: 'đã tạo nhóm mới',
              target: 'Nhóm 5',
              time: '10 phút trước',
            },
            {
              user: 'Trần Thị B',
              action: 'đã cập nhật repository',
              target: 'project-fe',
              time: '25 phút trước',
            },
            {
              user: 'Lê Văn C',
              action: 'đã submit report',
              target: 'Report Sprint 3',
              time: '1 giờ trước',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-700 font-semibold">{activity.user[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                  <span className="text-indigo-600">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
