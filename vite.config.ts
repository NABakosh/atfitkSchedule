import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	root: resolve(__dirname, '.'),
	build: {
		outDir: 'dist',
	},
	server: {
		port: 5173,
	},
	// Optional: Silence Sass deprecation warnings. See note below.
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: [
					'import',
					'mixed-decls',
					'color-functions',
					'global-builtin',
				],
			},
		},
	},
})
