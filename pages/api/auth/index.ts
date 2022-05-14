import { sendCode } from "lib/controllers/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { send } from "micro";
import methods from "micro-method-router";

module.exports = methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const auth = await sendCode(req.body.email);
      return send(res, 200, { Message: auth });
    } catch (error) {
      return send(res, 400, { error });
    }
  },
});
