import { type FC, useEffect, useState } from 'react'
import { Checkbox, Combobox, Group, ScrollArea, useCombobox } from '@mantine/core'
import { KeyboardArrowDown } from '@mui/icons-material'
import { IconLoader2, IconSearch } from '@tabler/icons-react'

import type { IDMultiSelectProps, TMultiSelectValueType } from './resources'

const DMultiSelect: FC<IDMultiSelectProps> = ({
    isLoading,
    data = [],
    defaultValues = [],
    placeholder = 'انتخاب کنید',
    defaultWidth = false,
    onChange,
    getAllSelectedList,
}) => {
    const [search, setSearch] = useState('')

    const [selectedValues, setSelectedValue] = useState<TMultiSelectValueType[]>(defaultValues)

    useEffect(() => {
        if (!isLoading && defaultValues.length > 0) {
            setSelectedValue(defaultValues)
        }
    }, [defaultValues, isLoading])

    const customDefaultWidth = defaultWidth ? '' : 'w-full sm:w-64'

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption()
            combobox.focusTarget()
            setSearch('')
        },
    })

    const handleValueSelect = (value: string | { label: string; value: string }) => {
        const valueTitle = typeof value === 'string' ? value : value.label
        const valueKey = typeof value === 'string' ? value : value.value

        // onChange event ==>
        if (onChange) onChange(valueKey)

        setSelectedValue((current) => {
            // convert all data to string[]
            const allItems: string[] = current.map((currentValue) =>
                typeof currentValue === 'string' ? currentValue : currentValue.label
            )
            // check exist value in state --> and finally setState or remove item from state

            const list = allItems.includes(valueTitle)
                ? current.filter(
                      (currentValue) =>
                          (typeof currentValue === 'string' ? currentValue : currentValue.label) !== valueTitle
                  )
                : [...current, value]

            if (getAllSelectedList) getAllSelectedList(list)

            return list
        })
    }

    const selectAllHandler = () => {
        setSelectedValue(selectedValues.length === data.length ? [] : data)
    }

    const renderValues = () => {
        if (isLoading) {
            return <p className='text-typography-200'>در حال دریافت اطلاعات</p>
        }
        if (selectedValues.length > 0) {
            return (
                <>
                    {selectedValues.length > 3 && selectedValues.length < data.length ? (
                        <p className='whitespace-nowrap text-typography px-2 rounded py-1 bg-[#f1f3f5] text-sm'>
                            {selectedValues.length} انتخاب شده
                        </p>
                    ) : selectedValues.length === data.length ? (
                        <p className='whitespace-nowrap text-typography px-2 rounded py-1 bg-[#f1f3f5] text-sm'>
                            همه ({selectedValues.length})
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
                                {selectedValues.map((item, index) => (
                                    <p key={index} className='px-2 bg-[#f1f3f5] py-1 text-sm rounded select-none'>
                                        {/* label */}
                                        {typeof item === 'string' ? item : item.label}
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

    const renderOptions = data
        .filter((item) =>
            (typeof item === 'string' ? item : item.label)?.toLowerCase().includes(search.toLowerCase().trim())
        )
        .map((item, index) => {
            const itemTitle = typeof item === 'string' ? item : item.label

            const selectedValuesTitle = selectedValues.map((e) => (typeof e === 'string' ? e : e.label))
            return (
                <Combobox.Option value={itemTitle} key={itemTitle + index} className='hover:bg-general-brandBackground'>
                    <Group gap='xs' className='py-2'>
                        <Checkbox
                            color='#165dff'
                            checked={selectedValuesTitle.includes(itemTitle)}
                            aria-hidden
                            size='xs'
                            tabIndex={-1}
                            onChange={() => {}}
                            style={{ pointerEvents: 'none' }}
                        />
                        <span>{itemTitle}</span>
                    </Group>
                </Combobox.Option>
            )
        })

    const onOptionSubmit = (value: string) => {
        const item = data.find(
            (currentItem) => (typeof currentItem === 'string' ? currentItem : currentItem.label) === value
        )
        if (item) {
            handleValueSelect(item)
        }
    }

    return (
        <Combobox classNames={{ search: 'py-5' }} store={combobox} withinPortal={true} onOptionSubmit={onOptionSubmit}>
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
                    value={search}
                    leftSection={<IconSearch className='shrink-0' size={20} />}
                    leftSectionProps={{ className: '-right-[3px]' }}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder='جستجو...'
                />
                <Combobox.Options className='max-h-[250px] overflow-y-auto'>
                    {renderOptions.length > 0 ? (
                        <>
                            {search.trim() === '' && (
                                <button
                                    onClick={selectAllHandler}
                                    className='w-full text-right rounded-sm bg-white block hover:bg-general-brandBackground   text-sm px-2 py-[14.5px] cursor-pointer'
                                >
                                    {selectedValues.length === data.length ? 'لغو همه' : 'انتخاب همه'}
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

export default DMultiSelect
