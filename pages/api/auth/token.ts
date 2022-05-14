import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "lib/models/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const auth = await Auth.FindByEmailAndCode(req.body.email, req.body.code);
  if (!auth) {
    return res.status(401).send({ message: "Código o email incorrectos" });
  }
  const validCode = auth.isCodeValid();
  if (validCode) {
    const token = generate({ userId: auth.data.userId });
    res.send({ token });
  } else {
    res.status(401).send({ message: "Código expirado" });
  }
}
