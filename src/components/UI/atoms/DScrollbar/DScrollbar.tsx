import { type FC } from 'react'
import { ScrollAreaAutosize } from '@mantine/core'

import type { IScrollbarProps } from './resources'

const DScrollbar: FC<IScrollbarProps> = ({ maxHeight, children }) => {
    return (
        <ScrollAreaAutosize scrollbars='y' mah={maxHeight} scrollbarSize={8} type='always'>
            {children}
        </ScrollAreaAutosize>
    )
}

DScrollbar.displayName = 'DScrollbar'

export default DScrollbar
