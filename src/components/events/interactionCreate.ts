import Client from "@@types/Client";
import { gray, green, magenta, yellow } from "colors";
import { Interaction } from "discord.js";

module.exports = async (Client: Client, interaction: Interaction) => {
    if (interaction.isButton()) {
        const name = !interaction.customId.match("---") ? interaction.customId : interaction.customId.split("---")[0];
        const button = Client.components.buttons.get(name);
        if (button) button.run(Client, interaction);
        console.log(magenta("[!]") + green(` Button ${gray(name)} executed by ${yellow(interaction.user.tag)}!`));
    } else if (interaction.isCommand()) {
        const name = interaction.commandName;
        const command = Client.components.commands.get(name);
        if (command) command.run(Client, interaction);
        console.log(magenta("[!]") + green(` Command ${gray(name)} executed by ${yellow(interaction.user.tag)}!`));
    } else if (interaction.isModalSubmit()) {
        const name = interaction.customId;
        const modal = Client.components.modals.get(name);
        if (modal) modal.run(Client, interaction);
        console.log(magenta("[!]") + green(` Modal ${gray(name)} executed by ${yellow(interaction.user.tag)}!`));
    } else if (interaction.isSelectMenu()) {
        const name = interaction.customId;
        const select = Client.components.selects.get(name);
        if (select) select.run(Client, interaction);
        console.log(magenta("[!]") + green(` Select ${gray(name)} executed by ${yellow(interaction.user.tag)}!`));
    }
}