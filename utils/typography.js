import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';

const options = {
    baseFontSize: '14px',
    bodyFontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
    ],
    scaleRatio: 1.618,
    plugins: [
        new CodePlugin(),
    ]
};

const typography = new Typography(options);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
    typography.injectStyles()
}

export default typography;
