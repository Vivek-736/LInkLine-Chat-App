"use client"
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

interface MobileItemProps {
    href: string;
    icon: React.ElementType;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
    return (
        <Link href={href} onClick={onClick} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-200`, active && "bg-gray-200 text-black")}>
            <Icon className="w-6 h-6" />
        </Link>
    )
}

export default MobileItem
