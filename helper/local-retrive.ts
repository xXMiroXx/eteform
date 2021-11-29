import fs from "fs";
/**
 * @description Resive data file name and returning back json data there as parsed object.
 * @param {string} dataUrl
 * @returns {Array}
 */
export default async function localRetrive(dataUrl: string) {
  return new Promise((resolve, reject) => {
    // Start of Try block
    try {
      // Reading file for data dir
      fs.readFile(
        `./data/${dataUrl}.json`,
        // Data as string encoded in utf8
        { encoding: "utf8" },
        (err, data) => {
          // From string to to parsed object
          const parsedData = JSON.parse(data);
          // Sending error  in case someting wrong acure
          if (err) reject(err);
          // Everything is okay? then resolve the parsed data
          else resolve(parsedData);
        }
      );
      // End of Try block
    } catch (err) {
      // Log error then send empty array.
      console.error(err);
      return [];
    }
  });
}
