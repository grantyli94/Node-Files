'use strict'

const fsP = require('fs/promises')

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, 'utf8');
    console.log('file contents', contents);
    
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
  
} 

cat(process.argv[2]);