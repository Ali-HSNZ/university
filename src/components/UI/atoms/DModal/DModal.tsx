import { type FC } from 'react'
import { Modal, type ModalProps } from '@mantine/core'

const DModal: FC<ModalProps> = ({ children, className, classNames, ...res }) => {
    return (
        <Modal className={`${className}`} classNames={classNames} {...res}>
            {children}
        </Modal>
    )
}

export default DModal
