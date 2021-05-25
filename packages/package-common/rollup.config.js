import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

export default [
    {
        input: "src/fetchBifrost.ts",
        output: {
            file: "dist/fetchBifrost.min.js",
            format: "esm",
        },
        plugins: [typescript(), terser()]
    },
    {
        input: "src/wertgarantieShoppingCartRepository.ts",
        output: {
            file: "dist/wertgarantieShoppingCartRepository.min.js",
            format: "esm",
        },
        plugins: [typescript(), terser()]
    },
    {
        input: "src/offeredItemsRepository.ts",
        output: {
            file: "dist/offeredItemsRepository.min.js",
            format: "esm",
        },
        plugins: [typescript(), terser()]
    },
]