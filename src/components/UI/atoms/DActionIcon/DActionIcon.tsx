import { forwardRef } from 'react'
import { ActionIcon, type ActionIconProps, createPolymorphicComponent } from '@mantine/core'

const CustomActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(({ children, className = '', ...res }, ref) => {
    return (
        <ActionIcon size={'auto'} className={`${className}`} {...res} ref={ref}>
            {children}
        </ActionIcon>
    )
})

CustomActionIcon.displayName = 'ActionIcon'

const DActionIcon = createPolymorphicComponent<'button', ActionIconProps>(CustomActionIcon)

export default DActionIcon
