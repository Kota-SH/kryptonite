// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CommentList = ({ postId }) => {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

import React from "react";
const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if(comment.status === 'approved'){
    content = comment.content;
    }
    if(comment.status === 'rejected'){
      content = 'Comment rejected';
    }
    if(comment.status === 'pending'){
      content = 'Awaiting moderation';
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
