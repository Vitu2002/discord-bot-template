import { blue, white, red, green } from "colors";
import Client from "../../types/Client";

export function loadEvents(Client: Client, events: string[]) {

    if (events.length === 0) {
        return console.log(red(`${blue("[System]")} Nenhum evento foi encontrado`));
    }

    console.log(white(`${blue("[System]")} Iniciando carregamento dos eventos`));
    let loadedEvents = events.length;

    events.forEach(event => {
        try {
            const eventName = event.split(".")[0];
            const eventExtencion = event.split(".")[1];

            if (!["js", "ts"].includes(eventExtencion)) {
                loadedEvents--;
                throw new Error(`${red("[System]")} O evento ${event} não possui uma extenção válida`);
            }

            const eventFile = require(`../../interactions/events/${event}`);

            Client.on(eventName, eventFile.bind(null, Client));
            console.log(green(`${blue("[System]")} Evento ${event} carregado com sucesso`));
        } catch (err) {
            console.log(red(`${blue("[System]")} O evento ${event} não foi carregado`), err);
            loadedEvents--;
        }
    })

    console.log(green(`${blue("[System]")} [${loadedEvents}/${events.length}] eventos carregados`));
}