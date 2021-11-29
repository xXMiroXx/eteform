import { NextApiRequest, NextApiResponse } from "next";
import localRetrive from "helper/local-retrive";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await localRetrive(req.query.element as string);
      res.status(200).json(data);
      resolve(data);
    } catch (err) {
      res.status(404);
      reject("bad request");
    }
  });
}
