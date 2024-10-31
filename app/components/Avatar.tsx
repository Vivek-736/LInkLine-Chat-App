"use client";
import { User } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import useActiveList from '../hooks/useActiveList';

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    const { members } = useActiveList();

    const isActive = user?.email ? members.indexOf(user.email) !== -1 : false;

    return (
        <div className='relative'>
            <div className='relative bg-black inline-block rounded-full border-blue-600 border overflow-hidden h-9 w-9 md:h-11 md:w-11'>
                <Image alt='Avatar' src={user?.image || '/images/user.png'} fill style={{ objectFit: 'cover' }} />
            </div>
            {isActive && (<span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3' />)}
        </div>
    );
}

export default Avatar;
