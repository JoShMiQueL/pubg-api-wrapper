const { execSync } = require("child_process");

const DIR = require("path").resolve("lib");

// Remove lib folder if exists
if (require("os").type() === "Windows_NT") {
  execSync(`if exist ${DIR} rd /s /q ${DIR}`);
} else {
  execSync(`rm -rf ${DIR}`);
}

// Build
require("esbuild").buildSync({
  entryPoints: ["src/index.ts"],
  outfile: "lib/index.js",
  bundle: true,
  minify: true,
  allowOverwrite: true,
  platform: "node",
  format: "cjs",
  external: Object.keys(require("./package.json").dependencies)
});

// Generate types
execSync("npx dts-bundle-generator ./src/index.ts -o ./lib/index.d.ts");
