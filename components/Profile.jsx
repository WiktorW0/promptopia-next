import PromptCard from "./PromptCard"


const Profile = ({name,description,data,handleEdit,handleDelete}) => {
  return (
    <section className="feed">
      <div>
        <h1 className="w-full head_text text-left max-sm:text-2xl">
          <span className="blue_gradient">
            {name} Profile
          </span>  
        </h1>
        <p className="desc text-left">
          {description}
        </p>
      </div>
      <div className="mt-16 prompt_layout">
        {data.map(post=>{
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={()=>handleEdit&& handleEdit(post)}
              handleDelete={()=>handleDelete&& handleDelete(post)}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Profile