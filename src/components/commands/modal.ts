import Client from "@@types/Client";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";

exports.run = async (CLient: Client, i: CommandInteraction) => {
    const row1 = new MessageActionRow<ModalActionRowComponent>({ components: [new TextInputComponent({ customId: "modal-embed-message", label: "Texto da Mensagem", placeholder: "@everyone", type: "TEXT_INPUT", style: "PARAGRAPH", maxLength: 2000 })] });
    const row2 = new MessageActionRow<ModalActionRowComponent>({ components: [new TextInputComponent({ customId: "modal-embed-title", label: "Título da Embed", placeholder: "Olá a todos...", type: "TEXT_INPUT", style: "SHORT", maxLength: 100 })] });
    const row3 = new MessageActionRow<ModalActionRowComponent>({ components: [new TextInputComponent({ customId: "modal-embed-description", label: "Descrição da Embed", placeholder: "Hoje eu venho aqui lhes falar...", type: "TEXT_INPUT", style: "PARAGRAPH", maxLength: 2000, required: true })] });
    const row4 = new MessageActionRow<ModalActionRowComponent>({ components: [new TextInputComponent({ customId: "modal-embed-image", label: "Imagem da Embed", placeholder: "https://i.imgur.com/...", type: "TEXT_INPUT", style: "SHORT", maxLength: 200 })] });
    const row5 = new MessageActionRow<ModalActionRowComponent>({ components: [new TextInputComponent({ customId: "modal-embed-thumbnail", label: "Thumbnail da Embed", placeholder: "https://i.imgur.com/...", type: "TEXT_INPUT", style: "SHORT", maxLength: 200 })] });
    const modal = new Modal({ customId: "modal-embed", title: "Criar embed", components: [row1, row2, row3, row4, row5] });

    await i.showModal(modal);
}

exports.data = new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Modal")