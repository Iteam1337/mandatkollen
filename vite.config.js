export default {
  // config options
  resolve: {
    alias: {
      "react-dom": "pureact/createElement",
      react: "pureact/createElement",
    },
  },
  esbuild: {
    jsxFactory: "pureact.createElement",
    jsxFragment: "Fragment",
  },
  loader: { ".js": "jsx" },
  eslint: {
    "react/react-in-jsx-scope": "off",
  },
}
