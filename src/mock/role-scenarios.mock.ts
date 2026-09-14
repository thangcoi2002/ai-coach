import type { RoleScenario } from '@/types/diagnostic.type';

/** One rehearsal scenario per skill, matched by index into GATE_SKILLS. */
export const ROLE_SCENARIOS: RoleScenario[] = [
  {
    scenario: 'Báo trễ deadline cho sếp đang ép tiến độ',
    person: 'Anh Kiên',
    initial: 'K',
  },
  {
    scenario: 'Phản hồi cho nhân viên nộp muộn lần thứ ba',
    person: 'Bạn Linh',
    initial: 'L',
  },
  {
    scenario: 'Nói với khách hàng về lỗi giao hàng tuần trước',
    person: 'Chị Thảo',
    initial: 'T',
  },
  {
    scenario: 'Giữ bình tĩnh khi bị ngắt lời trong họp nhóm',
    person: 'Anh Kiên',
    initial: 'K',
  },
  {
    scenario: 'Khách hàng nói "để anh suy nghĩ thêm" sau buổi demo',
    person: 'Chị Thảo',
    initial: 'T',
  },
];

/** One estimate shared by the picker rows and the start button, so they can't drift. */
export const ROLEPLAY_DURATION = '8 phút';
