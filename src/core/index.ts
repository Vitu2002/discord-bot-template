import ClientBot from '@@types/Client';
import { magenta, red, yellow } from 'colors';
import { config } from 'dotenv';
import { readdirSync } from 'fs';

const Client = new ClientBot();

config()
Client.loaders.events(Client, readdirSync('src/components/events'));
Client.loaders.modals(Client, readdirSync('src/components/modals'));
Client.loaders.buttons(Client, readdirSync('src/components/buttons'));
Client.loaders.selects(Client, readdirSync('src/components/selects'));
Client.loaders.commands(Client, readdirSync('src/components/commands'));

Client.on('error', err => {
    console.error(magenta('[Discord]' + yellow(' Ops! Ocorreu um erro! ') + err))
})

Client.login(process.env.DISCORD_TOKEN);

process.on("unhandledRejection", err => {
    console.error(magenta('[!]' + red(" unhandledRejection ") + err))
})

process.on("uncaughtException", err => {
    console.error(magenta('[!]' + red(" uncaughtException ") + err))
})