import { NextApiHandler } from "next";

function validateSearchInput(input: string) {
  if (!input) return { status: false, message: "empty field" };
  //Check Symbols
  const symbols = new RegExp(/[^\w\s,.&]|_/);
  if (input.match(symbols))
    return {
      status: false,
      message: "bad input",
    };
  else return { status: true };
}

function fetchSearch(name: string) {
  return fetch(process.env.END_POINT + name, {
    method: "GET",
    headers: {
      Authorization: process.env.API_KEY as string,
    },
  }).then((res) => res.json());
}

const handler: NextApiHandler = async (req, res) => {
  let name = req.query.name as string;
  const input = validateSearchInput(name as string);
  if (!input.status) throw new Error(input.message);
  name = name.replace(/ /g, "-");
  name = encodeURIComponent(name);
  const data = await fetchSearch(name);
  const available = !data.total_results;
  res.status(200).json({
    status: "success",
    available,
  });
};

export default handler;
