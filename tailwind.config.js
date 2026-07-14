/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        purple: {
          50: '#F8F7FB',
          100: '#F3F0F8',
          200: '#DDD7EC',
          300: '#C4BBDB',
          400: '#A89BC9',
          500: '#8B7BB5',
          600: '#7B6BA5',
          700: '#6B5B95',
          800: '#5A4D80',
          900: '#4A3F6B',
        },
        gold: {
          100: '#FDF6E9',
          200: '#FAEBC4',
          300: '#F5D99A',
          400: '#F0C675',
          500: '#E0B65A',
          600: '#C9A04D',
        },
        bw: {
          text: '#2D2A33',
          'text-secondary': '#6B6575',
          'text-muted': '#9B95A5',
          cream: '#FAF8F5',
          lavender: '#F3F0F8',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 3px rgba(43, 42, 51, 0.06)",
        sm: "0 4px 12px rgba(43, 42, 51, 0.08)",
        md: "0 8px 24px rgba(43, 42, 51, 0.10)",
        lg: "0 16px 48px rgba(43, 42, 51, 0.12)",
        gold: "0 4px 16px rgba(240, 198, 117, 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(240, 198, 117, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(240, 198, 117, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
