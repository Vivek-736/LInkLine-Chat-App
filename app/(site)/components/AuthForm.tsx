/* eslint-disable @next/next/no-img-element */
"use client"
import Input from '@/app/components/inputs/input'
import React, { useEffect } from 'react'
import { useState, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '@/app/components/Button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      setTimeout(() => router.push("/users"), 100);
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Error Occured!'))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully");
            setTimeout(() => router.push("/users"), 100);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error("Something went wrong!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
          setTimeout(() => router.push("/users"), 100);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id='name' errors={errors} label='Name' register={register} disabled={loading} />
          )}
          <Input id='email' type='email' errors={errors} label='Email' register={register} disabled={loading} />
          <Input id='password' type='password' errors={errors} label='Password' register={register} disabled={loading} />

          <div>
            <Button disabled={loading} fullWidth type='submit'>
              {variant === "LOGIN" ? "LogIn" : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Alternatively, Continue With
              </span>
            </div>
          </div>

          <div className='mt-6 flex gap-2 justify-center'>
            <AuthSocialButton
              icon={() => <BsGithub size={24} color="#000" />}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={() => <img src="/google.png" alt="Google" style={{ width: 24, height: 24 }} />}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>

        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === "LOGIN" ? "New to LinkLine?" : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className='cursor-pointer underline text-blue-500'>
            {variant === "LOGIN" ? "Create an account" : "LogIn"}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
