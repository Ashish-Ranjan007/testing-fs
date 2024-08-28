const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: process.env.PORT });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            // Parse the received message as JSON
            let parsedMessage = JSON.parse(message);

            // Log the parsed message
            console.log("Server received:", parsedMessage);

            // Convert the parsed message back to a JSON string for broadcasting
            let stringifiedMessage = JSON.stringify(parsedMessage);

            // Broadcast the message to all connected clients except the sender
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(stringifiedMessage); // Send the JSON string
                }
            });
        } catch (error) {
            console.error(
                "Failed to parse or broadcast WebSocket message:",
                error
            );
        }
    });
});

console.log(`Signaling server running on ws://localhost: ${process.env.PORT}`);
