const fs = require('fs');
let siteAndIndex = process.argv.slice(2);

const site = siteAndIndex[0];
const index = siteAndIndex[1];

const request = require('request');
request(site, (error, response, body) => {
  //console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  if (error) console.log('error: ', error);
  
  fs.writeFile(index, body, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    fs.stat(index , (error, stats) => {
      // in case of any error
      if (error) {
        console.log(error);
        return;
      }
      const fileSize = stats.size;
      console.log(`Downloaded and saved ${fileSize} bytes to ./index.html`);
    });
  });
});