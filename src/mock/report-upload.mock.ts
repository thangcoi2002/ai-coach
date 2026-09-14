import type { ReportKind, ReportUpload } from '@/types/diagnostic.type';

/** Stand-in for a report the user uploaded, until file upload + parsing are wired up. */
export const REPORT_UPLOADS: Record<ReportKind, ReportUpload> = {
  seli: {
    fileName: 'SELI_Minh_2026.pdf',
    fileSize: '1.8 MB',
    sourceLabel: 'SELI · tự đánh giá',
    scores: ['6.5', '6.2', '6.1', '6.5', '5.4'],
  },
  '360': {
    fileName: '360_Minh_Q2_2026.pdf',
    fileSize: '1.8 MB',
    sourceLabel: '360 · 1 sếp, 3 đồng nghiệp, 4 nhân viên',
    scores: ['5.8', '6.0', '6.6', '5.9', '5.1'],
  },
};
