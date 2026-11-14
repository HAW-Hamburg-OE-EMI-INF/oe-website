import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sharedSrcDir = fs.realpathSync(path.dirname(fileURLToPath(import.meta.url)));

/**
 * Watches the real `@oe/shared/src` directory in Vite's dev server so edits to
 * shared files trigger HMR without going through `node_modules`.
 */
function watchSharedWorkspacePlugin() {
  return {
    name: "watch-shared-workspace",
    configureServer(server: { watcher: { add: (paths: string) => void } }) {
      server.watcher.add(sharedSrcDir);
    },
  };
}

/**
 * Shared Vite configuration for Astro workspace apps consuming `@oe/shared`.
 */
export const sharedWorkspaceViteConfig = {
  plugins: [watchSharedWorkspacePlugin()],
  resolve: {
    alias: [
      {
        find: /^@oe\/shared\/types$/,
        replacement: path.join(sharedSrcDir, "types/types.ts"),
      },
      {
        find: /^@oe\/shared\/(.*)$/,
        replacement: `${sharedSrcDir}/$1`,
      },
    ],
  },
  optimizeDeps: {
    exclude: ["@oe/shared"],
  },
  ssr: {
    noExternal: ["@oe/shared"],
  },
};
