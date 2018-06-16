import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import includePaths from "rollup-plugin-includepaths";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  // All the used libs needs to be here
  external: ["prop-types", "lodash.isfunction"],
  plugins: [
    includePaths({
      include: {},
      external: [],
      extensions: [".js", ".jsx"]
    }),
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
