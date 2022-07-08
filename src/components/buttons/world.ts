import Client from "@@types/Client";
import { ButtonInteraction } from "discord.js";

exports.run = async (CLient: Client, i: ButtonInteraction) => {
    await i.deferReply({ ephemeral: true });

    await i.editReply("> **`Hello World!`**");
}

exports.data = {
    name: "world"
}