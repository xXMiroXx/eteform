import fs from "fs";
import path from "path";

export default function testHelp() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      __dirname + "/../../../../data/contact-info.json",
      "utf-8",
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}
