import Client from "@@types/Client";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

exports.run = async (CLient: Client, i: CommandInteraction) => {
    await i.deferReply({ ephemeral: true });

    const row = new MessageActionRow({ components: [new MessageButton({ customId: "world", label: "Hello", style: "SECONDARY" }), new MessageButton({ style: "LINK", label: "Vitu2002", url: "https://github.com/Vitu2002" })] })
    const embed = new MessageEmbed({ author: { name: i.user.username, iconURL: i.user.displayAvatarURL({ dynamic: true }), url: `https://discord.com/users/${i.user.id}` }, color: "#3577FF", description: "É mais fácil viver com o peso da busca, que com o vazio da ignorância." })

    await i.editReply({ embeds: [embed], components: [row] });
}

exports.data = new SlashCommandBuilder()
    .setName("button")
    .setDescription("Button")