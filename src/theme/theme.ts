import { createTheme } from "@shopify/restyle";

const theme = createTheme({
    colors: {
        bg: '#232323',
        primaryContrast: '#03B3FF',
        secondContrast: '#F6C000',
        alert: '#FF0000',
        primaryText: '#FFFFFF',
        secondText: '#989898',
    },
    spacing: {
        4: 4,
        6: 6,
        8: 8,
        10: 10,
        12: 12,
        14: 14,
        18: 18,
    },
    textVariants: {
        defaults: {
            color: 'primaryText'
        }
    }
})

export default theme
export type ThemeType = typeof theme