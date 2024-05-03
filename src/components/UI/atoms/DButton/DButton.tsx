import { forwardRef } from 'react'
import { Button, type ButtonProps, createPolymorphicComponent } from '@mantine/core'

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, children, ...res }, ref) => {
    return (
        <Button ref={ref} variant={variant} {...res}>
            {children}
        </Button>
    )
})

CustomButton.displayName = 'Button'
const DButton = createPolymorphicComponent<'button', ButtonProps>(CustomButton)

export default DButton
