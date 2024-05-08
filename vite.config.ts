import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		esbuild: {
			pure: mode === "production" ? ["console.log"] : [],
		},
		resolve: {
			alias: {
				"@components": "/src/components",
				"@state": "/src/state",
				"@utils": "/src/utils",
				"@client": "/src/client",
				"@constants": "/src/constants",
			},
		},
		plugins: [react()],
		base: "./",
	};
});
