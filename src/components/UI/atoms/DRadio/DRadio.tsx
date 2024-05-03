import { forwardRef } from 'react'
import { Radio } from '@mantine/core'

import { type IRadioProps } from './resources'

const DRadio = forwardRef<HTMLDivElement, IRadioProps>(({ className = '', classNames, ...rest }) => {
    return (
        <Radio
            radius={5}
            classNames={{
                ...classNames,
                radio: `focus:outline-none checked:ring-2 ring-general-brand ring-offset-2 ${classNames?.radio ?? ''}`,
                icon: 'hidden',
            }}
            className={`${className}`}
            {...rest}
        />
    )
})

DRadio.displayName = 'DRadio'

export default DRadio
