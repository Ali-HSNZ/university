import { type ImageLoaderProps } from 'next/image'

const nextImageLoader = (p: ImageLoaderProps) => {
    return `${p.src}?w=${p.width}&q=${p.quality || 75}`
}

export default nextImageLoader
