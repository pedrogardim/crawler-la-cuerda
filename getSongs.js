import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import artists from './artistList.js';

const baseUrl = 'https://acordes.lacuerda.net';

const getSongsFromArtist = async (artist) => {
  const artistList = await axios.get(`${baseUrl}/${artist}/`);

  const $ = cheerio.load(artistList.data);

  const linkList = [];

  $('a').each((_, e) => linkList.push(e));

  const processes = linkList.map(async (element) => {
    try {
      const link = $(element).attr('href');
      const songOptions = await axios.get(`${baseUrl}/${artist}/${link}`);
      if (songOptions.status === '404') return;
      const $2 = cheerio.load(songOptions.data);
      const songLink = $2('.rtLabel:first').find('a').attr('href');
      if (!songLink) return;
      const songHtml = await axios.get(`${baseUrl}/${artist}/${songLink}`);
      const $3 = cheerio.load(songHtml.data);
      let title = $3('h1').text().trim();
      let lyrics = $3('pre').last().text();
      console.log(title);
      return { title, lyrics, artist };
    } catch (e) {
      return null;
    }
  });

  console.log(artist, processes.length);

  return Promise.all(processes.filter((e) => e));
};

const getSongs = async () => {
  /* const result = await Promise.all(
      artists.map((artist) => retrieveSongsFromArtist(artist))
    ); */

  const result = await Promise.all(artists.map((e) => getSongsFromArtist(e)));

  fs.writeFile(
    './output.json',
    JSON.stringify(result.flat(1).filter((e) => e)),
    'utf8',
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    }
  );
};

export default getSongs;
