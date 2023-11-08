import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "utility-functions",
      fileName: "main",
    },
    rollupOptions: {},
  },
  plugins: [
    dts({
      include: ["lib"],
      rollupTypes: true,
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("lib", ""),
        content,
      }),
    }),
  ],
});
