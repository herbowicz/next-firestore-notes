import styles from './Flowers.module.css'

const flowers = [
    {
        sign: '☘​',
        description: '​Shamrock',
        code: ''
    },
    {
        sign: '🌷',
        description: 'Tulip',
        code: ''
    },
    {
        sign: '🌼',
        description: 'Daisy Flower',
        code: ''
    },
    {
        sign: '🍀',
        description: 'Four Leaf Clover',
        code: ''
    },
    {
        sign: '🌺',
        description: 'Hibiscus',
        code: ''
    },
    {
        sign: '🌹',
        description: 'Rose',
        code: ''
    },
    {
        sign: '🌸',
        description: 'Cherry Blossom',
        code: ''
    },
    {
        sign: '🌻',
        description: 'Sunflower',
        code: ''
    },
    {
        sign: '💐',
        description: 'Bouquet',
        code: ''
    },
    {
        sign: '🏵️',
        description: 'Rosette',
        code: ''
    },
    {
        sign: '💮',
        description: 'White Flower',
        code: ''
    },
    {
        sign: '🥀',
        description: 'Wilted Flower',
        code: ''
    },
    {
        sign: '⚘',
        description: 'Flower',
        code: ''
    },
    {
        sign: '⚜',
        description: 'Fleur-De-Lis',
        code: ''
    },
    {
        sign: '❀',
        description: 'White Florette',
        code: ''
    },
    {
        sign: '✿',
        description: 'Black Florette',
        code: ''
    },
    {
        sign: '❁',
        description: 'Eight Petalled Outlined Black Florette',
        code: ''
    },
    {
        sign: '❃',
        description: 'Heavy Teardrop Spoked Pinwheel Asterisk',
        code: ''
    },
    {
        sign: '❊',
        description: 'Eight Teardrop Spoked Propeller Asterisk',
        code: ''
    },
    {
        sign: '❋',
        description: 'Heavy Eight Teardrop Spoked Propeller Asterisk',
        code: ''
    },
    {
        sign: '✾',
        description: 'Six Petalled Black And White Florette',
        code: ''
    },
    {
        sign: '✣',
        description: 'Four Balloon Spoked Asterisk',
        code: ''
    },
    {
        sign: '✤',
        description: 'Heavy Four Balloon Spoked Asterisk',
        code: ''
    },
    {
        sign: '✽',
        description: 'Heavy Teardrop Spoked Asterisk',
        code: ''
    },
    {
        sign: 'ꕤ',
        description: 'Vai Syllable Za',
        code: ''
    },
    {
        sign: 'ꕥ',
        description: 'Vai Syllable Zha',
        code: ''
    },
]

const Flowers = () => (
    <div style={styles.flowers}>
        {flowers.map((el, i) => {
            <div style={styles.flower}>
                <div style={styles.sign}>
                    {el.sign}
                </div>
                <div style={styles.description}>
                    {el.description}
                </div>
            </div>
        })}
    </div>
)

export default Flowers