"use client";
import { User } from '@prisma/client';
import React from 'react';
import Image from 'next/image';

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {

    return (
        <div className='relative'>
            <div className='relative bg-black inline-block rounded-full border-blue-600 border overflow-hidden h-9 w-9 md:h-11 md:w-11'>
                <Image alt='Avatar' src={user?.image || '/images/user.png'} fill style={{ objectFit: 'cover' }} />
            </div>
        </div>
    );
}

export default Avatar;
