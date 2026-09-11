# 06 · Lưu trữ bảo mật & clipboard

| Thư viện | Version |
|---|---|
| `react-native-keychain` | ^10.0.0 |
| `@react-native-clipboard/clipboard` | ^1.16.3 |

## Cài để làm gì

### `react-native-keychain` — đang dùng
Lưu access/refresh token sau khi đăng nhập OTP (Keychain trên iOS, Keystore-backed EncryptedSharedPreferences trên Android) thay vì AsyncStorage (không mã hoá). Dùng trong `src/context/AuthProvider.tsx`.

### `@react-native-clipboard/clipboard` — đã cài, chưa dùng
Dự phòng cho thao tác copy trong app — ứng viên rõ nhất là **paste mã OTP 6 số** ở màn `verify` (user copy code từ SMS/email rồi dán vào 6 ô, không phải gõ tay từng số) và copy nội dung quote bằng chứng ở `analysis`/`dbScore` (evidence quotes) nếu cần chia sẻ.

## Trạng thái

`react-native-keychain` đang dùng trong flow auth. `@react-native-clipboard/clipboard` được cài trước, chưa có code gọi — sẽ dùng khi bổ sung paste-OTP vào `OtpFields.tsx` hoặc copy quote ở màn phân tích.
