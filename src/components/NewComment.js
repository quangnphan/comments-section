import React,{useRef} from "react";
import data from "../data.json"
import { useGlobalContext } from "./context";

const NewComment = () => {
    const {addNewComment} = useGlobalContext()
    const commentRef = useRef();
    const addComment = (e) => {
        e.preventDefault();
        const enteredComment = commentRef.current.value;
        addNewComment(enteredComment)
        commentRef.current.value = "";
    }
    return(
        <section className="new-comment-wrapper">
            <form onSubmit={addComment}>
                <img className="user-image" src={data.currentUser.image.webp} alt="user"></img>
                <label htmlFor="comment"></label>
                <textarea
                    id="comment"
                    type="text"
                    placeholder="Add a comment..."
                    rows="5"
                    ref={commentRef}
                ></textarea>
                <button type="submit" className="send">
                    send
                </button>
            </form>
        </section>
    )
}
export default NewComment