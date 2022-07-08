import { SlashCommandBuilder } from "@discordjs/builders";
import { PrismaClient } from "@prisma/client";
import Loaders from "@services/handlers";
import Discord, { ButtonInteraction, Collection, CommandInteraction, ModalSubmitInteraction, SelectMenuInteraction } from "discord.js";
import moment from "moment";

export default class Client extends Discord.Client {
    readonly db = new PrismaClient();
    readonly started = moment();
    readonly loaders = Loaders;
    components: Interactions;

    constructor() {
        super({ intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES"], presence: { activities: [{ name: "Iniciando sistemas...", type: "WATCHING" }] } });
        this.components = {
            buttons: new Collection(),
            commands: new Collection(),
            modals: new Collection(),
            selects: new Collection()
        };
    }
}



interface Interactions {
    commands: Collection<string, Command>;
    buttons: Collection<string, Button>;
    modals: Collection<string, Modal>;
    selects: Collection<string, SelectMenu>;
}



interface Button {
    run: (Client: Client, interaction: ButtonInteraction) => Promise<void>;
    data: ComponentData;
}

interface Modal {
    run: (Client: Client, interaction: ModalSubmitInteraction) => Promise<void>;
    data: ComponentData;
}

interface Command {
    run: (Client: Client, interaction: CommandInteraction) => Promise<void>;
    data: SlashCommandBuilder;
}

interface SelectMenu {
    run: (Client: Client, interaction: SelectMenuInteraction) => Promise<void>;
    data: ComponentData;
}

interface ComponentData {
    name: string;
}