import { type TCriticalAny } from '@core/types/critical-any'

const reverseArrayHandler = (data?: TCriticalAny[]): TCriticalAny[] | undefined => {
    //check if there is data
    if (!data) return undefined

    //start reverse array
    const reversedData: TCriticalAny[] = []
    data.forEach((element) => {
        reversedData.unshift(element)
    })
    return reversedData
}

export default reverseArrayHandler
