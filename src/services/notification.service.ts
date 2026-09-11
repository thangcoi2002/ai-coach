export type Notification = {
  id: string;
  unread: boolean;
  title: string;
  body: string;
  cta: string;
  when: string;
};

/** TODO: remove the mock data once Backend chính ships a GET /notifications endpoint. */
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    unread: true,
    title: 'Hôm nay bạn có định thử câu mở đầu mới không?',
    body: 'Cam kết từ buổi diễn tập hôm qua. Thử xong kể lại một dòng là đủ.',
    cta: 'Kể lại kết quả',
    when: '8:30 sáng nay',
  },
  {
    id: '2',
    unread: true,
    title: 'Báo cáo buổi diễn tập đã sẵn sàng',
    body: 'Báo trễ deadline cho sếp đang ép tiến độ.',
    cta: 'Mở báo cáo',
    when: 'Hôm qua, 17:40',
  },
  {
    id: '3',
    unread: false,
    title: 'Buổi 3 của Lắng nghe chủ động vừa mở',
    body: 'Mở ra vì bạn đã thử ở một cuộc trò chuyện thật và kể lại kết quả.',
    cta: 'Xem lộ trình',
    when: 'Hôm qua, 17:40',
  },
  {
    id: '4',
    unread: false,
    title: 'Phân tích xong: 1:1 với sếp về deadline báo cáo quý',
    body: 'Tìm ra một thói quen lặp lại ở ba đoạn khác nhau.',
    cta: 'Xem kết quả',
    when: '19 tháng 8',
  },
];

export async function fetchNotifications(): Promise<Notification[]> {
  return MOCK_NOTIFICATIONS;
}
