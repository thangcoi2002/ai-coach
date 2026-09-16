import type { ConversationListItem } from '@/types/analysis.type';

/** Stand-in for the user's submitted conversations, until the API is wired up. */
export const CONVERSATIONS: ConversationListItem[] = [
  {
    id: 'c1',
    title: '1:1 với sếp về deadline báo cáo quý',
    meta: 'Hôm qua, 15:40 · 6:12 · với anh Kiên, sếp trực tiếp',
    status: 'done',
    takeaway: 'Đưa giải pháp trước khi hiểu mối bận tâm',
  },
  {
    id: 'c2',
    title: 'Họp nhóm: phân công lại công việc',
    meta: 'Hôm nay 11:20, 4 người nói',
    status: 'processing',
    progress: 0.62,
  },
  {
    id: 'c3',
    title: '1:1 với bạn Trang',
    meta: 'Tuần trước, 8:41',
    status: 'poorAudio',
  },
];
