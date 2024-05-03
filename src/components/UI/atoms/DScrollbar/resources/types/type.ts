import { type ReactNode } from 'react'
import { type ScrollAreaAutosizeProps } from '@mantine/core'

interface IScrollbarProps extends ScrollAreaAutosizeProps {
    maxHeight?: number
    children: ReactNode
}

export default IScrollbarProps
