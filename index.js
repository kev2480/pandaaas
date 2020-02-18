const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const helpers = require('./helpers');

app.get('/', (req, res) => res.send('🐼'))

app.get('/:x/:y', (req, res) => {
  const {format} = req.query;
  const {x, y} = req.params;
  // Parse to integer if possible
  let width, height
  if (x) {
    width = parseInt(x)
  }
  if (y) {
    height = parseInt(y)
  }
  try {
    // Set the content-type of the response
    res.type(`image/${format || 'png'}`)
    // Get the resized image
    helpers.resizeImage(helpers.getImageLocation(), format, width, height).pipe(res)
  } catch (e) {
    res.type(`text/html`)
    res.status(422)
    res.send(e.message)
  }

});

app.listen(port, () => console.log(`🐼 listening on port ${port}!`))
