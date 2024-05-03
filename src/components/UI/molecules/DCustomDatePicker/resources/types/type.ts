type THandleToolDateProps = (type: string, setFunction: (arg: Date) => void) => void
type TRenderValueProps = (arg: string | string[]) => string
type TValidateDateProps = (end: number, type: 'start' | 'end') => boolean
interface IToolsProps {
    position: string
    type: 'start' | 'end'
    setFunction: (date: Date) => void
}

export type { THandleToolDateProps, TRenderValueProps, TValidateDateProps, IToolsProps }
