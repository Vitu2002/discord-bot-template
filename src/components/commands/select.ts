import Client from "@@types/Client";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";

exports.run = async (CLient: Client, i: CommandInteraction) => {
    await i.deferReply({ ephemeral: true });

    const row = new MessageActionRow({ components: [new MessageSelectMenu({ customId: "select-menu", placeholder: "Qual cor você prefere?", options: [{ label: "Azul", value: "first_option" }, { label: "Amarelo", value: "second_option" }, { label: "Verde", value: "third_option" },] })] })
    const embed = new MessageEmbed({ author: { name: i.user.username, iconURL: i.user.displayAvatarURL({ dynamic: true }), url: `https://discord.com/users/${i.user.id}` }, color: "#3577FF", description: "É mais fácil viver com o peso da busca, que com o vazio da ignorância." })

    await i.editReply({ embeds: [embed], components: [row] });
}

exports.data = new SlashCommandBuilder()
    .setName("select")
    .setDescription("Select")