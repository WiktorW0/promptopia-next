'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import Loading from "@/app/loading"

export const dynamic ='force-dynamic'

const PromptCardList=({data, handleTagClick})=>{
  return (
    <div
      className="mt-16 prompt_layout"
    >
      {data.map(post=>{
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout]=useState(null)
  const [foundResults, setFoundResults]=useState(null)
  const [posts, setPosts] = useState(null)


  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  },[])

  const filterResults=(searchTxt)=>{
    const searchRegex= new RegExp(searchTxt,'i')
    return posts.filter(post=>{
      return searchRegex.test(post.creator.username) || searchRegex.test(post.prompt) || searchRegex.test(post.tag)
    })
  }
  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterResults(e.target.value)
        setFoundResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick=(tag)=>{
    setSearchText(tag)
    const searchResult =filterResults(tag)
    setFoundResults(searchResult)
  }
  if(!posts) return <Loading/>
  return (
    <section className="feed">
      <form className="relative w-full flex-center" >
        <input 
          type="text"
          placeholder="Search for prompt, tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer" 
        />
      </form>
      {foundResults? (
        <PromptCardList
        data={foundResults}
        handleTagClick={handleTagClick}
      />
      ):(
        <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed