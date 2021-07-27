'use strict'

const fsP = require('fs/promises');
const axios = require('axios');
const ARGV = process.argv;

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, 'utf8');
    console.log('file contents', contents);
    
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
  
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log('HTML', resp.data.slice(0, 80));
    
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
  
}

if (ARGV[ARGV.length-1].includes('http')) {
  webCat(ARGV[ARGV.length-1]);
}
else {
  cat(ARGV[ARGV.length-1]);
}