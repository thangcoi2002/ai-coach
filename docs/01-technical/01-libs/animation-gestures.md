# 03 · Animation

| Thư viện | Version |
|---|---|
| `react-native-reanimated` | ^4.6.0 |
| `react-native-worklets` | ^0.12.1 (peer dep bắt buộc của reanimated v4) |

## Cài để làm gì

Dùng cho các animation mượt (chạy trên UI thread) mà thiết kế yêu cầu:

- **Waveform 7 thanh khi roleplay giọng nói** (`roleplay`, `roleplayVideo`) — animate chiều cao từng bar theo `RP_BARS`/`rpPhase` (speaking/listening/thinking), CSS keyframes gốc ~0.9–1.4s ease-in-out infinite, so le từng bar → dựng lại bằng `useAnimatedStyle` + `withRepeat`/`withTiming` của reanimated.
- **Onboarding 3 màn vuốt ngang** (`onb1/onb2/onb3`) — animation chuyển trang + dots.
- **Card/list transition** nhẹ (expand evidence quote ở `analysis`/`dbScore`, mở "+ Thêm hành vi" ở `home`, toggle gợi ý ở roleplay).
- **Animated bars khi `processing`** (màn xử lý audio, nền tối, có animation "đang xử lý").

`react-native-worklets` không tự chọn — reanimated v4 tách phần worklet runtime ra package riêng, bắt buộc phải có.

## Trạng thái: đã cài, chưa dùng

Chưa có màn nào trong `src/` cần animation phức tạp (mới chỉ auth/home/notifications/profile). Sẽ dùng khi code tới `roleplay*`, `onb*`, `processing`.

## Lưu ý

`@react-navigation` cũng tận dụng reanimated cho transition mặc định nếu bật (hiện dùng transition default của native-stack, chưa custom).
