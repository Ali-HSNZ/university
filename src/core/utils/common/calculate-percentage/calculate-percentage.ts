type PercentageChange = {
    percentage: number
    trend: 'up' | 'down' | 'same'
}

const calculatePercentage = (prev: number, current: number): PercentageChange => {
    // Calculate the difference between this year's and last year's values
    const difference = current - prev

    // Calculate the percentage change and round it to the nearest integer
    const percentage = prev === 0 && current !== 0 ? 100 : Math.round((difference / prev) * 100)

    // Determine the trend
    let trend: 'up' | 'down' | 'same'

    if (percentage > 0) {
        trend = 'up'
    } else if (percentage < 0) {
        trend = 'down'
    } else {
        trend = 'same'
    }

    return {
        percentage,
        trend,
    }
}

export default calculatePercentage
