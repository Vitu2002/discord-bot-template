import Client from "@@types/Client";
import { REST } from '@discordjs/rest';
import { gray, green, magenta } from "colors/index";
import { Routes } from 'discord-api-types/v9';
import { Guild } from "discord.js";

const rest = new REST({ version: '9' }).setToken(`${process.env.DISCORD_TOKEN}`);

module.exports = async (client: Client, guild: Guild) => {
    rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: client.components.commands.map(c => c.data.toJSON()) })
        .catch(err => console.error(err));

    console.log(magenta("[!]") + green(` Loaded ${gray(guild.name)}!`));
}