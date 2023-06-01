import Server from "./server";






const server = Server.instance;
server.start(() => {
    // console.log(`Servidor corriendo en el puerto ${server.port_SSL}`);
    console.log(`Servidor corriendo en el puerto ${server.port}`);

});
