import viteCompression from 'vite-plugin-compression'

export default {
  // config options
  resolve: {
    alias: {
      'react-dom': 'pureact/createElement',
      react: 'pureact/createElement',
    },
  },
  plugins: [viteCompression()],
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
