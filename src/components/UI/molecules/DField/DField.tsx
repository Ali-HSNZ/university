import { type FC } from 'react'
import { ErrorMessage } from '@hookform/error-message'

import { type IDFieldProps } from './resources'

const DField: FC<IDFieldProps> = ({ children, fieldName, fieldError, containerClassName = '' }) => {
    return (
        <div className={`w-full items-start  ${containerClassName}`}>
            {children}
            {fieldError && (
                <div className='min-h-[24px] flex items-center justify-start'>
                    <ErrorMessage
                        name={fieldName}
                        errors={fieldError}
                        render={({ message }) => (
                            <p className='block text-red-600 text-xs font-semibold text-danger-500 py-1'>{message}</p>
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default DField
