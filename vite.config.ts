//import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { UserConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
import postcss from './postcss.config.js';
// ADDED FOR CESIUM
import buildCesium from 'vite-plugin-cesium-build';

// configure vite to publish the svelte components as a library
// https://vitejs.dev/guide/build.html#library-mode
// https://vitejs.dev/config/#library


/*
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
})*/

let __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: UserConfig = {
    plugins: [
        svelte(),
        buildCesium(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
	//optimizeDeps: { include: ["@carbon/charts", "svelte-pdf"], exclude: ['@carbon/telemetry'] },
    /*build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'WManag',
            // the proper extensions will be added
            fileName: 'wmanag',
        }
    },*/

    css: {
        postcss
    },
    define: {
        global: 'window',
    },
};

export default config;

