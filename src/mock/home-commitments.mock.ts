import type { Commitment } from '@/types/home.type';

/** Stand-in commitments until the API returns what the user actually committed to. */
export const COMMITMENTS: Commitment[] = [
  {
    id: '1',
    text: 'Nói rõ khó khăn trước khi đề xuất giải pháp.',
    done: false,
  },
  { id: '2', text: 'Chốt lại thời hạn mới bằng một câu cụ thể.', done: false },
  { id: '3', text: 'Không xin lỗi quá nhiều khi báo tin xấu.', done: true },
];
