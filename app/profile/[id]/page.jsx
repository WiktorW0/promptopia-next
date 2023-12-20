'use client'

import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import Profile from "@/components/Profile"
import { useSearchParams } from "next/navigation"


const UserProfilePage = ({params}) => {
  const [posts,setPosts]=useState([])
  const searchParams=useSearchParams()
  const name=searchParams.get('name')

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if(params?.id) fetchPosts()
  },[])

  return (
    <Profile
      name= {name}
      description={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={posts}
    />
  )
}

export default UserProfilePage