"use client"
import LoginCard from '@repo/ui/LoginCard'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <div>
    <LoginCard />
    </div>
  )
}

export default page
