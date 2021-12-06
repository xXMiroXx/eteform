import { NextApiHandler } from "next";

const validator: (input: string) => [boolean, string] = (input: string) => {
  input = input.trim();
  if (!input) return [false, "ادخل اسم الشركه"];
  if (input.match(/[^a-zA-Z\s&.,]/))
    return [false, "اسم الشركه يجب ان يكون بالانجليزيه"];
  return [true, ""];
};

async function fetchSearch(name: string) {
  try {
    const res = await fetch(process.env.END_POINT + name, {
      method: "GET",
      headers: {
        Authorization: process.env.API_KEY as string,
      },
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
}

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method !== "GET") throw new Error("bad request");
    let { name } = req.query;
    if (!name) throw new Error("bad url");
    const [isValid, message] = validator(name as string);
    if (!isValid) throw new Error(message);

    if (typeof name === "string") {
      name = name.replace(/ /g, "-");
      name = encodeURIComponent(name);
    } else throw new Error("query not strong");
    const data = await fetchSearch(name as string);
    const available = !data.total_results;
    res.status(200).json({
      status: "success",
      available,
    });
  } catch (e) {
    res.status(405).json({ message: "something went wrong", error: e });
  }
};

export default handler;
