const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://metro.co.uk/2023/02/02/british-gas-to-stop-using-warrants-to-force-prepay-meters-on-people-18209919/';

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    // Get the webpage headline
    const headline = $('h1').text();

    // Get the author
    const author = $('.author').text();

    // Get the Post date
    const date = $('.post-date').text();

    // Get the image elements
    const images = $('img');

    // Initialize an array to store image information
    const imageData = [];

    // Loop through each image
    images.each((i, img) => {
      // Get the image URL
      const imgUrl = $(img).attr('src');

      // Get the image caption
      const imgCaption = $(img).attr('alt');
    
      // Get the image credit
      const imgCredit = $(img).attr('credit');
      
      // Store the image information in an object
      imageData.push({
        url: imgUrl,
        caption: imgCaption,
        credit: imgCredit,
      });
    });

    // Combine all the extracted information into a single object
    const jsonData = {
      headline,
      author,
      date,
      images: imageData,
    };

    // Write the data to a JSON file
    fs.writeFile('output.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to JSON file');
    });

  }
});
