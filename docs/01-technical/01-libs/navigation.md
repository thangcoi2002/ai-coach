# 01 · Navigation

| Thư viện | Version |
|---|---|
| `@react-navigation/native` | ^7.3.17 |
| `@react-navigation/native-stack` | ^7.18.9 |
| `@react-navigation/bottom-tabs` | ^7.18.17 |
| `react-native-screens` | ^4.27.0 |
| `react-native-safe-area-context` | ^5.5.2 |
| `react-native-gesture-handler` | ^3.2.1 |

## Cài để làm gì

Điều hướng toàn app: stack (push/pop giữa các màn) + bottom tab bar (4 tab: Trang chủ / Luyện tập / Phân tích / Thông báo, theo design handoff mục "Bottom tab bar").

- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` là **peer dependency bắt buộc** của `@react-navigation` (không tự chọn, không có thay thế).

## Trạng thái: đang dùng

- `src/navigation/RootNavigator.tsx` — stack gốc (auth vs main).
- `src/navigation/MainTabNavigator.tsx` — bottom tab bar.
- `src/navigation/types.ts` — khai báo type cho params.

## Việc còn lại theo design handoff

34 màn hình trong design handoff cần được thêm dần vào stack này. Bottom tab bar **ẩn** ở các màn: auth, onboarding, tất cả `gate*`, `processing`, `redo`, và cả 3 `roleplay*` (voice/video/chat) — xử lý bằng cách đặt các màn đó ở một stack riêng ngoài `MainTabNavigator`, hoặc dùng `tabBarStyle: { display: 'none' }` theo route active.
