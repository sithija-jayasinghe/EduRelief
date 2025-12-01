/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode via class strategy
    theme: {
        extend: {
            colors: {
                // Custom brand palette inspired by the images
                brand: {
                    900: '#064e3b', // Deep forest green
                    800: '#065f46',
                    700: '#047857',
                    600: '#059669',
                    500: '#10b981', // Primary action green
                    400: '#34d399',
                    100: '#d1fae5',
                    50: '#ecfdf5',
                },
                // We can extend Tailwind with our custom CSS variables if needed, 
                // or just rely on the utility classes and our global CSS.
                // Let's map our CSS variables to Tailwind colors for consistency
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    dark: 'var(--color-primary-dark)',
                    light: 'var(--color-primary-light)',
                },
                accent: 'var(--color-accent)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'slow-zoom': 'slowZoom 20s linear infinite alternate',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slowZoom: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                }
            }
        },
    },
    plugins: [],
}
