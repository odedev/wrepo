import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete'

export default {
  input: 'main.js',
  output: [
		{
			file: 'dist/bundle.js',
			format: 'cjs'
		},
		{
			file: 'dist/bundle.min.js',
			format: 'cjs',
			name: 'version',
			plugins: [terser()]
		}
	],
  plugins: [
    json(),
    del({ targets: 'dist/*' }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist/public' },
        { src: 'assets/images/**/*', dest: 'dist/public/images' }
      ]
    }),
  ]
};
