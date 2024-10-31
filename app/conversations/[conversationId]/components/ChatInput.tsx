import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface ChatInputProps {
  register: UseFormRegister<FieldValues>;
  id: string;
  required?: boolean;
  type?: string;
  errors: FieldErrors;
  placeholder: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  register,
  id,
  required,
  type,
  placeholder
}) => {
  return (
    <div className='relative w-full'>
      <input className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none border-sky-500 border' type={type} id={id} autoComplete="off" placeholder={placeholder} {...register(id, {required})} />
    </div>
  )
}

export default ChatInput
