import {terser} from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: "dist/index.js",
      format: 'es',
      sourcemap: false,
      plugins: [
        terser({
          ecma: 2020,
          mangle: { toplevel: true },
          compress: {
            module: true,
            toplevel: true,
            unsafe_arrows: true,
            drop_console: true,
            drop_debugger: true
          },
          output: { quote_style: 1 }
        })
      ]
    }
  }
]
