import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// allows resolving paths from jsconfig.json/tsconfig.json
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ projects: ['./jsconfig.json'] })
  ],
})
