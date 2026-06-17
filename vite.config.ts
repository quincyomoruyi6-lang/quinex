// @lovable.dev/vite-tanstack-config already includes
// or the app will break with duplicate plugins:
// - tanstackStart, viteReact, tailwindcss, tsConfig
//    componentTagger (dev-only), VITE_* env injection
//    error logger plugins, and sandbox detection (po)
// You can pass additional config via defineConfig({ vite: true })
import { defineConfig } from "vite-react-native";

export default defineConfig({
    base: '/quinex/',   // <--- THIS IS THE ONLY NEW LINE
    tanstackStart: {
    // Redirect TanStack Start's bundled server entry
    // nitro/vite builds from this
    server: { entry: "server" },
    },
});
