const generateDataClasses = ({ minNum, maxNum, colors }: { minNum: number; maxNum: number; colors: string[] }) => {
    const badData = [Infinity, -Infinity]
    if (badData.includes(maxNum))
        return [
            {
                name: `بدون مقدار`,
                to: 0,
                color: '#ccc',
            },
        ]

    const dataClasses = []
    const numOfClasses = 6
    const ranges: number[][] = []

    const range = (maxNum - minNum) / numOfClasses

    for (let i = 0; i < numOfClasses; i++) {
        const classMin = Math.round(minNum + i * range)
        const classMax = Math.round(minNum + (i + 1) * range)
        ranges.push([classMin, classMax])
    }

    if (maxNum - minNum <= 1) {
        dataClasses.push(
            {
                name: `بدون مقدار`,
                from: 0,
                to: 0,
                color: '#ccc',
            },
            {
                name: `کمتر از ${minNum}`,
                from: 1,
                to: minNum,
                color: colors[0],
            },
            {
                name: `بیشتر از ${minNum}`,
                from: minNum,
                color: colors[2],
            }
        )
        return dataClasses
    }

    if (maxNum - minNum === 2 || maxNum - minNum === 3) {
        dataClasses.push(
            {
                name: 'بدون مقدار',
                from: 0,
                to: 0,
                color: '#ccc',
            },
            {
                name: `کمتر از ${minNum + 1}`,
                from: 1,
                to: minNum === 0 ? 0 : minNum + 1,
                color: minNum === 0 ? '#ccc' : colors[0],
            },
            {
                name: `بیشتر از ${minNum + 1}`,
                from: minNum + 1,
                color: colors[2],
            }
        )
        return dataClasses
    }

    for (let i = 0; i < numOfClasses; i++) {
        const range = ranges[i]
        const color = colors[i]

        if (i === 0) {
            dataClasses.push(
                {
                    name: 'بدون مقدار',
                    from: 0,
                    to: 0,
                    color: '#ccc',
                },
                {
                    name: `کمتر از ${range[1]}`,
                    from: 1,
                    to: range[1],
                    color: color,
                }
            )
        } else if (i === numOfClasses - 1) {
            dataClasses.push({
                name: `بیشتر از ${range[0]}`,
                from: range[0],
                color: color,
            })
        } else {
            dataClasses.push({
                name: `از ${range[0]} تا ${ranges[i + 1][0]}`,
                from: range[0],
                to: ranges[i + 1][0],
                color: color,
            })
        }
    }

    return dataClasses
}
export default generateDataClasses
