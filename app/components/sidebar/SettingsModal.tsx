"use client";

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../Modal';
import Input from '../inputs/input';
import Image from 'next/image';
import Button from '../Button';
import toast from 'react-hot-toast';
import { CldUploadButton } from 'next-cloudinary';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image || '/images/user.png'
    }
  });

  const image = watch('image')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
    console.log(result.secure_url);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong", error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-6'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-blue-500'>
              Edit Your Public Information
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input disabled={isLoading} label='Name' id='name' errors={errors} required register={register} />
              <div>
                <label className='block text-center text-sm font-medium leading-6 text-gray-900'>
                  Photo
                </label>
                <div className='mt-2 flex flex-col items-center justify-center gap-x-3 gap-y-3'>
                  <Image
                    width="100"
                    height="100"
                    className='rounded-full object-contain border-2 border-gray-300 shadow-lg bg-black'
                    src={image || currentUser?.image || "/images/user.png"}
                    alt='Avatar'
                  />
                  <CldUploadButton options={{ maxFiles: 1 }} onSuccess={handleUpload} uploadPreset='nldjmux0'>
                    <Button disabled={isLoading} secondary type='button'>
                      Change ProfilePic
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex justify-end gap-x-4'>
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type='submit'>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
