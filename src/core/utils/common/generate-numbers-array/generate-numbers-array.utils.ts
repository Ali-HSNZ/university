const generateNumbersArray = (start: number, end: number) => {
    return Array(end - start + 1)
        .fill(end - start)
        .map((_, idx) => start + idx)
}
export default generateNumbersArray
