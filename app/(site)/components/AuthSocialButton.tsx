import React from 'react'
import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick
}) => {
  return (
    <button type='button' onClick={onClick} className='inline-flex w-full justify-center rounded-md bg-gradient-to-b from-blue-200 to-violet-200 px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-700 hover:ring-gray-300 hover:bg-gradient-to-b hover:from-blue-100 hover:to-violet-100 focus:outline-offset-0' title='Social Button'>
      <Icon/>
    </button>
  )
}

export default AuthSocialButton
