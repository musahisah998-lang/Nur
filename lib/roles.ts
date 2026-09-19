export const ROLE_OPTIONS = ['student', 'teacher', 'reviewer', 'admin', 'super_admin'] as const;

export type UserRole = (typeof ROLE_OPTIONS)[number];

export function isAdminRole(role: string | null | undefined): boolean {
  return role === 'admin' || role === 'super_admin';
}

export function formatRoleLabel(role: string | null | undefined): string {
  if (!role) return 'student';
  return role.replace('_', ' ');
}
