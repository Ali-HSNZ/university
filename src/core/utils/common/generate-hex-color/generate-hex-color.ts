function generateHexColor(numColors: number, colors: string[]) {
    if (numColors === 1) return [colors[1]]
    // Parse the hex colors into RGB format
    const rgb1 = hexToRgb(colors[0])
    const rgb2 = hexToRgb(colors[1])

    const colorPalette = []

    for (let i = 0; i < numColors; i++) {
        const factor = i / (numColors - 1)
        const interpolatedColor = interpolateColor(rgb1, rgb2, factor)
        colorPalette.push(rgbToHex(interpolatedColor))
    }

    return colorPalette
}

// Helper function to interpolate between two colors
function interpolateColor(color1: number[], color2: number[], factor: number) {
    const result = []
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(color1[i] + factor * (color2[i] - color1[i]))
    }
    return result
}

// Helper function to convert hex color to RGB format
function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16)
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

// Helper function to convert RGB color to hex format
function rgbToHex(rgb: number[]) {
    return (
        '#' +
        rgb
            .map((value) => {
                const hex = value.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            })
            .join('')
    )
}

export default generateHexColor
