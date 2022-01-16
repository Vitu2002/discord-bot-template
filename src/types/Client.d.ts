import Discord, { ButtonInteraction, Collection, CommandInteraction, ContextMenuInteraction, Message, SelectMenuInteraction } from "discord.js";
import { REST } from "@discordjs/rest";


export default class Client extends Discord.Client {
    interactions: Interactions;

    constructor() {
        super({ intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES"], presence: { activities: [{ name: "Iniciando sistemas...", type: "WATCHING" }] } });
        this.interactions = {
            slashs: new Collection(),
            commands: new Collection(),
            components: new Collection()
        };
    }
}

interface Interactions {
    slashs: Collection<string, Slash>;
    commands: Collection<string, Command>;
    components: Collection<string, Component>;
}

interface Slash {
    name: string;
    description: string;
    run: (Client: Client, interaction: CommandInteraction) => Promise<void>;
}

interface Command {
    name: string;
    aliases: string[];
    run: (Client: Client, message: Message, args: string[]) => Promise<void>;
}

interface Component {
    name: string;
    type: "button" | "select-menu" | "context-menu";
    run: (Client: Client, interaction: ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction) => Promise<void>;
}