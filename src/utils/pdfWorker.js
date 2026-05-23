import { pdfjs } from 'react-pdf';

// Configure once globally — imported by any component that uses react-pdf.
// IMPORTANT: use the pdfjs-dist that ships with `react-pdf` so the API and Worker versions match.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

//'pdfjs-dist/build/pdf.worker.min.mjs',