# 10 · Splash / thương hiệu

| Thư viện | Version |
|---|---|
| `react-native-bootsplash` | ^7.3.2 |

## Cài để làm gì

Màn splash lúc mở app (logo "Huấn luyện viên AI" + launcher icon, theo commit "Name the app Huấn luyện viên AI and add a placeholder launcher icon"). Ẩn splash sau khi `AuthProvider` xác định xong trạng thái đăng nhập, tránh nháy màn hình.

## Trạng thái: đang dùng

Đã wiring native (`ios/AiCoach/Info.plist` khai báo `UILaunchStoryboardName: BootSplash`) và gọi `hide()` trong code — 1 file trong `src/` tham chiếu.
