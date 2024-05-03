import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Checkbox, Combobox, Group, ScrollArea, useCombobox } from '@mantine/core'
import { KeyboardArrowDown } from '@mui/icons-material'
import { IconLoader2, IconSearch } from '@tabler/icons-react'

import type { IDComboBoxProps } from './resources'

const DComboBox = ({
    isLoading,
    data = [],
    placeholder = 'انتخاب کنید',
    defaultWidth = false,
    fieldValue,
    onFieldChange,
}: IDComboBoxProps) => {
    const totalList = useMemo(() => data, [data])
    const totalListValues = useMemo(() => totalList.map((item) => item.value), [totalList])

    const [searchValue, setSearchValue] = useState('')
    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption()
            combobox.focusTarget()
            setSearchValue('')
        },
        onDropdownOpen: () => {
            combobox.focusSearchInput()
        },
    })

    const customDefaultWidth = defaultWidth ? '' : 'w-full sm:w-56'

    // if multi select fieldValue length got to more than 100
    const isMoreThan100 = fieldValue.length === 100
    const onOptionClickHandler = (value: string) => {
        let updatedData = []
        if (fieldValue.includes(value)) {
            updatedData = fieldValue.filter((eachValue) => eachValue !== value)
            onFieldChange(updatedData)
        } else {
            if (!isMoreThan100) {
                updatedData = [...fieldValue, value]
                onFieldChange(updatedData)
            } else {
                toast.warning('امکان انتخاب بیشتر از 100 گزینه وجود ندارد', { toastId: 'max-limit' })
            }
        }
    }

    const isAllOptionsSelected =
        fieldValue.length === 100 || totalListValues.length === fieldValue.length ? true : false
    const toggleTotalSelectionHandler = () => {
        onFieldChange(
            isAllOptionsSelected ? [] : totalListValues.length >= 100 ? totalListValues.slice(0, 100) : totalListValues
        )
        if (totalListValues.length >= 100 && !isAllOptionsSelected) {
            toast.warning('امکان انتخاب بیشتر از 100 گزینه وجود ندارد')
        }
    }

    const renderValues = () => {
        if (isLoading) {
            return <p className='text-typography-200'>در حال دریافت اطلاعات</p>
        }
        if (fieldValue.length > 0) {
            return (
                <>
                    {fieldValue.length > 3 && fieldValue.length < totalList.length ? (
                        <p className='whitespace-nowrap text-typography px-2 rounded py-1 bg-[#f1f3f5] text-sm'>
                            {fieldValue.length} انتخاب شده
                        </p>
                    ) : fieldValue.length === totalList.length ? (
                        <p className='whitespace-nowrap text-typography px-2 rounded py-1 bg-[#f1f3f5] text-sm'>
                            همه ({fieldValue.length})
                        </p>
                    ) : (
                        <ScrollArea
                            scrollHideDelay={0}
                            scrollbarSize={6}
                            scrollbars='x'
                            type='auto'
                            offsetScrollbars={false}
                        >
                            <div className='flex whitespace-nowrap text-typography gap-2 pb-1 multi-select-pillsList'>
                                {fieldValue.map((selectedValue) => (
                                    <p
                                        key={selectedValue}
                                        className='px-2 bg-[#f1f3f5] py-1 text-sm rounded select-none'
                                    >
                                        {totalList.find((item) => item.value === selectedValue)?.label}
                                    </p>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </>
            )
        }
        return <p className='text-typography-200'>{placeholder}</p>
    }

    const renderOptions = useMemo(
        () =>
            totalList
                .filter((item) => item.label?.toLowerCase().includes(searchValue.toLowerCase().trim()))
                .map((item) => {
                    return (
                        <Combobox.Option
                            value={item.value}
                            key={item.value}
                            className='hover:bg-general-brandBackground'
                        >
                            <Group gap='xs' className='py-2 flex-nowrap'>
                                <Checkbox
                                    color='#165dff'
                                    checked={fieldValue.includes(item.value)}
                                    aria-hidden
                                    size='xs'
                                    tabIndex={-1}
                                    style={{ pointerEvents: 'none' }}
                                    readOnly
                                />
                                <span>{item.label}</span>
                            </Group>
                        </Combobox.Option>
                    )
                }),
        [fieldValue, searchValue, totalList]
    )

    return (
        <Combobox
            classNames={{ search: 'py-5' }}
            store={combobox}
            withinPortal={true}
            onOptionSubmit={onOptionClickHandler}
        >
            <Combobox.Target>
                <div
                    onClick={() => combobox.toggleDropdown()}
                    className={`${customDefaultWidth}  flex-nowrap flex justify-between items-center py-1 pl-[5px] pr-1.5 h-[42px] border border-typography-350 rounded-lg text-xs sm:text-sm text-typography-350 `}
                >
                    {renderValues()}
                    {isLoading ? (
                        <IconLoader2 className='text-typography animate-spin' />
                    ) : (
                        <KeyboardArrowDown className='text-typography' />
                    )}
                </div>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={searchValue}
                    leftSection={<IconSearch className='shrink-0' size={20} />}
                    leftSectionProps={{ className: '-right-[3px]' }}
                    onChange={(event) => setSearchValue(event.currentTarget.value)}
                    placeholder='جستجو...'
                />
                <Combobox.Options className='max-h-[250px] overflow-y-auto'>
                    {renderOptions.length > 0 ? (
                        <>
                            {searchValue.trim() === '' && (
                                <button
                                    onClick={toggleTotalSelectionHandler}
                                    className='w-full text-right rounded-sm bg-white block hover:bg-general-brandBackground   text-sm px-2 py-[14.5px] cursor-pointer'
                                >
                                    {isAllOptionsSelected ? 'لغو همه موارد' : 'انتخاب همه موارد'}
                                </button>
                            )}
                            {renderOptions}
                        </>
                    ) : (
                        <p className='w-full text-sm p-2 text-typography'>موردی یافت نشد</p>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}

export default DComboBox
