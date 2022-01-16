import { blue, white, red, green } from "colors";
import Client from "../../types/Client";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";

export async function loadSlashs(Client: Client, token: string, files: string[]) {

    if (files.length === 0) {
        return console.log(red(`${blue("[System]")} Nenhum slash foi encontrado`));
    }

    console.log(white(`${blue("[System]")} Iniciando carregamento dos eventos`));

    const rest = new REST({ version: "9" }).setToken(token);
    const slashs = [];
    let loadedSlashs = files.length;

    files.forEach(file => {
        try {
            const slashName = file.split(".")[0];
            const slashExtencion = file.split(".")[1];

            if (!["js", "ts"].includes(slashExtencion)) {
                throw new Error(`${red("[System]")} O evento ${slashName} não possui uma extenção válida`);
            }

            const slashFile = require(`../../interactions/slashs/${file}`);
            if (slashFile.init) slashFile.init(Client);


            if (!slashFile.data) {
                loadedSlashs--;
                throw new Error(`${red("[System]")} O evento ${slashName} não possui um objeto data`);
            }

            const slashData = slashFile.data.toJSON();

            slashs.push(slashData);
            Client.interactions.slashs.set(slashData.name, slashFile.run);
            console.log(green(`${blue("[System]")} Slash ${slashName} carregado com sucesso`));
        } catch (err) {
            console.log(red(`${blue("[System]")} O slash ${file} não foi carregado`), err);
            loadedSlashs--;
        }
    });

    console.log(green(`${blue("[System]")} [${loadedSlashs}/${files.length}] slashs carregados`));

    await rest.put(
        Routes.applicationGuildCommands(Client.user.id, ""),
        { body: slashs }
    );
}