import Client from "@@types/Client";
import { REST } from '@discordjs/rest';
import { gray, green, magenta } from "colors";
import { Routes } from 'discord-api-types/v9';
import { ActivitiesOptions } from "discord.js";

const rest = new REST({ version: '9' }).setToken(`${process.env.DISCORD_TOKEN}`);

module.exports = async (client: Client) => {
    const activities: ActivitiesOptions[] = [
        { type: 'STREAMING', name: 'Mangás' },
        { type: 'WATCHING', name: 'Hentais' },
        { type: 'LISTENING', name: 'YomuMangás' },
        { type: 'PLAYING', name: 'Desenvolvido por Vitu2002' },
    ]

    console.log(`\n[!] System Online!\n[!] Bot Name: ${client.user.username}\n[!] Bot ID: ${client.user.id}\n[!] Bot Status: ${green(client.user.presence.status)}\n[!] Buttons: ${client.components.buttons.size}\n[!] Commands: ${client.components.commands.size}\n[!] Modals: ${client.components.modals.size}\n[!] Menus: ${client.components.selects.size}\n[!] Guilds: ${client.guilds.cache.size}\n`);

    client.guilds.cache.forEach(async (guild) => {
        rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: client.components.commands.map(c => c.data.toJSON()) })
            .catch(err => console.error(err));

        console.log(magenta("[!]") + green(` Loaded ${gray(guild.name)}!`));
    });

    setInterval(() => {
        client.user?.setActivity(activities[Math.floor(Math.random() * activities.length)])
    }, 30000);
}