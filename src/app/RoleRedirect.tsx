import { useEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useSessionStore } from "@/stores/sessionStore";
import type { RoleId } from "@/types/rbac";
import { ROLE_BY_ID } from "@/types/rbac";

/**
 * /role/:roleId — sets the Zustand session role then redirects to /app/overview.
 * Also used via query param: /?role=collector_cala or /?roleId=...
 * Invalid role falls through to landing.
 */
export function RoleRedirect() {
  const { roleId } = useParams<{ roleId: string }>();
  const switchRole = useSessionStore((s) => s.switchRole);

  const candidate = (roleId ?? "") as RoleId;
  const valid = candidate && ROLE_BY_ID[candidate];

  useEffect(() => {
    if (valid) switchRole(candidate);
  }, [candidate, valid, switchRole]);

  if (!valid) return <Navigate to="/" replace />;
  return <Navigate to="/app/overview" replace />;
}

export function LandingRoleParamHandler({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useSearchParams();
  const switchRole = useSessionStore((s) => s.switchRole);

  const viaParam = (params.get("role") ?? params.get("roleId") ?? "") as RoleId;
  const valid = viaParam && ROLE_BY_ID[viaParam];

  useEffect(() => {
    if (!valid) return;
    switchRole(viaParam);
    // strip the param and redirect in one navigation — keep history clean
    const next = new URLSearchParams(params);
    next.delete("role");
    next.delete("roleId");
    setParams(next, { replace: true });
    // navigate is separate so the visible URL update doesn't flash; use window history via router
    // caller handles redirect via Navigate below — but effect already set role
  }, []); // run once on mount

  if (valid) return <Navigate to="/app/overview" replace />;
  return <>{children}</>;
}
