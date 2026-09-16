import type { TranscriptLine } from '@/types/analysis.type';

/**
 * Diarized lines for the demo conversation ("1:1 với sếp về deadline báo cáo quý",
 * `CONVERSATIONS[0]`). `p1` is the user, `p2` is anh Kiên — the transcript step doesn't
 * know that yet, that's what it asks the user to confirm.
 *
 * `stage` and `momentIndex` double as the source for the analysis report's "Diễn biến"
 * replay: a stage header prints above that line, and a momentIndex inserts that entry
 * of ANALYSIS_REPORT.moments as a "chuyển hướng" callout right after it.
 */
export const CONVERSATION_TRANSCRIPT: TranscriptLine[] = [
  {
    time: '00:04',
    speaker: 'p1',
    text: 'Anh Kiên, em xin 5 phút về tiến độ dự án Alpha.',
    stage: 'MỞ ĐẦU',
  },
  {
    time: '00:09',
    speaker: 'p2',
    text: 'Nói đi. Thứ Tư go-live, anh đã báo BGĐ rồi.',
    momentIndex: 0,
  },
  {
    time: '00:15',
    speaker: 'p1',
    text: 'Dạ… bên đối tác payment gateway trả API doc trễ hai tuần, nên phần tích hợp bị dồn. Team em cũng đã cố hết sức rồi ạ.',
  },
  {
    time: '00:31',
    speaker: 'p2',
    text: 'Anh không cần biết lỗi bên nào. Anh hỏi: thứ Tư có go-live không?',
    stage: 'CĂNG LÊN',
  },
  {
    time: '00:40',
    speaker: 'p1',
    text: 'Dạ… chắc là hơi khó. Nếu bên kia trả API ổn định thì team em cố, chắc lệch khoảng vài ngày thôi.',
  },
  {
    time: '00:55',
    speaker: 'p2',
    text: '"Chắc", "nếu", "cố", "khoảng". Em nói con số đi. Trễ mấy ngày?',
    momentIndex: 1,
  },
  {
    time: '01:04',
    speaker: 'p1',
    text: 'Dạ khoảng 3 ngày ạ. Em nghĩ thứ Bảy là xong.',
    stage: 'CHỖ RẼ',
  },
  {
    time: '01:12',
    speaker: 'p2',
    text: 'Thứ Bảy? Hôm qua Tuấn nói với anh là còn 5 ngày test tải chưa chạy. Em với Tuấn ai đúng?',
    momentIndex: 2,
  },
  {
    time: '01:25',
    speaker: 'p1',
    text: 'Dạ… Tuấn tính cả test tải, còn em tính phần tích hợp thôi. Em sẽ về check lại.',
    stage: 'PHẢN ỨNG',
  },
  {
    time: '01:36',
    speaker: 'p2',
    text: 'Tức là em đứng đây báo cho anh một con số chưa check. Anh phải nói gì với anh Tâm chiều nay?',
  },
  {
    time: '01:48',
    speaker: 'p1',
    text: 'Dạ anh cứ nói là team em đang gấp rút, em cam kết sẽ cố hết sức không để trễ thêm.',
  },
  {
    time: '02:00',
    speaker: 'p2',
    text: 'Cam kết cố hết sức thì ai chả cam kết được. Em về, 16h gửi anh timeline mới, có chữ ký của Tuấn. Từ giờ tới go-live báo anh mỗi ngày.',
    stage: 'KẾT QUẢ',
  },
  { time: '02:15', speaker: 'p1', text: 'Dạ vâng ạ. Em xin lỗi anh.' },
  { time: '02:20', speaker: 'p2', text: 'Thôi.' },
];

/** Closing line the report replay shows after the last transcript turn. */
export const CONVERSATION_OUTCOME =
  'Anh tự đặt mốc 16h và yêu cầu báo mỗi ngày tới go-live. Phiên kết thúc bằng lời xin lỗi.';
