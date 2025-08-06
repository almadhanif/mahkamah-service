const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const htmlPath = path.join(__dirname, '../../../public/index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  // Replace the title dynamically
  const modifiedHtml = htmlContent
    .replace(
      '<title>Express</title>',
      '<title>Welcome to SMART KM SYSTEM</title>'
    )
    .replace('<h1>Express</h1>', '<h1>Express</h1>')
    .replace('<p>Welcome to Express</p>', '<p>Welcome to Express.</p>');

  res.send(modifiedHtml);
});

module.exports = router;
