const generateTableBody = (cellHeader: string, cellBody: string | number): string | number => {
    if (!cellHeader.includes('سال') && typeof cellBody === 'number') {
        //this value is number and is not data of year
        return cellBody.toLocaleString()
    }

    //return dash if there wasn't any value to show
    if (!cellBody) return '-'

    return cellBody
}

export default generateTableBody
