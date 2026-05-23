import { useRef, useState } from 'react';
import styles from './DropZone.module.css';

const DropZone = ({ accept, multiple = true, onFiles, hint }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    const filtered = accept
      ? dropped.filter((f) => matchesAccept(f, accept))
      : dropped;
    if (filtered.length) onFiles(filtered);
  };

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length) onFiles(selected);
    e.target.value = '';
  };

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className={styles.hidden}
      />
      <div className={styles.icon}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p className={styles.label}>
        {dragging ? 'Drop files here' : 'Drag & drop files here'}
      </p>
      <p className={styles.sub}>or click to browse</p>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
};

function matchesAccept(file, accept) {
  return accept.split(',').some((a) => {
    const t = a.trim();
    if (t.startsWith('.')) return file.name.toLowerCase().endsWith(t);
    if (t.endsWith('/*')) return file.type.startsWith(t.slice(0, -1));
    return file.type === t;
  });
}

export default DropZone;
