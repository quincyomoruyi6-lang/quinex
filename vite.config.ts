// @lovable.dev/vite-tanstack-config already includes
// or the app will break with duplicate plugins:
// - tanstackStart, viteReact, tailwindcss, tsConfig
//    componentTagger (dev-only), VITE_* env injection
//    error logger plugins, and sandbox detection (po)
// You can pass additional config via defineConfig({ vite: true })
import { defineConfig } from '@lovable.dev/vite-tanstack-config';

export default defineConfig({
    base: '/quinex/',
    tanstackStart: {
        server: { entry: "server" },
    },
});
