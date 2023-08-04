const fs = require('fs');
const axios = require('axios');
const readline = require('readline');

// Function to read a file
async function readFile(filePath) {
  try {
    return await fs.promises.readFile(filePath, 'utf-8');
  } catch (error) {
    throw new Error('Error reading the file: ' + error.message);
  }
}

// Function to read from a URL
async function readURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching URL: ' + error.message);
  }
}

// Function to write data to a file
async function writeToFile(filePath, data) {
  try {
    await fs.promises.writeFile(filePath, data, 'utf-8');
    console.log('Data written to file successfully.');
  } catch (error) {
    throw new Error('Error writing to file: ' + error.message);
  }
}

// Main function to handle command line arguments
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a file path or URL as an argument.');
    return;
  }

  if (args[0] === '--out' && args.length >= 3) {
    const outputFilePath = args[1];
    const source = args[2];

    if (source.startsWith('http://') || source.startsWith('https://')) {
      try {
        const data = await readURL(source);
        await writeToFile(outputFilePath, data);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const data = await readFile(source);
        await writeToFile(outputFilePath, data);
      } catch (error) {
        console.error(error.message);
      }
    }
  } else {
    const source = args[0];

    if (source.startsWith('http://') || source.startsWith('https://')) {
      try {
        const data = await readURL(source);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const data = await readFile(source);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
}

main();