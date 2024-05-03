import React, { type FC } from 'react'
import { Indicator } from '@mantine/core'

import { type IDIndicatorProps } from './resources'

const DIndicator: FC<IDIndicatorProps> = ({ children, ...rest }) => {
    return <Indicator {...rest}>{children}</Indicator>
}

export default DIndicator
