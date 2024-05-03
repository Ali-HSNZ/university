import { type FC, type SyntheticEvent } from 'react'
import Image, { type ImageProps } from 'next/image'

const DImage: FC<ImageProps> = ({ src, alt, ...rest }) => {
    const onErrorHandler = (error: SyntheticEvent<HTMLImageElement, Event>) =>
        (error.currentTarget.src = '/images/common/broken-image.png')

    return <Image src={src} alt={alt} onError={onErrorHandler} {...rest} />
}

export default DImage
