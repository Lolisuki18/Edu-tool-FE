import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { SYSTEM_ROLE } from '@/types/role.types';
import { USER_STATUS } from '@/types/user.type';
import { translateRole, translateStatus } from '@/utils';

export const ROLE_OPTIONS = [
  {
    value: SYSTEM_ROLE.STUDENT,
    label: translateRole(SYSTEM_ROLE.STUDENT),
    icon: <PersonIcon fontSize="small" className="text-secondary" />,
  },
  {
    value: SYSTEM_ROLE.LECTURER,
    label: translateRole(SYSTEM_ROLE.LECTURER),
    icon: <SchoolIcon fontSize="small" className="text-primary" />,
  },
  {
    value: SYSTEM_ROLE.ADMIN,
    label: translateRole(SYSTEM_ROLE.ADMIN),
    icon: <AdminPanelSettingsIcon fontSize="small" className="text-error" />,
  },
];

export const STATUS_OPTIONS = [
  {
    value: USER_STATUS.ACTIVE,
    label: translateStatus(USER_STATUS.ACTIVE),
    icon: <span className="w-3 h-3 rounded-full bg-success inline-block mr-2" />,
  },
  {
    value: USER_STATUS.INACTIVE,
    label: translateStatus(USER_STATUS.INACTIVE),
    icon: <span className="w-3 h-3 rounded-full bg-error inline-block mr-2" />,
  },
];
