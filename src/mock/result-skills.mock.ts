import type { ResultSkill } from '@/types/diagnostic.type';

/** Starting levels shown on the result screen, matching a quick-survey run. */
export const RESULT_SKILLS: ResultSkill[] = [
  {
    name: 'Lắng nghe chủ động',
    level: 2,
    prev: 1,
    start: true,
    note: 'Bạn nghe để trả lời, chưa nghe để hiểu mối bận tâm phía sau.',
  },
  {
    name: 'Phản hồi xây dựng',
    level: 2,
    prev: 2,
    note: 'Có dữ kiện, nhưng thường mở đầu bằng kết luận.',
  },
  {
    name: 'Giao tiếp thấu cảm',
    level: 3,
    prev: 2,
    note: 'Điểm mạnh với đồng nghiệp ngang cấp, yếu hơn với cấp trên.',
  },
  {
    name: 'Kiểm soát cảm xúc',
    level: 2,
    prev: 2,
    note: 'Giữ được giọng, nhưng rút lui thay vì lên tiếng.',
  },
  {
    name: 'Bán hàng bằng thông minh cảm xúc',
    level: 0,
    note: 'Khảo sát chưa có tình huống nào cho kỹ năng này. Gửi một bản ghi hoặc diễn tập để có mức.',
  },
];

/** The skill+level the result screen leads with, and what gets saved onto the user. */
export const STARTING_SKILL = RESULT_SKILLS.find(s => s.start) ?? RESULT_SKILLS[0];
