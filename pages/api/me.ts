import { User } from "lib/models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";

async function handler(req: NextApiRequest, res: NextApiResponse, userData) {
  const user = new User(userData.userId);
  await user.pull();
  return res.send(user.data);
}

export default authMiddleware(handler);
