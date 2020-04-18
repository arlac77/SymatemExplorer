import consts from "rollup-plugin-consts";

import dev from "rollup-plugin-dev";

import terser from "rollup-plugin-terser";
import postcssImport from "postcss-import";

import postcss from "rollup-plugin-postcss";

import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";

import resolve from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";