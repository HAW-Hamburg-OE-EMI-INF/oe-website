/**
 * Returns whether the site is built in maintenance mode.
 *
 * Controlled via the `PUBLIC_MAINTENANCE_MODE` build environment variable
 * (`"true"` or `"1"` enables maintenance mode; defaults to `false`).
 */
export function isMaintenanceMode(): boolean {
  const value = import.meta.env.PUBLIC_MAINTENANCE_MODE?.trim().toLowerCase();
  return value === "true" || value === "1";
}
