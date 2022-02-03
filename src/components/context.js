import React, { createContext, useContext, useState } from "react";
import data from "../data.json";

const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allComments, setAllComments] = useState(data.comments);
  const [id, setId] = useState(5);

  const addNewComment = (comment) => {
    setId((prevState) => prevState + 1);
    setAllComments((prevState) => {
      return [
        ...prevState,
        {
          id: id,
          content: comment,
          createdAt: "1s ago",
          score: 0,
          user: {
            image: {
              webp: data.currentUser.image.webp,
            },
            username: data.currentUser.username,
          },
          replies: [],
        },
      ];
    });
  };

  const addNewReply = (newReply, id) => {
    const updatedReplies = allComments.map((comment) => {
      if (comment.id === id) {
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          score: comment.score,
          user: {
            image: {
              webp: comment.user.image.webp,
            },
            username: comment.user.username,
          },
          replies: [
            ...comment.replies,
            {
              id: id,
              content: newReply,
              createdAt: "1s ago",
              score: 0,
              replyingTo: comment.user.username,
              user: {
                image: {
                  webp: data.currentUser.image.webp,
                },
                username: data.currentUser.username,
              },
            },
          ],
        };
      } else {
        return comment;
      }
    });
    setAllComments(updatedReplies);
    setId((prevState) => prevState + 1);
  };
  
  //Stuck with this
  const addNewSubReply = (newReply, id) => {
    const updatedReplies = allComments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: {
          image: {
            webp: comment.user.image.webp,
          },
          username: comment.user.username,
        },
        replies: comment.replies.map((reply)=>{
          if(reply.id === id){
            return [...reply,{
              id: id,
              content: newReply,
              createdAt: "1s ago",
              score: 0,
              replyingTo: comment.user.username,
              user: {
                image: {
                  webp: data.currentUser.image.webp,
                },
                username: data.currentUser.username,
              },
            }]
          }else return reply
        })
      };
    });
    setAllComments(updatedReplies);
    setId((prevState) => prevState + 1);
  };

  const editComment = (newComment, id) => {
    const editedComment = allComments.map((comment) => {
      if (comment.id === id) {
        return {
          id: comment.id,
          content: newComment,
          createdAt: comment.createdAt,
          score: comment.score,
          user: {
            image: {
              webp: comment.user.image.webp,
            },
            username: comment.user.username,
          },
          replies: comment.replies,
        };
      } else {
        return comment;
      }
    });
    setAllComments(editedComment);
  };

  const deleteComment = (id) => {
    const filteredComments = allComments.filter((comment) => comment.id !== id);
    setAllComments(filteredComments);
  };

  const deleteReply = (id) => {
    const filteredReplies = allComments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: {
          image: {
            webp: comment.user.image.webp,
          },
          username: comment.user.username,
        },
        replies: comment.replies.filter((reply) => reply.id !== id),
      };
    });
    setAllComments(filteredReplies);
  };

  const editReply = (newReply, id) => {
    const updatedReplies = allComments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: {
          image: {
            webp: comment.user.image.webp,
          },
          username: comment.user.username,
        },
        replies: comment.replies.map((reply) => {
          if (reply.id === id) {
            return {
              ...reply,
              id: reply.id,
              content: newReply,
              createdAt: reply.createdAt,
              score: reply.score,
              replyingTo: reply.replyingTo,
              user: {
                image: {
                  webp: data.currentUser.image.webp,
                },
                username: data.currentUser.username,
              },
            };
          } else return reply;
        }),
      };
    });
    setAllComments(updatedReplies);
  };

  return (
    <GlobalContext.Provider
      value={{
        allComments,
        addNewComment,
        deleteComment,
        addNewReply,
        addNewSubReply,
        editComment,
        deleteReply,
        editReply,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
