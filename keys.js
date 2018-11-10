console.log('this is loaded');

const spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

const concerts = {
    bandAPI: process.env.BANDKEY
}
module.exports = { spotify, concerts };