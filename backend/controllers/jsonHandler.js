const fs = require("fs");

const jsonUpdater = (uuid, imgdata, desc, title) => {
  const filePath = "../backend/server.json";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const jsonData = JSON.parse(data);
    jsonData.push({ uuid, imgdata, desc, title });
    const updatedJsonData = JSON.stringify(jsonData, null, 2);

    fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }

      console.log("JSON file updated successfully!");
    });
  });
};
module.exports = { jsonUpdater };
