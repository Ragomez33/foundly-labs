import type { ErrorCode } from './result';
import { fail, type ActionResult } from './result';

export type Role = 'admin' | 'professional';

export interface Session {
  userId: string;
  role: Role;
  /** For professionals: the resource they are bound to. */
  resourceId?: string;
}

/** Require one of the allowed roles; mirrors the Foundly Pass session contract. */
export function requireRole(session: Session | null, allowed: Role[]): ActionResult<Session> {
  if (!session) {
    return fail('UNAUTHENTICATED', 'Se requiere una sesión de Foundly Pass.');
  }
  if (!allowed.includes(session.role)) {
    return fail('FORBIDDEN', 'No tienes permisos para esta operación.');
  }
  return { ok: true, data: session };
}

export function isActionError(value: unknown): value is { ok: false; error: { code: ErrorCode } } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'ok' in value &&
    (value as { ok: unknown }).ok === false
  );
}
