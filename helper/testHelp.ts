import fs from "fs";
import path from "path";

export default function testHelp() {
  const contact = fs.readFileSync(
    __dirname + "/../../../../data/contact-info.json",
    {
      encoding: "utf-8",
    }
  );
  console.log(contact);
  return contact;
}
