import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3b82f6', // blue-500
                secondary: '#10b981', // emerald-500
                dark: '#1f2937', // gray-800
            },
        },
    },
    plugins: [],
}
export default config 