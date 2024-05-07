import jsPDF from 'jspdf'

import { type TCriticalAny } from '@core/types/critical-any'

import 'jspdf-autotable'

import { type IExportToPDFProps } from './resources'

const exportToPDF = ({ headers, tableData, title }: IExportToPDFProps) => {
    const doc: TCriticalAny = new jsPDF({ putOnlyUsedFonts: true, format: 'a3' })

    const baseUrl =
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://front.bonyad360.dornicaapi.ir'

    // Add the font
    doc.addFont(`${baseUrl}/fonts/IRANYekanRegularFaNum.ttf`, 'iranYekanFont', 'normal')

    // Set the font for all text
    doc.setFont('iranYekanFont')

    const content = {
        dir: 'rtl',
        theme: 'grid',
        head: [headers],
        headStyles: {
            cellPadding: 4,
            fillColor: [0, 81, 230], // example header background color
            halign: 'right', // horizontal alignment: 'left', 'center', 'right', 'justify'
            valign: 'middle', // vertical alignment: 'top', 'middle', 'bottom'
        },
        bodyStyles: {
            cellPadding: 2.5,
            halign: 'right', // horizontal alignment: 'left', 'center', 'right', 'justify'
            valign: 'middle', // vertical alignment: 'top', 'middle', 'bottom'
        },
        body: tableData,
        styles: { font: 'iranYekanFont' },
    }
    doc.autoTable(content)
    doc.save(`${title || 'table'}.pdf`)
}

export default exportToPDF
