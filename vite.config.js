import { viteSingleFile } from 'vite-plugin-singlefile'

export default {
  // config options
  resolve: {
    alias: {
      'react-dom': 'pureact/createElement',
      react: 'pureact/createElement',
    },
  },
  plugins: [viteSingleFile()],
  esbuild: {
    jsxFactory: 'pureact.createElement',
    jsxFragment: 'Fragment',
  },
  loader: { '.js': 'jsx' },
  eslint: {
    'react/react-in-jsx-scope': 'off',
  },
}
