const generateRandomArray = (count: number, min: number, max: number, rounded: boolean = true) => {
    return Array.from({ length: count }, () => {
        return rounded ? Math.round(Math.random() * (max - min) + min) : Math.random() * (max - min) + min
    })
}

export default generateRandomArray
