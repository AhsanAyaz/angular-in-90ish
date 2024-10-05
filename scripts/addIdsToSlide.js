const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const targetFile = process.argv[2];

if (!targetFile) {
  console.log('Error: target file not provided\nUse `npm run addIdsToSlide ./path/to/slides.md`');
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), targetFile);

const addIdToSections = async (filePath) => {
  console.log(`Adding IDs to file ${filePath}\n`);
  try {
    let data = fs.readFileSync(filePath, 'utf8');

    const separators = [';VS;', ';HS;'];

    separators.forEach(sep => {
      // Break into sections
      const sections = data.split(new RegExp(`\n${sep}[\r\n]`));
      const updatedSections = sections.map(section => {
        if(!section.includes('<!-- {id=')) {
          return `\n\n<!-- {id="${uuidv4()}"} -->\n${section}`;
        }
        // TODO: check duplicate IDs
        return section;
      });

      // Join the sections back together
      data = updatedSections.join(`\n${sep}\n`);
    });

    // Write the new data to file
    fs.writeFileSync(filePath, data, 'utf8');
    console.log('IDs successfully added!');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

// Usage
addIdToSections(filePath);
