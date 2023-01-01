import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method != "PATCH") {
    return;
  }
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
  }
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.staus(404).json({ message: "user not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Passwords not matched" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPassword);
  usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password updated" });
}
export default handler;
