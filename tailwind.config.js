/** @type {import('tailwindcss').Config} */
export default {
    plugins: [],
    theme: {
        extend: {
            inset: {
             '-1': '-1rem',
            },
            keyframes: {
                blink: {
                    '0%, 50%, 100%': { opacity: 1 },
                    '25%, 75%': { opacity: 0 },
                },
            },
            animation: {
                'blink-1': 'blink 1s infinite',
                'blink-2': 'blink 2s infinite',
                'blink-3': 'blink 3s infinite',
                'blink-4': 'blink 4s infinite',
                'blink-5': 'blink 5s infinite',
            },
            colors: {
                'brand-bluegreen': '#ddefde',  // Aggiungi il tuo colore qui
            },
        },
    },
    content: ['./src/**/*.{html,js,svelte,ts}'],
    variants: {
        extend: {},
    },
    darkmode: false, // or 'media' or 'class'
}

