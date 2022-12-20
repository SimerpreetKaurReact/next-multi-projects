import { buildFeedbackPath, extractFeedbackFileData } from ".";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedbackFileData(filePath);
  const selectedFeedback = data.find((feedback) => feedback.id === feedbackId);
  res.status(200).json({ feedback: selectedFeedback });
}
export default handler;
