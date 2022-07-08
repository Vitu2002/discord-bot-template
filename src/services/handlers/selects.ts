import Client from '@@types/Client';
import { gray, green, magenta, red, yellow } from 'colors';

export default async (Client: Client, arr: string[]) => {
    if (arr.length === 0) return console.warn(red("\n[!]") + yellow("No selects found!"));
    console.log(magenta("\n[!]") + yellow(` Loading ${red(arr.length.toString())} selects.`));

    arr.forEach(fileName => {
        const name = fileName.split('.')[0];

        try {
            const file = require(`@components/selects/${fileName}`);
            Client.components.selects.set(file.data.name, file);
            console.log(magenta("[!]") + green(` Loaded ${gray(name)}!`));
        } catch (err) {
            console.error(red("[!]") + magenta(` Failed to load ${gray(name)}!`));
            console.error(err);
        }
    });
}