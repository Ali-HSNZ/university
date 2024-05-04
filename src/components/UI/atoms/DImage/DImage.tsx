import { type FC } from 'react'
import Image, { type ImageProps } from 'next/image'

const DImage: FC<ImageProps> = ({ src, alt, ...rest }) => {
    return <Image src={src} alt={alt} {...rest} />
}

export default DImage
