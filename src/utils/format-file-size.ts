/** Renders a byte count the way file pickers do, e.g. `1.8 MB` — `null` when the
 * document provider didn't report a size (rare, but the picker's type allows it). */
export function formatFileSize(bytes: number | null): string {
  if (bytes == null) {
    return '';
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
}
