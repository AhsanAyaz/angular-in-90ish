const fs = require('fs');
const path = require('path');

const listFilesInDirectory = (directory, fileNames) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFilesInDirectory(filePath, fileNames);
    } else {
      fileNames.push(filePath);
    }
  });
};

const extractTitleFromMarkdown = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const headingRegex = /^#{1,2}\s+(.*)/;
    const lines = data.split('\n');
    for (let line of lines) {
      const match = line.match(headingRegex);
      if (match) {
        return match[1].trim(); // Extracts the first Markdown heading
      }
    }
    return ''; // Return an empty string if no heading is found
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

const extractSlideData = (folderName) => {
  try {
    const talksPath = path.resolve(folderName);
    const files = fs.readdirSync(talksPath);

    const markdownFilter = /\.md$/;
    const folderFilter = /\./;

    let content = [];
    files.forEach((file) => {
      if (!folderFilter.test(file)) {
        const fileNames = [];
        listFilesInDirectory(path.join(talksPath, file), fileNames);

        return fileNames.forEach((file) => {
          if (markdownFilter.test(file)) {
            const title = extractTitleFromMarkdown(file);
            content.push({
              link: file.replace(talksPath, '').substring(1),
              title,
            });
          }
        });
      }

      if (markdownFilter.test(file)) {
        const title = extractTitleFromMarkdown(path.join(talksPath, file));
        content.push({ link: file, title });
      }
    });

    const jsonTalks = JSON.stringify(content);
    return jsonTalks;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const saveSlideData = () => {
  try {
    const jsonTalks = extractSlideData('content');
    const dataPath = path.resolve(path.join('data', 'slides.json'));
    fs.writeFileSync(dataPath, jsonTalks);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

saveSlideData();

module.exports = {
  extractTitleFromMarkdown,
  extractSlideData,
  listFilesInDirectory,
};
