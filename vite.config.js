import viteCompression from 'vite-plugin-compression'
import react from '@vitejs/plugin-react'

export default {
  // config options
  resolve: {
    alias: {
      'react-dom': 'pureact/createElement',
      react: 'pureact/createElement',
    },
  },
  plugins: [viteCompression(), react()],
  esbuild: {
    jsxFactory: 'pureact.createElement',
    jsxFragment: 'Fragment',
  },
  loader: { '.js': 'jsx' },
  eslint: {
    'react/react-in-jsx-scope': 'off',
  },
  test: {
    environment: 'jsdom',
  },
}
