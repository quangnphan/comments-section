import { useState, useRef } from "react";
import data from "../data.json";
import { useGlobalContext } from "./context";
import Replies from "./Replies";
const Comment = (props) => {
  const { deleteComment, addNewReply, editComment } = useGlobalContext();
  const [score, setScore] = useState(props.score);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const replyRef = useRef();
  const editRef = useRef();

  const upvote = () => {
    setScore(score + 1);
  };
  const downvote = () => {
    setScore(score - 1);
  };
  const toggleReplyModal = () => {
    setIsReplyModalOpen(true);
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const openDelModal = () => {
    setIsDelModalOpen(true);
  };

  const closeDelModal = () => {
    setIsDelModalOpen(false);
  };

  const removeComment = () => {
    deleteComment(props.id);
    setIsDelModalOpen(false);
  };

  const updateComment = (e) => {
    e.preventDefault();
    const editedComment = editRef.current.value;
    editComment(editedComment, props.id);
    setIsEditing(false);
  };

  const addReply = (e) => {
    e.preventDefault();
    const reply = replyRef.current.value;
    addNewReply(reply, props.id);
    setIsReplyModalOpen(false);
  };

  return (
    <div>
      <section className="comment-wrapper">
        <div className="score">
          <button onClick={upvote} className="plus-btn">
            <img src="/assets/icon-plus.svg" alt="score"></img>
          </button>
          <span>{score}</span>
          <button onClick={downvote} className="minus-btn">
            <img src="/assets/icon-minus.svg" alt="score"></img>
          </button>
        </div>
        <div>
          <div className="user-header">
            <div className="user-info">
              <img className="user-image" src={props.image} alt="user"></img>
              <h1>
                {props.username}
                {props.username === "juliusomo" && (
                  <span className="you">you</span>
                )}
              </h1>
              <p>{props.createdAt}</p>
            </div>
            {props.username === "juliusomo" ? (
              <div className="delete-edit">
                <button onClick={openDelModal} className="delete">
                  <img src="assets/icon-delete.svg" alt="icon"></img>delete
                </button>
                <button onClick={toggleEdit} className="edit">
                  <img src="assets/icon-edit.svg" alt="icon"></img>edit
                </button>
              </div>
            ) : (
              <button className="reply" onClick={toggleReplyModal}>
                <img src="assets/icon-reply.svg" alt="icon"></img>
                reply
              </button>
            )}
          </div>
          {isEditing ? (
            
              <form onSubmit={updateComment}>
                <label htmlFor="commentedit"></label>
                <textarea
                  id="commentedit"
                  type="text"
                  rows="5"
                  defaultValue={props.content}
                  ref={editRef}
                ></textarea>
                <button type="submit" className="send">
                  Update
                </button>
              </form>
            
          ) : (
            <p className="user-content">{props.content}</p>
          )}
        </div>
      </section>
      {isReplyModalOpen && (
        <div className="new-reply-wrapper">
          <form onSubmit={addReply}>
            <img
              src={data.currentUser.image.webp}
              className="user-image"
              alt="user"
            ></img>
            <label htmlFor="comment"></label>
            <textarea
              id="comment"
              type="text"
              rows="5"
              placeholder="Add a reply..."
              ref={replyRef}
            ></textarea>
            <button type="submit" className="send">
              reply
            </button>
          </form>
        </div>
      )}
      {isDelModalOpen && (
        <div className="del-modal">
          <div className="modal-wrapper">
            <h1>Delete comment</h1>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="modal-buttons">
              <button onClick={removeComment} className="del-btn">
                Yes, Delete
              </button>
              <button onClick={closeDelModal} className="cancel-btn">
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {props.replies.map((reply) => {
        return (
          <Replies
            key={reply.id}
            id={reply.id}
            image={reply.user.image.webp}
            username={reply.user.username}
            createdAt={reply.createdAt}
            content={reply.content}
            score={reply.score}
            replyingTo={reply.replyingTo}
          />
        );
      })}
    </div>
  );
};
export default Comment;
