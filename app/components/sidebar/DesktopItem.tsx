"use client"
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

interface DesktopItemProps {
    href: string;
    label: string;
    icon: React.ElementType;
    active?: boolean;
    onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, href, icon: Icon, active, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    return (
        <li onClick={handleClick}>
            <Link href={href} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-200`, active && "bg-gray-200 text-black")}>
            <Icon className="w-6 h-6 shrink-0"/>
                <span className='sr-only'>{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem
