import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 원하는 포트 번호로 변경
    strictPort: true, // 포트 충돌 시 다음 포트 사용 방지
  },
})
