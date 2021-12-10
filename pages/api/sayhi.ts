import testHelp from "@/helper/testHelp";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await testHelp();
    res.status(200).json({ message: data });
  } catch (e) {
    res.status(405).json({ message: e });
  }
}
