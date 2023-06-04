import { readFileSync, readdirSync, writeFileSync } from "fs";

const files = readdirSync("./data");

const indexData = [];

for (const file of files) {
  const data = JSON.parse(readFileSync(`./data/${file}`));
  indexData.push({
    name: data.name,
    id: data.id,
    publisher: data.publisher,
    cover: data.cover,
  });
}

writeFileSync(`./index.json`, JSON.stringify(indexData));
