import { createTheme } from '@shopify/restyle'

const palette = {
    primaryDark: '#14274e',
    primary: '#394867',
    primaryLight: '#9ba4b4',

    gray: '#ccc',

    black: '#0B0B0B',
    white: '#f1f6f9',
};


const theme = createTheme({
    colors: {
        mainBackground: palette.white,
        sendButtonActive: palette.primary,
        sendButtonInactive: palette.primaryLight,
        logo: palette.primary,
        inputText: palette.primaryDark,
        inputTextSelection: palette.primaryLight,
        borderColor: palette.gray,
        titleText: palette.black,
        white: 'white',
        buttonPrimary: palette.primary
    },
    spacing: {
        s: 5,
        m: 10,
        l: 15,
        xl: 25,
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        logo: {
            fontWeight: 'bold',
            fontSize: 34,
            color: 'logo',
        },
        heading: {
            fontSize: 22,
            fontWeight: 'bold',
            color: 'titleText'
        }
    },
});

export type Theme = typeof theme;
export default theme;