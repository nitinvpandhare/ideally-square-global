import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import DropZone from '../../../components/upload/DropZone/DropZone';
import uploadApi from '../../../services/api/uploadApi';
import styles from './BulkUpload.module.css';

const TABS = [
  { id: 'magazines', label: 'Magazines' },
  { id: 'articles', label: 'Articles' },
  { id: 'images', label: 'Images' },
];

let uid = 0;
const nextId = () => ++uid;

// ── helpers ───────────────────────────────────────────────────────────────────

function buildFileEntry(file) {
  return {
    id: nextId(),
    file,
    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    status: 'pending', // pending | uploading | done | error
    progress: 0,
    error: null,
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── sub-components ────────────────────────────────────────────────────────────

function FileCard({ entry, onRemove }) {
  const isPdf = entry.file.type === 'application/pdf';
  const isImage = entry.file.type.startsWith('image/');

  return (
    <div className={`${styles.fileCard} ${styles[entry.status]}`}>
      <div className={styles.thumb}>
        {isImage && entry.preview ? (
          <img src={entry.preview} alt={entry.file.name} />
        ) : isPdf ? (
          <span className={styles.pdfIcon}>PDF</span>
        ) : (
          <span className={styles.fileIcon}>FILE</span>
        )}
      </div>

      <div className={styles.fileMeta}>
        <span className={styles.fileName} title={entry.file.name}>
          {entry.file.name}
        </span>
        <span className={styles.fileSize}>{formatBytes(entry.file.size)}</span>

        {entry.status === 'uploading' && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${entry.progress}%` }}
            />
          </div>
        )}

        {entry.status === 'done' && (
          <span className={styles.statusDone}>Uploaded</span>
        )}

        {entry.status === 'error' && (
          <span className={styles.statusError}>{entry.error}</span>
        )}
      </div>

      {entry.status === 'pending' && (
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(entry.id)}
          title="Remove"
        >
          &times;
        </button>
      )}

      {entry.status === 'done' && (
        <span className={styles.checkIcon}>✓</span>
      )}
    </div>
  );
}

// ── MagazineTab ───────────────────────────────────────────────────────────────

function MagazineTab() {
  const [coverEntry, setCoverEntry] = useState(null);
  const [pageEntries, setPageEntries] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const coverRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    return () => {
      if (coverRef.current?.preview) URL.revokeObjectURL(coverRef.current.preview);
      pageEntries.forEach((e) => e.preview && URL.revokeObjectURL(e.preview));
    };
  }, []);

  const handleCover = (files) => {
    if (coverEntry?.preview) URL.revokeObjectURL(coverEntry.preview);
    const entry = buildFileEntry(files[0]);
    coverRef.current = entry;
    setCoverEntry(entry);
  };

  const handlePages = useCallback((files) => {
    const images = files.filter((f) => f.type.startsWith('image/'));
    setPageEntries((prev) => [...prev, ...images.map(buildFileEntry)]);
  }, []);

  const removePageEntry = (id) => {
    setPageEntries((prev) => {
      const found = prev.find((e) => e.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return prev.filter((e) => e.id !== id);
    });
  };

  const updatePageEntry = (id, patch) =>
    setPageEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const onSubmit = async (meta) => {
    if (!coverEntry) {
      setUploadStatus({ type: 'error', msg: 'Please select a cover image.' });
      return;
    }
    if (pageEntries.length === 0) {
      setUploadStatus({ type: 'error', msg: 'Please add at least one magazine page image.' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const fd = new FormData();
      fd.append('cover', coverEntry.file);
      pageEntries.forEach((e) => fd.append('pages', e.file));
      fd.append('title', meta.title);
      fd.append('subtitle', meta.subtitle || '');
      fd.append('description', meta.description || '');
      fd.append('issue_number', meta.issue_number || '');
      fd.append('publish_date', meta.publish_date || '');
      fd.append('category', meta.category || '');

      setCoverEntry((p) => ({ ...p, status: 'uploading' }));
      setPageEntries((prev) => prev.map((e) => ({ ...e, status: 'uploading' })));

      await uploadApi.uploadMagazine(fd, (pct) => {
        setCoverEntry((p) => ({ ...p, progress: pct }));
        setPageEntries((prev) => prev.map((e) => ({ ...e, progress: pct })));
      });

      setCoverEntry((p) => ({ ...p, status: 'done', progress: 100 }));
      setPageEntries((prev) => prev.map((e) => ({ ...e, status: 'done', progress: 100 })));
      setUploadStatus({ type: 'success', msg: 'Magazine uploaded successfully!' });
      reset();
    } catch (err) {
      const msg = err.message || 'Upload failed';
      setCoverEntry((p) => ({ ...p, status: 'error', error: msg }));
      setPageEntries((prev) => prev.map((e) => ({ ...e, status: 'error', error: msg })));
      setUploadStatus({ type: 'error', msg });
    } finally {
      setUploading(false);
    }
  };

  const clearAll = () => {
    if (coverEntry?.preview) URL.revokeObjectURL(coverEntry.preview);
    pageEntries.forEach((e) => e.preview && URL.revokeObjectURL(e.preview));
    setCoverEntry(null);
    setPageEntries([]);
    setUploadStatus(null);
    reset();
  };

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabDesc}>
        Upload a new magazine issue — provide the cover image, page images, and metadata.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.magazineForm}>
        <div className={styles.uploadRow}>
          <div className={styles.uploadSection}>
            <h3 className={styles.sectionLabel}>Cover Image</h3>
            {coverEntry ? (
              <FileCard entry={coverEntry} onRemove={clearAll} />
            ) : (
              <DropZone
                accept="image/*"
                multiple={false}
                onFiles={handleCover}
                hint="JPG, PNG, WebP — single cover image"
              />
            )}
          </div>

          <div className={styles.uploadSection}>
            <h3 className={styles.sectionLabel}>
              Magazine Pages
              {pageEntries.length > 0 && (
                <span className={styles.pageCount}> ({pageEntries.length} image{pageEntries.length !== 1 ? 's' : ''})</span>
              )}
            </h3>
            <DropZone
              accept="image/*"
              multiple
              onFiles={handlePages}
              hint="JPG, PNG, WebP — add all page images in order"
            />
            {pageEntries.length > 0 && (
              <div className={styles.pagesGrid}>
                {pageEntries.map((e) => (
                  <div key={e.id} className={`${styles.pageThumb} ${styles[e.status]}`}>
                    {e.preview && <img src={e.preview} alt={e.file.name} />}
                    {e.status === 'pending' && (
                      <button className={styles.pageRemove} onClick={() => removePageEntry(e.id)} type="button">
                        &times;
                      </button>
                    )}
                    {e.status === 'uploading' && (
                      <div className={styles.pageOverlay}>{e.progress}%</div>
                    )}
                    {e.status === 'done' && <div className={styles.pageDone}>✓</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <label>Title *</label>
            <input
              type="text"
              placeholder="e.g. The Future of Leadership"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <span className={styles.fieldError}>{errors.title.message}</span>}
          </div>

          <div className={styles.field}>
            <label>Subtitle</label>
            <input
              type="text"
              placeholder="e.g. Cover Story"
              {...register('subtitle')}
            />
          </div>

          <div className={styles.field}>
            <label>Issue Number</label>
            <input
              type="text"
              placeholder="e.g. Vol. 12, Issue 3"
              {...register('issue_number')}
            />
          </div>

          <div className={styles.field}>
            <label>Publish Date</label>
            <input type="date" {...register('publish_date')} />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select {...register('category')}>
              <option value="">Select category</option>
              <option value="cover-story">Cover Story</option>
              <option value="feature">Feature</option>
              <option value="special-edition">Special Edition</option>
              <option value="annual">Annual Issue</option>
            </select>
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Brief description of this magazine issue…"
              {...register('description')}
            />
          </div>
        </div>

        {uploadStatus && (
          <div className={`${styles.statusBanner} ${styles[uploadStatus.type]}`}>
            {uploadStatus.msg}
          </div>
        )}

        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={clearAll}>
            Clear
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload Magazine'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── ArticleTab ────────────────────────────────────────────────────────────────

function ArticleTab() {
  const [entries, setEntries] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    return () => entries.forEach((e) => e.preview && URL.revokeObjectURL(e.preview));
  }, []);

  const addFiles = useCallback((files) => {
    const allowed = files.filter((f) => f.type.startsWith('image/'));
    setEntries((prev) => [...prev, ...allowed.map(buildFileEntry)]);
  }, []);

  const removeFile = (id) => {
    setEntries((prev) => {
      const found = prev.find((e) => e.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return prev.filter((e) => e.id !== id);
    });
  };

  const updateEntry = (id, patch) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const onSubmit = async (meta) => {
    if (!entries.length) {
      setUploadStatus({ type: 'error', msg: 'Please add at least one article image.' });
      return;
    }

    const pending = entries.filter((e) => e.status === 'pending');
    if (!pending.length) {
      setUploadStatus({ type: 'error', msg: 'No pending files to upload.' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);
    let succeeded = 0;
    let failed = 0;

    for (const entry of pending) {
      updateEntry(entry.id, { status: 'uploading', progress: 0 });
      try {
        const fd = new FormData();
        fd.append('image', entry.file);
        fd.append('title', meta.title);
        fd.append('author', meta.author || '');
        fd.append('category', meta.category || '');
        fd.append('tags', meta.tags || '');
        fd.append('summary', meta.summary || '');

        await uploadApi.uploadArticle(fd, (pct) =>
          updateEntry(entry.id, { progress: pct })
        );
        updateEntry(entry.id, { status: 'done', progress: 100 });
        succeeded++;
      } catch (err) {
        updateEntry(entry.id, { status: 'error', error: err.message || 'Failed' });
        failed++;
      }
    }

    setUploading(false);
    if (failed === 0) {
      setUploadStatus({ type: 'success', msg: `${succeeded} article image(s) uploaded successfully!` });
      reset();
    } else {
      setUploadStatus({ type: 'error', msg: `${succeeded} succeeded, ${failed} failed.` });
    }
  };

  const clearDone = () => {
    setEntries((prev) => prev.filter((e) => e.status !== 'done'));
    setUploadStatus(null);
  };

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabDesc}>
        Bulk upload article featured images with metadata. Each image will be associated with the article details below.
      </p>

      <DropZone
        accept="image/*"
        multiple
        onFiles={addFiles}
        hint="JPG, PNG, WebP — multiple files allowed"
      />

      {entries.length > 0 && (
        <div className={styles.fileGrid}>
          {entries.map((e) => (
            <FileCard key={e.id} entry={e} onRemove={removeFile} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.metaForm}>
        <h3 className={styles.sectionLabel}>Article Metadata</h3>
        <div className={styles.metaGrid}>
          <div className={styles.field}>
            <label>Article Title *</label>
            <input
              type="text"
              placeholder="e.g. The Rise of AI in Business"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <span className={styles.fieldError}>{errors.title.message}</span>}
          </div>

          <div className={styles.field}>
            <label>Author</label>
            <input type="text" placeholder="e.g. John Smith" {...register('author')} />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select {...register('category')}>
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="leadership">Leadership</option>
              <option value="finance">Finance</option>
              <option value="innovation">Innovation</option>
              <option value="strategy">Strategy</option>
              <option value="interviews">Interviews</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Tags</label>
            <input type="text" placeholder="comma-separated, e.g. AI, cloud, CIO" {...register('tags')} />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label>Summary</label>
            <textarea rows="3" placeholder="Brief description of the article…" {...register('summary')} />
          </div>
        </div>

        {uploadStatus && (
          <div className={`${styles.statusBanner} ${styles[uploadStatus.type]}`}>
            {uploadStatus.msg}
          </div>
        )}

        <div className={styles.formActions}>
          {entries.some((e) => e.status === 'done') && (
            <button type="button" className={styles.btnSecondary} onClick={clearDone}>
              Clear Done
            </button>
          )}
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={uploading || !entries.some((e) => e.status === 'pending')}
          >
            {uploading
              ? `Uploading ${entries.filter((e) => e.status === 'uploading').length}…`
              : `Upload ${entries.filter((e) => e.status === 'pending').length} File(s)`}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── ImageTab ──────────────────────────────────────────────────────────────────

function ImageTab() {
  const [entries, setEntries] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [folder, setFolder] = useState('general');

  useEffect(() => {
    return () => entries.forEach((e) => e.preview && URL.revokeObjectURL(e.preview));
  }, []);

  const addFiles = useCallback((files) => {
    const images = files.filter((f) => f.type.startsWith('image/'));
    setEntries((prev) => [...prev, ...images.map(buildFileEntry)]);
  }, []);

  const removeFile = (id) => {
    setEntries((prev) => {
      const found = prev.find((e) => e.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return prev.filter((e) => e.id !== id);
    });
  };

  const updateEntry = (id, patch) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const uploadAll = async () => {
    const pending = entries.filter((e) => e.status === 'pending');
    if (!pending.length) return;

    setUploading(true);
    setUploadStatus(null);
    let succeeded = 0;
    let failed = 0;

    for (const entry of pending) {
      updateEntry(entry.id, { status: 'uploading', progress: 0 });
      try {
        const fd = new FormData();
        fd.append('image', entry.file);
        fd.append('folder', folder);

        await uploadApi.uploadImages(fd, (pct) =>
          updateEntry(entry.id, { progress: pct })
        );
        updateEntry(entry.id, { status: 'done', progress: 100 });
        succeeded++;
      } catch (err) {
        updateEntry(entry.id, { status: 'error', error: err.message || 'Failed' });
        failed++;
      }
    }

    setUploading(false);
    if (failed === 0) {
      setUploadStatus({ type: 'success', msg: `${succeeded} image(s) uploaded to "${folder}".` });
    } else {
      setUploadStatus({ type: 'error', msg: `${succeeded} succeeded, ${failed} failed.` });
    }
  };

  const clearAll = () => {
    entries.forEach((e) => e.preview && URL.revokeObjectURL(e.preview));
    setEntries([]);
    setUploadStatus(null);
  };

  const pendingCount = entries.filter((e) => e.status === 'pending').length;

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabDesc}>
        Bulk upload magazine images — covers, spreads, editorial photos, and assets.
      </p>

      <div className={styles.folderRow}>
        <label className={styles.folderLabel}>Upload to folder:</label>
        <select
          className={styles.folderSelect}
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          <option value="general">General</option>
          <option value="covers">Magazine Covers</option>
          <option value="articles">Article Images</option>
          <option value="interviews">Interview Photos</option>
          <option value="banners">Banners & Headers</option>
          <option value="ads">Advertisements</option>
        </select>
      </div>

      <DropZone
        accept="image/*"
        multiple
        onFiles={addFiles}
        hint="JPG, PNG, WebP, GIF — drag multiple files at once"
      />

      {entries.length > 0 && (
        <>
          <div className={styles.imageGrid}>
            {entries.map((e) => (
              <div key={e.id} className={`${styles.imageCard} ${styles[e.status]}`}>
                {e.preview && (
                  <div className={styles.imageThumb}>
                    <img src={e.preview} alt={e.file.name} />
                    {e.status === 'uploading' && (
                      <div className={styles.imageOverlay}>
                        <div className={styles.imageProgress}>
                          <div
                            className={styles.imageProgressFill}
                            style={{ width: `${e.progress}%` }}
                          />
                        </div>
                        <span>{e.progress}%</span>
                      </div>
                    )}
                    {e.status === 'done' && (
                      <div className={styles.imageDoneOverlay}>✓</div>
                    )}
                    {e.status === 'error' && (
                      <div className={styles.imageErrorOverlay}>!</div>
                    )}
                    {e.status === 'pending' && (
                      <button
                        className={styles.imageRemove}
                        onClick={() => removeFile(e.id)}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                )}
                <span className={styles.imageFileName}>{e.file.name}</span>
                <span className={styles.imageFileSize}>{formatBytes(e.file.size)}</span>
                {e.status === 'error' && (
                  <span className={styles.imageFileError}>{e.error}</span>
                )}
              </div>
            ))}
          </div>

          {uploadStatus && (
            <div className={`${styles.statusBanner} ${styles[uploadStatus.type]}`}>
              {uploadStatus.msg}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" className={styles.btnSecondary} onClick={clearAll}>
              Clear All
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={uploadAll}
              disabled={uploading || pendingCount === 0}
            >
              {uploading
                ? `Uploading ${entries.filter((e) => e.status === 'uploading').length}…`
                : `Upload ${pendingCount} Image(s)`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const BulkUpload = () => {
  const [activeTab, setActiveTab] = useState('magazines');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Bulk Upload</h1>
          <p className={styles.pageSubtitle}>
            Manage magazine issues, articles, and images for iSG
          </p>
        </header>

        <nav className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className={styles.panel}>
          {activeTab === 'magazines' && <MagazineTab key="magazines" />}
          {activeTab === 'articles' && <ArticleTab key="articles" />}
          {activeTab === 'images' && <ImageTab key="images" />}
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
