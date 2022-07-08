import Client from '@@types/Client';
import { gray, green, magenta, red, yellow } from 'colors';

export default async (Client: Client, arr: string[]) => {
    if (arr.length === 0) return console.warn(red("\n[!]") + yellow("No modals found!"));
    console.log(magenta("\n[!]") + yellow(` Loading ${red(arr.length.toString())} modals.`));

    arr.forEach(fileName => {
        const name = fileName.split('.')[0];

        try {
            const file = require(`@components/modals/${fileName}`);
            Client.components.modals.set(file.data.name, file);
            console.log(magenta("[!]") + green(` Loaded ${gray(name)}!`));
        } catch (err) {
            console.error(red("[!]") + magenta(` Failed to load ${gray(name)}!`));
            console.error(err);
        }
    });
}