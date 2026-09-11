# 02 · Styling & UI cơ bản

| Thư viện | Version |
|---|---|
| `nativewind` | ^4.2.6 |
| `tailwindcss` | ^3.4.19 |
| `react-native-svg` | ^15.15.5 |
| `react-native-vector-icons` | ^10.3.0 |

## Cài để làm gì

- **`nativewind` + `tailwindcss`** — viết style bằng className Tailwind thay vì `StyleSheet.create`, khớp với design token của bản thiết kế (design handoff, cung cấp riêng — không nằm trong repo): màu coral `#FA6545`, radius 16/20/999px, spacing 8-32px… — khai báo trong `tailwind.config.js`.
- **`react-native-svg`** — render bộ icon riêng của app. Bản thiết kế đi kèm 1 file JS liệt kê 24×24 SVG path cho từng icon (home, explore, practice, record, roleplay-chat, v.v.) — cần build một component `<Icon name size color accent>` dùng `react-native-svg` để giữ đúng 1:1 icon set thiết kế, **không dùng bộ icon có sẵn của `react-native-vector-icons`** cho nhóm icon riêng này.
- **`react-native-vector-icons`** — bộ icon chuẩn (font) cho các nhu cầu chung không nằm trong bộ icon riêng của app (nếu có).

## Trạng thái

- `nativewind`/`tailwindcss` **đang dùng** — wiring đủ ở `babel.config.js` (`nativewind/babel`), `metro.config.js` (`withNativeWind`), `tailwind.config.js` (`nativewind/preset`), `global.css`; 10 file trong `src/` đã dùng `className=`.
- `react-native-vector-icons` **đang dùng** — font đã copy vào `ios/AiCoach/Info.plist` (`UIAppFonts`).
- `react-native-svg` **đã cài, chưa dùng** — sẽ dùng khi build component Icon từ file icon paths của design handoff cho toàn bộ 34 màn (mọi icon trong thiết kế đều là SVG path riêng, không phải icon font).

## Việc còn lại

Chuyển file SVG path của design handoff thành 1 component `Icon` TypeScript dùng `react-native-svg`, export danh sách tên icon đã liệt kê trong design handoff.
