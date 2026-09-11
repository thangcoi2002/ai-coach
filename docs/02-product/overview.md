# Tổng quan sản phẩm

> Nguồn: một bản design handoff (34 màn, HTML prototype clickable) cung cấp riêng bên ngoài repo này (không commit vào git vì nặng — HTML + ảnh đi kèm), và nội dung đã đọc từ tài liệu mô tả AI Gateway API v0.2 (không còn trong `docs/` — xem [file-upload-permissions.md](../01-technical/01-libs/file-upload-permissions.md) và các file khác trong `01-technical/01-libs/` để biết những gì đã trích dẫn). Tài liệu này là bản tóm tắt lại — người đọc sau này cần xin lại bản design handoff gốc nếu muốn đối chiếu chi tiết hơn.
>
> Đây là bản thay thế `docs/mobile-roadmap` (branch cũ, đã bỏ) — branch đó phân tích một bundle thiết kế khác (mascot EQ-blob, màu cam/vermilion) và API v0.1, không còn khớp với thiết kế/API hiện tại.

## App làm gì

Ứng dụng coaching kỹ năng giao tiếp cho quản lý (tiếng Việt). Người dùng:

1. **Chẩn đoán** kỹ năng hiện tại — bằng 1 trong 4 cách: nộp báo cáo 360/SELI, làm khảo sát 15 câu tình huống, gửi ghi âm/video hội thoại thật, hoặc diễn tập 1 tình huống.
2. **Phân tích hội thoại thật** đã ghi — xem điểm mạnh/điểm yếu, trích dẫn bằng chứng theo từng khoảnh khắc.
3. **Diễn tập (roleplay)** với một AI đóng vai người thật (đồng nghiệp/nhân viên/khách hàng...) — qua giọng nói, video có avatar, hoặc chat.
4. **Debrief** sau mỗi buổi diễn tập — 3 bước: tự nhìn lại → điểm chi tiết theo kỹ năng → chốt việc cần thay đổi.
5. **Mang cam kết về đời thật** — theo dõi checklist hành vi muốn thay đổi, xem lại tiến trình theo thời gian (báo cáo, chi tiết từng kỹ năng).

## 34 màn hình (theo design handoff)

| Nhóm | Màn (`key` — tên) |
|---|---|
| 01 · Vào app | `signin` — Đăng nhập email · `verify` — Nhập mã 6 số · `onb1/onb2/onb3` — Giới thiệu |
| 02 · Cổng chẩn đoán | `gate` — Chọn cách · `gateReport` — Nộp báo cáo · `gateSurvey` — Khảo sát · `gateMedia` — Gửi ghi âm/video · `gateRole` — Diễn tập tình huống · `gateResult` — Kết quả |
| 03 · Trang chủ | `home` — Trang chủ · `inbox` — Thông báo |
| 04 · Phân tích hội thoại thật | `conversations` · `upload` · `ctx` (khai bối cảnh) · `processing` · `transcript` · `analysis` · `redo` |
| 05 · Chuẩn bị diễn tập | `practice` (hub) · `brief` · `persona` · `interview` (dựng persona từ người thật) |
| 06 · Phòng diễn tập | `roleplay` (giọng nói) · `roleplayVideo` (avatar) · `roleplayChat` (chat) |
| 07 · Debrief | `dbOpen` (tự nhìn lại) · `dbScore` (điểm chi tiết) · `dbClose` (chốt việc phải thay đổi) |
| 08 · Đời thật | `commitments` — Việc phải thay đổi |
| 09 · Chi tiết kỹ năng | `skillJourney` |
| 10 · Báo cáo | `reports` (lịch sử) · `report` (chi tiết) |
| 11 · Edge case | `states` — mọi trạng thái lỗi/rỗng (không có bản ghi, file quá dài, audio kém...) |

Bottom tab bar (4 tab: Trang chủ / Luyện tập / Phân tích / Thông báo) **ẩn** ở: auth, onboarding, mọi `gate*`, `processing`, `redo`, và cả 3 `roleplay*`.

## Trạng thái hiện tại của repo

**Đã code (4/34 màn tương ứng):** `signin` + `verify` (gộp trong `LoginScreen` + `OtpStep`/`OtpFields`), `home` (`HomeScreen`, chưa có checklist/next-action card như thiết kế), `inbox` (`NotificationsScreen`), `profile` (không có trong danh sách 34 màn — màn phụ có sẵn). Navigation: root stack + bottom tab (`RootNavigator`, `MainTabNavigator`).

**Chưa code:** toàn bộ 30 màn còn lại — 3 onboarding, cả cổng chẩn đoán (6 màn), phân tích hội thoại (7 màn), chuẩn bị + phòng diễn tập (7 màn), debrief (3 màn), commitments, skillJourney, reports (2 màn), states.

**Thư viện:** xem [docs/README.md](../README.md) — mục `01-technical/01-libs`. Tóm tắt: nền tảng (navigation/nativewind/animation) đã dùng từ flow OTP; nhóm camera/ghi âm/upload/permissions/slider/sse/dayjs/clipboard đã **cài trước**, chưa có code, chuẩn bị cho 30 màn ở trên.

## Backend liên quan (AI Gateway v0.2) — tóm tắt theo nhóm tính năng

| Tính năng app | Endpoint chính |
|---|---|
| Chẩn đoán (báo cáo/khảo sát/media/roleplay) | `POST /diagnosis-jobs`, kết quả qua callback/webhook |
| Dựng persona từ phỏng vấn (`interview`) | `POST /persona-interviews`, `.../generate` |
| Roleplay chat (text) | `POST /roleplay-sessions`, `POST .../messages` (SSE streaming) |
| Roleplay voice/avatar | `POST /roleplay-sessions/{id}/realtime-credentials` — **đang bị chặn**, vendor Voice/Avatar chưa chốt (`503 VENDOR_UNAVAILABLE`), xem flow đã confirm ở [camera-media-capture.md](../01-technical/01-libs/camera-media-capture.md) |
| Kết thúc roleplay + debrief | `POST /roleplay-sessions/{id}/end`, `GET .../debrief` |
| Upload media (audio/video) | Signed URL, giới hạn **90 phút / 500MB**, 5 MIME type cố định |

Máy trạng thái session roleplay: `READY → ACTIVE → ENDING → DEBRIEFING → COMPLETED` (hoặc `FAILED/CANCELED/EXPIRED`).

## Rủi ro / điểm cần chốt trước khi code tiếp

- **Vendor Voice/Avatar chưa chọn** — `roleplay` và `roleplayVideo` không thể code phần kết nối thật cho tới khi có vendor + biết SDK client (React Native hay chỉ Web/WebRTC).
- **Backend giữ persona interview tạm thời** — AI Gateway không đảm bảo giữ persona sau khi interview hết hạn; backend chính phải tự lưu nếu muốn tái sử dụng.
- **Giới hạn media 500MB/90 phút, 5 định dạng cố định** — cần validate ở client trước khi cho upload (`gateMedia`, `upload`).
- File mô tả API AI Gateway v0.2 không có sẵn trong `docs/` của repo này — nếu cần đối chiếu chi tiết hơn những gì tóm tắt trong `01-technical/01-libs/`, cần xin lại file đó.
