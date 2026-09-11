# 07 · Camera & ghi âm

| Thư viện | Version |
|---|---|
| `react-native-vision-camera` | ^5.2.3 |
| `react-native-nitro-modules` | ^0.37.1 (peer dep bắt buộc, runtime cho mọi lib "nitro") |
| `react-native-nitro-image` | ^0.15.2 (peer dep bắt buộc của vision-camera 5.x) |
| `react-native-nitro-sound` | ^0.2.20 |

## Cài để làm gì

### `react-native-vision-camera` — đã cài, chưa dùng
Quay video bằng camera trong app **chỉ cho `gateMedia`** — "Gửi ghi âm / video" (một trong 4 cách chẩn đoán), option quay trực tiếp thay vì chọn file có sẵn.

**`roleplayVideo` KHÔNG dùng camera của người dùng — không phải quay video.** Đây là mô hình giống "video call 1-vs-1" nhưng phía bên kia không phải người thật:

1. Người dùng nói — mic ghi audio live (giống đang gọi video call).
2. App gửi audio đó lên AI Gateway để xử lý (STT → LLM → TTS, theo `docs/AI_Gateway_API_Description_v0.2.md` mục 12).
3. TTS trả về audio câu trả lời, và **một SDK avatar vendor riêng** (không phải code tự viết) nhận audio đó + 1 ảnh nhân vật tĩnh đã tạo sẵn, tự render lip-sync real-time (miệng mấp máy khớp giọng nói) — hiển thị như đang video call với nhân vật đó.

Đây chính là **"Avatar" vendor** nói ở mục 12 API doc (session `mode = AVATAR`, credential qua `POST /roleplay-sessions/{sessionId}/realtime-credentials`, transport `WEBRTC`/`WEBSOCKET`).

**Chưa cài SDK nào cho việc này — đang bị chặn ở khâu chọn vendor.** API doc ghi rõ: *"Chưa chốt vendor Voice/Avatar"*, endpoint credential hiện trả `503 VENDOR_UNAVAILABLE` / `realtime_provider_not_configured`. Mỗi vendor avatar real-time (D-ID Live, Simli, HeyGen Streaming Avatar, Tavus…) có SDK/giao thức riêng (thường là WebRTC, có SDK JS/React riêng, chưa chắc có bản React Native chính thức) — **không thể chọn trước** thư viện cho tới khi backend/product chốt vendor. Khi chốt, quay lại mục này để cài đúng SDK của vendor đó.

`react-native-vision-camera` **không liên quan** tới `roleplayVideo` — chỉ dùng cho `gateMedia` như trên.

**Vì sao chọn vision-camera cho `gateMedia` thay vì `react-native-image-picker`:** đã hỏi & chốt với user — cần tự vẽ UI quay tuỳ biến (đúng fidelity thiết kế hơn) thay vì UI camera mặc định của OS, dù setup native nặng hơn.

### `react-native-nitro-sound` — đã cài, chưa dùng
Ghi âm micro **thành file** (không phải streaming real-time) + phát lại, dùng cho:
- `gateMedia` — ghi âm hội thoại để nộp chẩn đoán (upload file sau khi ghi xong).
- `redo` — "Nói lại khoảnh khắc" (ghi âm lại một đoạn cụ thể, màn nền tối).
- Phát lại bản ghi ở `transcript` (xác nhận bản ghi và vai) trước khi gửi phân tích.

**Không dùng cho `roleplay`/`roleplayVideo` (voice/avatar hands-free).** Hai màn đó là realtime qua SDK vendor Voice/Avatar (WebRTC) — vendor SDK tự bắt mic, không cần `nitro-sound` ghi file trung gian. `roleplayChat` cũng không cần ghi âm vì là chat dạng chữ (xem [networking-streaming.md](networking-streaming.md)).

**Vì sao không dùng `react-native-audio-recorder-player`:** package đó đã bị tác giả deprecate, khuyến nghị chuyển sang `react-native-nitro-sound` — chọn thẳng bản mới để khỏi phải migrate sau.

`react-native-nitro-modules` và `react-native-nitro-image` không tự chọn — là runtime/peer dependency bắt buộc để 2 lib trên chạy được (kiến trúc "Nitro" của cùng nhóm tác giả).

## Trạng thái: đã cài, native setup xong, chưa có code dùng

