export const BLOCKTYPES = [
    { label: 'UL', style: 'unordered-list-item'},
    { label: 'OL', style: 'ordered-list-item'},
    { label: 'QUOTE', style: 'blockquote' }
];

export const FONTTYPES = [
    { label: 'Normal Text', style: 'unstyled' },
    { label: 'Title', style: 'header-two' },
    { label: 'Large Text', style: 'header-three' }, 
    { label: 'Medium Text', style: 'header-four' },
    { label: 'Small Text', style: 'header-five' },
];

export const INLINETYPES = [
    { label: 'B', style: 'BOLD' },
    { label: 'I', style: 'ITALIC' },
    { label: 'U', style: 'UNDERLINE' },
    // { label: 'Monospace', style: 'CODE' },
];

export const CODE_HIGHLIGHTERS = [
    {label: 'JS', style: 'codeBlockJS'},
    {label: 'PHP', style: 'codeBlockPHP'},
    {label: 'CSS', style: 'codeBlockCSS'},
    {label: 'HTML', style: 'codeBlockHTML'}
];

export const colorStyleMap = {
    'RED': {
        color: '#e53f25'
    },
    'BLUE': {
        color: '#4fa6ff'
    },
    'GREEN': {
        color: '#55e530'
    },
    'YELLOW': {
        color: '#ffcd29'
    },
    'PURPLE': {
        color: '#b635ff'
    },
    'WHITE': {
        color: 'white'
    },
    'BLACK': {
        color: 'black'
    }
}; 

export const HighlighterStyleMap = {
    'RED_BG': {
        backgroundColor: '#e53f25'
    },
    'BLUE_BG': {
        backgroundColor: '#4fa6ff'
    },
    'GREEN_BG': {
        backgroundColor: '#55e530'
    },
    'YELLOW_BG': {
        backgroundColor: '#ffcd29'
    },
    'PURPLE_BG': {
        backgroundColor: '#b635ff'
    },
    'WHITE_BG': {
        backgroundColor: 'white'
    },
    'WHITE_BLACK': {
        backgroundColor: 'black'
    }
};