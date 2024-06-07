import { sveltekit } from '@sveltejs/kit/vite'
import houdini from 'houdini/vite'
import path from 'path'
import circleDependency from 'vite-plugin-circular-dependency'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [houdini(), sveltekit(), circleDependency()],
}

export default config
