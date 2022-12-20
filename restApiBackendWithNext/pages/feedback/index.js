import React, { useState } from "react";
import { buildFeedbackPath, extractFeedbackFileData } from "../api/feedback";

const Feedback = (props) => {
  const [feedbackData, setFeedbackData] = useState();
  const loadFeedbackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setFeedbackData(res.feedback);
      });
  };
  return (
    <div>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((ele) => (
          <li key={ele.id}>
            {ele.text}
            <button onClick={() => loadFeedbackHandler(ele.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedbackFileData(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
export default Feedback;
