"use client"

import React from 'react'
import ReactSelect from 'react-select'

interface SelectProps {
    label: string;
    value?: Record<string, unknown>;
    options: Record<string, unknown>[];
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (newValue: unknown, actionMeta: any) => void;
}

const Select: React.FC<SelectProps> = ({
    label,
    value,
    options,
    disabled,
    onChange
}) => {
  return (
    <div className='z-[100]'>
        <label className='block text-sm font-medium leading-6 text-gray-900'>
            {label}
        </label>
        <div className='mt-2'>
            <ReactSelect
                options={options}
                value={value}
                onChange={(newValue, actionMeta) => onChange && onChange(newValue, actionMeta)}
                isDisabled={disabled}
                isMulti
                menuPortalTarget={document.body}
                styles={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
                }}
                classNames={{
                    control:() => "text-sm"
                }}
            />
        </div>
    </div>
  )
}

export default Select
