const convertToEnglishNumbers = (inputString: string): string => {
    const persianNumbers: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return inputString.replace(/[۰-۹]/g, (match: string) => {
        return String(persianNumbers.indexOf(match))
    })
}

export default convertToEnglishNumbers
