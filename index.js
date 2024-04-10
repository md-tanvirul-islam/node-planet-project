const { parse } = require('csv-parse')
const fs = require('node:fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;

}

fs.createReadStream('planet_data.csv') // readable stream
    .pipe(parse({
        comment: '#',
        columns: true
    }))  // writeable stream
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    }).on('error', (error) => {
        console.log(error);
    }).on('end', () => {
        console.log('Data process finish');
        console.log(`${habitablePlanets.length} habitable planet found!`);
    });

// readstream process data by chucking the full data using Buffer. 
// Buffer is a small temporary memory storage.Data stores in Buffer using bits.
// node stream