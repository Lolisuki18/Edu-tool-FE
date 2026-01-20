// src/routes/admin.paths.ts

const ADMIN_ROOT = '/admin';

export const ADMIN_PATHS = {
  ROOT: ADMIN_ROOT,
  DASHBOARD: ADMIN_ROOT,
  GROUPS: `${ADMIN_ROOT}/groups`,
  LECTURERS: `${ADMIN_ROOT}/lecturers`,
  STUDENTS: `${ADMIN_ROOT}/students`,
  REPOSITORIES: `${ADMIN_ROOT}/repositories`,
  JIRA: `${ADMIN_ROOT}/jira`,
  REPORTS: `${ADMIN_ROOT}/reports`,
  SETTINGS: `${ADMIN_ROOT}/settings`,
};
