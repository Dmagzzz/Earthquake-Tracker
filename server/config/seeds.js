const axios = require('axios');
const db = require('./connection');
const { User, Earthquake } = require('../models');

db.once('open', async () => {
  await Earthquake.deleteMany();

  const earthquakesRaw = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson');
  const earthquakes = earthquakesRaw.data.features.map((earthquake) => ({
    ids: earthquake.id,
    title: earthquake.properties.title,
    time: earthquake.properties.time,
    updated: earthquake.properties.updated,
    magType: earthquake.properties.magType,
    mag: earthquake.properties.mag,
    latitude: earthquake.geometry.coordinates[0],
    longitude: earthquake.geometry.coordinates[1],
    altitude: earthquake.geometry.coordinates[2],
  }));
  const earthquakesInserted = await Earthquake.insertMany(earthquakes);

  process.exit();
});
