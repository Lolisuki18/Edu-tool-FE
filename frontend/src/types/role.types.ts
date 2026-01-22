export const SYSTEM_ROLE = {
  ADMIN: 'ADMIN',
  LECTURER: 'LECTURER',
  STUDENT: 'STUDENT',
} as const;

export type SystemRole = (typeof SYSTEM_ROLE)[keyof typeof SYSTEM_ROLE];

export const GROUP_ROLE = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER',
};
export type GroupRole = (typeof GROUP_ROLE)[keyof typeof GROUP_ROLE];
