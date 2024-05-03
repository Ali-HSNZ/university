import type TConvertDataForSelectBoxDefaultTypes from './convert-data-for-selectBox.types'

const convertDataForSelectBox = (data: TConvertDataForSelectBoxDefaultTypes) => {
    if (data) {
        return data.map((item) => ({
            is_default: item.is_default,
            value: item.id.toString(),
            label: item.name,
        }))
    }

    return []
}

export default convertDataForSelectBox
