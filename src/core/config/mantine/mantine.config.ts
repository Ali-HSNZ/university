import { createTheme } from '@mantine/core'

const mantineTheme = createTheme({
    breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    colors: {
        blue: [
            '#DFEEFF', //0. badge background color
            '#b3ceff', //1.
            '#669cff', //2.
            '#337bff', //3.
            '#0051e6', //4. indicator background color
            '#2041B0', //5. badge text color
            '#002d80', //6.
            '#001b4d', //7.
            '#000919', //8.
            '#000919', //9.
        ],
        yellow: [
            '#FFF5DB', //0. badge background color
            '#ffe4b3', //1.
            '#ffd280', //2.
            '#ffc04d', //3.
            '#ffae19', //4. indicator background color
            '#cc8400', //5. badge text color
            '#996300', //6.
            '#805300', //7.
            '#4d3200', //8.
            '#191000', //9.
        ],
        red: [
            '#f6e6ec', //0. badge background color
            '#e5b3c5', //1.
            '#d4809e', //2.
            '#c24d77', //3.
            '#b11950', //4. indicator background color
            '#860031', //5. badge text color
            '#650025', //6.
            '#430018', //7.
            '#320012', //8.
            '#110006', //9.
        ],
    },
    primaryColor: 'blue',
    fontFamily: 'unset',
    primaryShade: { light: 5, dark: 5 },
})

export default mantineTheme
