const SOCKET_CONFIG = {
    url: 'http://localhost:3001',
    options: {
        transports: ['websocket'],
        autoConnect: true,
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    }
}

export default SOCKET_CONFIG