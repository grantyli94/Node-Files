'use strict'

const fsP = require('fs/promises');
const axios = require('axios');
const ARGV = process.argv;

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, 'utf8');
    return contents;
    
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
}

async function write(content, path) {
  try {
    await fsP.writeFile(`./${path}`, content, "utf8");
  } catch(err) {
      console.log(err.message);
      process.exit(1)
  }

  console.log("success!")
}


async function webCat(url) {
  try {
    let resp = await axios.get(url);
    return resp.data.slice(0, 80);
    
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
}


async function run() {
    if (ARGV[ARGV.length-1].includes('http')) {
      let content = await webCat(ARGV[ARGV.length-1]);
    
      if (ARGV[2] === "--out") {
        write(content, ARGV[3]);
    
      } else {
        console.log(content);
    
      } 
    } else {
      let content = await cat(ARGV[ARGV.length-1]); 
    
      if (ARGV[2] === "--out") {
        write(content, ARGV[3]);
    
      } else {
        console.log(content);
    
      }
    }
}

run();
