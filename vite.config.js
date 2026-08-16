import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl =
    env.VITE_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL ||
    env.SUPABASE_URL ||
    ''
  const supabaseAnonKey =
    env.VITE_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.SUPABASE_ANON_KEY ||
    ''

  return {
    base: '/azure-learning/',
    plugins: [react()],
    define: {
      'process.env.IS_PREACT': JSON.stringify(false),
      // Map Vercel ↔ Supabase integration names into the Vite client env.
      // Never map SUPABASE_SERVICE_ROLE_KEY here.
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
    },
    optimizeDeps: {
      include: ['@excalidraw/excalidraw'],
    },
  }
})
