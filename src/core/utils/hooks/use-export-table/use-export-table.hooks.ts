import xlsx from 'json-as-xlsx'

import { type TCriticalAny } from '@core/types/critical-any'

const useExportTable = () => {
    const onDownloadExcel = ({ data, name }: { data: Record<string, unknown>[] | undefined; name: string }) => {
        if (data && data?.length > 0) {
            const headers: string[] = Object.keys(data[0]).reverse()
            const headersTitle = headers.concat(['ردیف'])
            const convertedData = [
                {
                    sheet: 'table',
                    columns: headers
                        .map((value, index: number) => ({
                            value,
                            label: headersTitle[index],
                        }))
                        .concat({
                            label: 'ردیف',
                            value: 'index',
                        }),
                    content: data.map((item, index: number) => {
                        const content: {
                            [key: string]: TCriticalAny
                        } = { index: index + 1 }
                        headers.map((value) => {
                            //check if there is value in item
                            if (value in item) content[value] = item[value as keyof typeof item]
                        })
                        return content
                    }),
                },
            ]
            xlsx(convertedData, {
                fileName: name,
            })
        }
    }
    return { onDownloadExcel }
}

export default useExportTable
