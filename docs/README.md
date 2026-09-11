# Docs

Mục lục tài liệu kỹ thuật. Setup chạy app thì xem [README.md](../README.md) ở gốc repo.

## 02-product/ Sản phẩm

| Tài liệu | Nội dung |
|---|---|
| [overview.md](02-product/overview.md) | App cần làm gì, 34 màn hình theo design handoff, trạng thái đã code/chưa code, tóm tắt endpoint AI Gateway liên quan, rủi ro/điểm cần chốt |

## 01-technical/ Tài liệu kỹ thuật

### 01-libs/ Thư viện ngoài mặc định

Một app React Native khởi tạo mới chỉ có sẵn `react`, `react-native` và bộ công cụ build/test (`@babel/*`, `@react-native/*`, `eslint`, `jest`, `prettier`, `typescript`...). Các file dưới đây mô tả **từng thư viện được cài thêm**: cài để làm gì, dùng cho tính năng/màn hình nào (đối chiếu design handoff — cung cấp riêng, không nằm trong repo), và trạng thái hiện tại trong code — để mở lại project không cần hỏi lại "lib này để làm gì".

| Tài liệu | Nhóm | Thư viện | Trạng thái |
|---|---|---|---|
| [navigation.md](01-technical/01-libs/navigation.md) | Navigation | `@react-navigation/*`, `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` | Đang dùng |
| [styling-ui.md](01-technical/01-libs/styling-ui.md) | Styling & UI cơ bản | `nativewind`, `tailwindcss`, `react-native-svg`, `react-native-vector-icons` | Đang dùng |
| [animation-gestures.md](01-technical/01-libs/animation-gestures.md) | Animation | `react-native-reanimated`, `react-native-worklets` | Đã cài, chưa dùng |
| [forms.md](01-technical/01-libs/forms.md) | Form | `react-hook-form` | Đã cài, chưa dùng |
| [networking-streaming.md](01-technical/01-libs/networking-streaming.md) | Network & streaming | `axios`, `react-native-sse` | `axios` đang dùng, `react-native-sse` đã cài chưa dùng |
| [storage-auth.md](01-technical/01-libs/storage-auth.md) | Lưu trữ bảo mật & clipboard | `react-native-keychain`, `@react-native-clipboard/clipboard` | `keychain` đang dùng, `clipboard` đã cài chưa dùng |
| [camera-media-capture.md](01-technical/01-libs/camera-media-capture.md) | Camera & ghi âm | `react-native-vision-camera`, `react-native-nitro-modules`, `react-native-nitro-image`, `react-native-nitro-sound` | Đã cài, chưa dùng |
| [file-upload-permissions.md](01-technical/01-libs/file-upload-permissions.md) | File, upload & quyền | `react-native-blob-util`, `@react-native-documents/picker`, `react-native-permissions`, `@react-native-community/slider` | Đã cài, chưa dùng |
| [utilities.md](01-technical/01-libs/utilities.md) | Tiện ích | `dayjs` | Đã cài, chưa dùng |
| [branding.md](01-technical/01-libs/branding.md) | Splash / thương hiệu | `react-native-bootsplash` | Đang dùng |
| [env-config.md](01-technical/01-libs/env-config.md) | Biến môi trường | `react-native-dotenv` | Đang dùng |

### Cách đọc mỗi file

- **Cài để làm gì** — tính năng/màn hình cụ thể cần nó.
- **Vì sao chọn thư viện này** — nếu có lựa chọn thay thế đã cân nhắc (và lý do loại các lựa chọn khác, ví dụ package bị deprecated).
- **Trạng thái** — đã dùng ở đâu trong `src/`, hay mới setup native (pod install / Gradle / permissions) chờ code tính năng tương ứng.

### Bối cảnh chung

- Repo hiện là RN 0.87 (New Architecture bật mặc định), dùng `nativewind` (Tailwind cho RN) thay StyleSheet, `@react-navigation` cho điều hướng.
- Nhóm animation/forms/sse/clipboard/camera/file-upload/utilities được cài **trước** để chuẩn bị cho các màn hình chưa code: cổng chẩn đoán (upload báo cáo/ghi âm/video/khảo sát), phòng diễn tập (roleplay voice/video/chat), debrief 3 bước, báo cáo/thông báo — chi tiết 34 màn trong design handoff.
- Giao ước API media (signed URL, giới hạn 90 phút/500MB, SSE cho roleplay chat, WebRTC/WebSocket cho voice/avatar **chưa sẵn sàng ở backend**) quyết định vì sao chọn `react-native-sse` thay vì WebRTC/livekit ở giai đoạn này — xem [networking-streaming.md](01-technical/01-libs/networking-streaming.md).
