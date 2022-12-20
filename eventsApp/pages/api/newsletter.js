import { connectDatabase, insertDocument } from "../../helper/db-util";

async function handler(req, res) {
  if (req.method == "POST") {
    const { email } = req.body;
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Client connection failed" });
      return;
    }
    try {
      await insertDocument(client, "newsletter", {
        email: email,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Success" });
  }
}
export default handler;
