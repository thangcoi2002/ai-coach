# 05 · Network & streaming

| Thư viện | Version |
|---|---|
| `axios` | ^1.19.0 |
| `react-native-sse` | ^1.2.1 |

## Cài để làm gì

### `axios` — đang dùng
HTTP client cho toàn bộ REST API tới AI Gateway (`docs/AI_Gateway_API_Description_v0.2.md`): auth (sign-in/verify OTP), CRUD báo cáo, tạo/lấy roleplay session, lấy danh sách skill/score… Wrapper ở `src/services/api.ts`.

### `react-native-sse` — đã cài, chưa dùng
Nhận **Server-Sent Events** cho endpoint:

```
POST /v1/roleplay-sessions/{sessionId}/messages
Accept: text/event-stream
```

Dùng cho màn **`roleplayChat`** (roleplay dạng chat text) — hiển thị câu trả lời AI persona xuất hiện dần từng phần thay vì đợi full response, khớp behaviour "typing indicator" trong design handoff.

**Vì sao không dùng `EventSource` chuẩn:** `EventSource` web chỉ hỗ trợ GET và không cho set header/body tuỳ ý; endpoint trên là POST kèm body tin nhắn + header auth, nên cần client SSE hỗ trợ POST như `react-native-sse`.

**Không dùng cho `roleplay`/`roleplayVideo`:** theo mục 12 của API doc, kênh Voice/Avatar realtime (WebRTC/WebSocket) **backend chưa cấu hình** (`VENDOR_UNAVAILABLE`, `realtime_provider_not_configured`) — chưa cần setup thư viện WebRTC/livekit ở giai đoạn này. Khi backend sẵn sàng, sẽ cần đánh giá lại (LiveKit/Agora SDK) — ghi chú này để không quên tại sao chưa có.

## Trạng thái

`axios` đang dùng trong `src/services/api.ts`, `src/services/auth.service.ts`. `react-native-sse` sẽ dùng khi code tới `roleplayChat`.