- iOS: đã thêm `NSCameraUsageDescription`, `NSMicrophoneUsageDescription`, `NSPhotoLibraryUsageDescription`, `NSPhotoLibraryAddUsageDescription` vào `ios/AiCoach/Info.plist`.
- Android: đã thêm quyền `CAMERA`, `RECORD_AUDIO`, `READ_MEDIA_IMAGES/VIDEO/AUDIO` + `uses-feature` camera/microphone (optional) vào `android/app/src/main/AndroidManifest.xml`.
- Đã `pod install` xong, đã build thử Android debug (`assembleDebug`) pass.
- **Xin quyền runtime** (mở camera/mic) sẽ dùng `react-native-permissions` (xem [file-upload-permissions.md](file-upload-permissions.md)) — chưa code, chỉ mới khai báo quyền tĩnh.

## Việc còn lại theo API doc

Giới hạn media theo `docs/AI_Gateway_API_Description_v0.2.md`: audio/video tối đa **90 phút / 500MB**, chỉ nhận `audio/mpeg`, `audio/mp4`, `audio/wav`, `audio/webm`, `video/mp4` — cần validate định dạng/độ dài **trước khi** upload (xem [file-upload-permissions.md](file-upload-permissions.md) cho phần upload signed URL).

## Đang chặn: chưa chọn được vendor Avatar/Voice real-time

`roleplay` (voice) và `roleplayVideo` (avatar) **chưa thể code được** cho tới khi có: (1) backend chốt vendor Voice/Avatar, (2) endpoint `realtime-credentials` trả credential thật thay vì `503 VENDOR_UNAVAILABLE`, (3) biết SDK client của vendor đó có hỗ trợ React Native hay chỉ Web/WebRTC thuần (ảnh hưởng tới cách tích hợp — WebView vs native SDK vs tự dựng WebRTC bằng `react-native-webrtc`). Chưa cài `react-native-webrtc` hay bất kỳ SDK vendor nào vì chưa biết chọn cái gì.

## Flow đã confirm với user (2026-09-11)

Trước phòng diễn tập, chung cho cả voice và avatar:

1. `practice` (hub luyện tập) → chọn bài luyện.
2. `brief` — xem bối cảnh/mục tiêu buổi diễn tập.
3. `persona` — xem nhân vật AI sắp đóng vai (có thể qua `interview` để dựng persona từ người thật trước).
4. Backend tạo session: `POST /roleplay-sessions` với `mode = VOICE` hoặc `AVATAR` + persona/scenario/limits → session `READY → ACTIVE`.
5. App xin credential tạm: `POST /roleplay-sessions/{id}/realtime-credentials` → nhận token + endpoint để nối thẳng tới **vendor** (không qua AI Gateway nữa). *(Bước này hiện đang trả `VENDOR_UNAVAILABLE` — chỉ đúng về lý thuyết theo API doc cho tới khi vendor được chốt.)*

**Voice call (`roleplay`):**

6. App dùng credential nối **WebRTC** thẳng tới vendor. Vendor SDK **tự bắt mic** người dùng — app không tự ghi âm bằng `nitro-sound`.
7. Người dùng nói → vendor (đứng sau là STT → LLM → TTS) → trả về audio giọng AI, stream thẳng qua WebRTC.
8. App chỉ phát audio nhận được qua loa, hiển thị trạng thái ("đang nói/đang nghe/đang nghĩ") + waveform animate theo mức âm lượng — không có hình ảnh nhân vật.
9. Nút mute mic, nút "Gợi ý", nút "✕ Thoát" → gọi `POST /roleplay-sessions/{id}/end`, vendor ngắt kết nối, vào hàng đợi tính debrief.
10. Debrief xong → chuyển `dbOpen → dbScore → dbClose`.

**Avatar call (`roleplayVideo`):** giống hệt bước 6-10 ở trên, khác:

- Ngoài audio, vendor còn trả về **video track** của nhân vật (dựng từ ảnh persona tĩnh) với môi mấp máy khớp giọng AI — lip-sync do **vendor SDK xử lý**, app chỉ render video track đó lên avatar stage (nền tím/tối).
- Người dùng vẫn chỉ nói qua mic, **không bật camera của mình** — chỉ 1 chiều (avatar) tới người dùng, không phải video call 2 chiều thật.
- Cùng bộ controls mute/gợi ý/thoát, cùng flow kết thúc + debrief như voice.
