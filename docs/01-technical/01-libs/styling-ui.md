# 02 · Styling & UI cơ bản

| Thư viện | Version |
|---|---|
| `nativewind` | ^4.2.6 |
| `tailwindcss` | ^3.4.19 |
| `react-native-svg` | ^15.15.5 |
| `react-native-vector-icons` | ^10.3.0 |

## Cài để làm gì

- **`nativewind` + `tailwindcss`** — viết style bằng className Tailwind thay vì `StyleSheet.create`, khớp với design token trong `design_handoff_akelo_ai_coach/README.md` (màu coral `#FA6545`, radius 16/20/999px, spacing 8-32px…) — khai báo trong `tailwind.config.js`.
- **`react-native-svg`** — render bộ icon riêng của Akelo. `design_handoff_akelo_ai_coach/source/akelo-icons.js` chứa 24×24 SVG path cho từng icon (home, explore, practice, record, roleplay-chat, v.v.) — cần build một component `<Icon name size color accent>` dùng `react-native-svg` để giữ đúng 1:1 icon set thiết kế, **không dùng bộ icon có sẵn của `react-native-vector-icons`** cho các icon riêng của Akelo.
- **`react-native-vector-icons`** — bộ icon chuẩn (font) cho các nhu cầu chung không nằm trong bộ icon riêng của Akelo (nếu có).

## Trạng thái

- `nativewind`/`tailwindcss` **đang dùng** — wiring đủ ở `babel.config.js` (`nativewind/babel`), `metro.config.js` (`withNativeWind`), `tailwind.config.js` (`nativewind/preset`), `global.css`; 10 file trong `src/` đã dùng `className=`.
- `react-native-vector-icons` **đang dùng** — font đã copy vào `ios/AiCoach/Info.plist` (`UIAppFonts`).
- `react-native-svg` **đã cài, chưa dùng** — sẽ dùng khi build component Icon từ `akelo-icons.js` cho toàn bộ 34 màn (mọi icon trong thiết kế đều là SVG path riêng, không phải icon font).

## Việc còn lại

Chuyển `source/akelo-icons.js` (paths) thành 1 component `Icon` TypeScript dùng `react-native-svg`, export danh sách tên icon đã liệt kê trong design handoff.
