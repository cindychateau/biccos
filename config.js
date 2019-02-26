const Config = {
    biccos: {
        /* direccion del socket de bicoos */
        wss: 'wss://api.biccos.com/WSGateway/',
        /* puedes guardar los datos de inicio de sesion aqui, por si los necesitas */
        user_data: {
            UserName: 'user',
            Password: 'B1cc0s'
        }
    },
    server: {
        /* usuarios permitidos via auth basic */
        basic_auth_users: {
            'admin': 'secret'
        },
        /* para guardar sertificados ssl para uso de https */
        https: {
            privateKey: '',
            certificate: '',
            charset: 'utf8'
        },
        /* puerto de escucha del servidor */
        port: 3000
    }
};

module.exports = Config;