/**
 * In-memory handoff for files dropped on the homepage.
 *
 * The homepage drop zone stores files here and navigates (client-side) to the
 * chosen tool; the tool's FileUploader picks them up on mount. Nothing is
 * persisted or uploaded — a full page reload simply clears the handoff.
 */
let pending: File[] = [];

export function setPendingFiles(files: File[]): void {
  pending = files;
}

/** Returns and clears any pending files. */
export function takePendingFiles(): File[] {
  const files = pending;
  pending = [];
  return files;
}

export function peekPendingFiles(): File[] {
  return pending;
}
