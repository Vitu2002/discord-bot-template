import Client from "@@types/Client";
import { MessageActionRow, SelectMenuInteraction } from "discord.js";

const awsers = {
    "first_option": "Azul, o azul é a cor do céu.",
    "second_option": "Amarelo, o amarelo é a cor do sol.",
    "third_option": "Verde, o verde é a cor da florestas.",
}

exports.run = async (CLient: Client, i: SelectMenuInteraction) => {
    await i.deferReply({ ephemeral: true });

    i.message.components[0].components[0].disabled = true;

    const row = new MessageActionRow({ components: [i.message.components[0].components[0]] });

    await i.editReply({ content: awsers[i.values[0]], components: [row] });
}

exports.data = {
    name: "select-menu"
}