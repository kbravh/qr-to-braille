import typescript from '@rollup/plugin-typescript'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const isProd = process.env.BUILD === 'production'

const banner = `#!/usr/bin/env node`

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    sourcemap: 'inline',
    sourcemapExcludeSources: isProd,
    format: 'cjs',
    banner,
  },
  external: ['fs/promises'],
  plugins: [typescript(), nodeResolve(), commonjs()],
}
