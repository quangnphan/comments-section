import React from "react";
import { useGlobalContext } from "./context";
import Comment from "./Comment"
const AllComments = () => {
  const {allComments} = useGlobalContext()
  return (
    <>
      {allComments.map((comment)=>{
        return(
          <Comment 
            key={comment.id}
            id={comment.id}
            image={comment.user.image.webp}
            username={comment.user.username}
            createdAt={comment.createdAt}
            content={comment.content}
            score={comment.score}
            replies={comment.replies}
          />
        )
      })}
    </>
  );
};

export default AllComments;
