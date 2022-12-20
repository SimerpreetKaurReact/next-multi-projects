import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notificationContext";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const { notification, showNotification, hideNotification } =
    useContext(NotificationContext);
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch("/api/comments/" + props.eventId).then((res) =>
        res.json().then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })
      );
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    const { email, name, text } = commentData;
    showNotification({
      title: "Comments",
      message: "Adding your comment",
      status: "pending",
    });
    fetch(`/api/comments/${props.eventId}`, {
      method: "POST",
      body: JSON.stringify({ email, name, text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showNotification({
          title: "Success",
          message: "Successfully added comment",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: err.message,
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
