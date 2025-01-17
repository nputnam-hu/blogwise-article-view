import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import filesize from 'rollup-plugin-filesize'
import autoprefixer from 'autoprefixer'
import localResolve from 'rollup-plugin-local-resolve'
import image from 'rollup-plugin-image'
import pkg from './package.json'

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'blogwise-article-view',
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'blogwise-article-view',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    postcss({ extract: false, plugins: [autoprefixer], extensions: ['.css'] }),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve(),
    commonjs(),
    filesize(),
    image(),
  ],
}

export default config
