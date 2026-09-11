# 04 · Form

| Thư viện | Version |
|---|---|
| `react-hook-form` | ^7.86.0 |

## Cài để làm gì

Quản lý state + validate cho các form nhiều field trong app:

- `gateReport` — nộp báo cáo SELI/360 (chọn file + field mô tả).
- `gateSurvey` — khảo sát 15 câu tình huống, single-choice, có progress bar (`svPct`, "Câu n / 15").
- `ctx` — khai bối cảnh trước khi phân tích hội thoại (context form).
- `interview` — dựng nhân vật từ người thật (nhiều field mô tả persona).
- `dbOpen`/`dbClose` — debrief bước 1 (tự nhìn lại) và bước 3 (chốt việc phải thay đổi/commitment).

Màn `signin`/`verify` (email + OTP) **hiện không dùng** react-hook-form — `OtpFields.tsx`/`SignInStep.tsx` tự quản lý state cục bộ vì logic đơn giản (không cần schema validation phức tạp).

## Trạng thái: đã cài, chưa dùng

Sẽ dùng khi code tới các form kể trên (`gate*`, `ctx`, `interview`, `dbOpen`, `dbClose`).
