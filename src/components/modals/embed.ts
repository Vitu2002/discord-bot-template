import Client from "@@types/Client";
import { MessageEmbed, ModalSubmitInteraction, TextChannel } from "discord.js";

exports.run = async (Client: Client, i: ModalSubmitInteraction) => {
    await i.deferReply({ ephemeral: true });

    const message = i.fields.getTextInputValue('modal-embed-message');
    const title = i.fields.getTextInputValue('modal-embed-title');
    const description = i.fields.getTextInputValue('modal-embed-description');
    const image = i.fields.getTextInputValue('modal-embed-image');
    const thumbnail = i.fields.getTextInputValue('modal-embed-thumbnail');

    if (image) {
        if (!image.startsWith("https://" || "http://") || !image.endsWith(".png" || ".jpg" || ".jpeg" || ".gif" || ".webp" || ".tiff" || ".svg" || ".avif"))
            return i.editReply("> **O campo `Imagem` deve conter um url que comece com `https://` e termine com `.png`, `.jpg`, `.jpeg`, `gif`, `.webp` ou `.avif`.**")
    }

    if (thumbnail) {
        if (!thumbnail.startsWith("https://" || "http://") || !thumbnail.endsWith(".png" || ".jpg" || ".jpeg" || ".gif" || ".webp" || ".tiff" || ".svg" || ".avif"))
            return i.editReply("> **O campo `Thumbnail` deve conter um url que comece com `https://` e termine com `.png`, `.jpg`, `.jpeg`, `gif`, `.webp` ou `.avif`.**")
    }

    const embed = new MessageEmbed()
        .setColor("#EE620C")
        .setDescription(description);

    if (title) embed.setTitle(title);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);

    await i.editReply("> **Deseja colocar uma cor personalizada na embed?** (Ex: `#36393F`, digite `none` para a cor padrão)");
    const messageColor = await i.channel.awaitMessages({ max: 1, time: 600000, filter: (m) => m.author.id === i.user.id })
    if (!messageColor.first()) return;
    if (messageColor.first().content.toLowerCase() !== "none") {
        embed.setColor(messageColor.first().content as any);
    }

    await i.editReply("> **Mencione o canal onde a embed será enviada.**");

    const messageChannel = await i.channel.awaitMessages({
        max: 1, time: 600000, filter: (m) => {
            if (m.author.id !== i.user.id) return false;

            const channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content);

            if (!channel) {
                m.reply("> **Você precisa mencionar um canal.**");
                return false;
            };

            if (!["GUILD_NEWS", "GUILD_TEXT"].includes(channel.type)) {
                m.reply("> **Você precisa mencionar um canal de texto.**");
                return false;
            }

            return true;
        }
    });

    const channel = messageChannel.first().mentions.channels.first() as TextChannel || i.guild.channels.cache.get(messageChannel.first().content) as TextChannel;
    if (!channel) return;
    await messageChannel.first().delete();

    await channel.send(message ? { embeds: [embed], content: message } : { embeds: [embed] });
    await i.editReply("> **Embed enviada com sucesso!**");
}

exports.data = {
    name: "modal-embed"
}