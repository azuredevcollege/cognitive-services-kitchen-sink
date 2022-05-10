import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : "/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "microsoft-cognitiveservices-speech-sdk",
        replacement: require.resolve(
          "microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js"
        ),
      },
    ],
  },
});
