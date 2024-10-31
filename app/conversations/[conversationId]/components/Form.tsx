"use client";
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import React from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import ChatInput from './ChatInput';
import { CldUploadButton } from 'next-cloudinary';

const Form = () => {
    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });

        axios.post("/api/messages", {
            ...data,
            conversationId
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpload = async (result: any) => {
        try {
            await axios.post("/api/messages", {
                image: result?.info?.secure_url,
                conversationId
            });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
            <CldUploadButton options={{ maxFiles: 1, resourceType: "image", maxFileSize: 9999999999 }} onSuccess={handleUpload} uploadPreset='nldjmux0'>
                <HiPhoto size={30} className='text-sky-500 cursor-pointer' />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
                <ChatInput register={register} id="message" required errors={errors} placeholder="Start typing to dodge me" />
                <button type='submit' className='rounded-full p-3 bg-sky-500 hover:bg-sky-700 cursor-pointer transition'>
                    <HiPaperAirplane size={18} className='text-white' />
                </button>
            </form>
        </div>
    )
}

export default Form
