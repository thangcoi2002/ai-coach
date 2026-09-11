# 08 · File, upload & quyền

| Thư viện | Version |
|---|---|
| `react-native-blob-util` | ^0.24.11 |
| `@react-native-documents/picker` | ^12.0.2 |
| `react-native-permissions` | ^5.6.1 |
| `@react-native-community/slider` | ^5.2.1 |

## Cài để làm gì

### `react-native-blob-util` — đã cài, chưa dùng
Upload file audio/video lên **signed URL** (`docs/AI_Gateway_API_Description_v0.2.md`, mục media) bằng PUT trực tiếp từ đường dẫn file trên máy, có progress callback, không load hết file vào JS memory — bắt buộc vì giới hạn file tới **500MB / 90 phút**. Dùng ở màn `upload` (đưa hội thoại vào) và `gateMedia` (gửi ghi âm/video khi chẩn đoán).

### `@react-native-documents/picker` — đã cài, chưa dùng
Chọn file có sẵn từ máy (không quay/ghi mới) cho:
- `gateReport` — nộp báo cáo SELI/360 (file PDF/doc).
- `gateMedia` / `upload` — chọn file audio/video có sẵn thay vì quay mới bằng `react-native-vision-camera`/`react-native-nitro-sound` (xem [camera-media-capture.md](camera-media-capture.md)).

**Vì sao không dùng `react-native-document-picker`:** bị deprecated, tác giả khuyến nghị chuyển sang package tổ chức lại này (`@react-native-documents/picker`).

### `react-native-permissions` — đã cài, chưa dùng
Xin quyền runtime (camera, micro, thư viện ảnh) trước khi mở `react-native-vision-camera`/`react-native-nitro-sound`/picker — cần cho **mọi** màn có ghi âm/quay video/chọn ảnh: `gateMedia`, `upload`, `redo`, `roleplay*`, `interview`.

### `@react-native-community/slider` — đã cài, chưa dùng
Slider kéo-thả cho màn **`dbOpen`** (debrief bước 1 — tự đánh giá bản thân, state `self` 0–10 theo README design handoff).

## Trạng thái

Đã cài + khai báo quyền tĩnh native (xem [camera-media-capture.md](camera-media-capture.md) — Info.plist/AndroidManifest dùng chung cho cả nhóm camera/mic/file). Chưa có code gọi các API xin quyền runtime hay upload thực tế.
