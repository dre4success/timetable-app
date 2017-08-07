// inserting an svg

const fs = require('fs');

exports.icon = (name) => fs.readFileSync(`./public/icons/${name}.svg`);