"use client"

import { Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import React from 'react'

type Props = {
    text:string
}

const SignInButton = ({text}: Props) => {
  return (
    <Button color='success'
    onClick={()=> {
        signIn('google').catch(console.error)
    }}
    >
        {text}
    </Button>
  )
}

export default SignInButton