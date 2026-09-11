# 11 · Biến môi trường

| Thư viện | Version |
|---|---|
| `react-native-dotenv` | ^4.1.1 (devDependency) |

## Cài để làm gì

Inject biến từ file `.env` (`API_URL`…) vào code qua import `from '@env'` thay vì hard-code — phân biệt môi trường dev/staging/production khi trỏ tới AI Gateway (`docs/AI_Gateway_API_Description_v0.2.md` có nhắc domain thử nghiệm riêng, staging/production "chưa cấp domain").

## Trạng thái: đang dùng

- `babel.config.js` khai báo plugin `module:react-native-dotenv` với `moduleName: '@env'`.
- `env.d.ts` khai type cho module `@env`.
- `src/services/api.ts` — `import { API_URL } from '@env'`.
- File thực tế: `.env` (không commit — có `.env.example` làm mẫu).
