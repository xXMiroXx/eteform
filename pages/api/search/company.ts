import { NextApiHandler } from "next";
// import validator from "../../../helper/search-validator";
const validator: (input: string) => [boolean, string] = (input: string) => {
  input = input.trim();
  if (!input) return [false, "ادخل اسم الشركه"];
  if (input.match(/[^a-zA-Z\s&.,]/))
    return [false, "اسم الشركه يجب ان يكون بالانجليزيه"];
  return [true, ""];
};
// function validateSearchInput(input: string) {
//   if (!input) return { status: false, message: "empty field" };
//   //Check Symbols
//   const symbols = new RegExp(/[^\w\s,.&]|_/);
//   if (input.match(symbols))
//     return {
//       status: false,
//       message: "bad input",
//     };
//   else return { status: true };
// }

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
    let name = req.query.name as string;
    // const input = validateSearchInput(name as string);
    const input = validator(name);
    if (!input[0]) throw new Error(input[1]);
    name = name.replace(/ /g, "-");
    name = encodeURIComponent(name);
    const data = await fetchSearch(name);
    const available = !data.total_results;
    res.status(200).json({
      status: "success",
      available,
    });
  } catch (e) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export default handler;
