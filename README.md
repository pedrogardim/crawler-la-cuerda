# La Cuerda Node.js crawler
A Node.js program for downloading lyrics and chords from 'La Cuerda', a popular spanish-speaking chord website, from a array of artist IDs. Based on Axios and Cheerio.

#### Instructions

- Fill the array on the file `artistList.js` with the desired artist list. (Can be found on the URL of the artist page)
- Run `yarn start`!
- Songs will be stored on a JSON file `./output.json` with the format `{ title, lyrics, artist }`

Before the download, the count of songs found per artist will be logged, as well as the songs name as they are being downloaded.
