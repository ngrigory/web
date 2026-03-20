function createWebSocketSession(url) {
    if (!url) throw new Error("URL is required");

    const ws = new WebSocket(url);

    ws.onopen = () => {
    };

    ws.onclose = () => {
    };

    ws.onerror = (err) => {
        console.error("WebSocket error:", err.message);
    };

    return 50;
}

function write(ws, cmd, payload) {
    if (!ws) return false;
    if (ws.readyState !== WebSocket.OPEN) return false;

    try {
        ws.send(JSON.stringify({ CMD: cmd, Payload: payload }));
        return true;
    } catch (err) {
        console.error("Write error:", err.message);
        return false;
    }
}

function read(ws) {
    return new Promise((resolve, reject) => {
        if (!ws) return reject(new Error("WebSocket is not defined"));

        const onMessage = (event) => {
            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch {
                return;
            }

            if (msg.Status === "OK" && msg.Payload) {
                try {
                    const data = JSON.parse(msg.Payload); 
                    ws.removeEventListener("message", onMessage);
                    resolve(data); 
                } catch (e) {
                    ws.removeEventListener("message", onMessage);
                    reject(new Error("Payload JSON parse error: " + e.message));
                }
            }
        };

        ws.addEventListener("message", onMessage);
    });
}

function isBusy(ws) {
    return new Promise((resolve, reject) => {
        if (!ws) return reject(new Error("WebSocket is not defined"));
        if (ws.readyState !== WebSocket.OPEN) return reject(new Error("WebSocket not open"));

        const onMessage = (event) => {
            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch {
                return; 
            }

            if (msg.Status === "OK" && typeof msg.Payload === "string") {
                ws.removeEventListener("message", onMessage);
                resolve(msg.Payload === "True"); 
            }
        };

        ws.addEventListener("message", onMessage);

        try {
            ws.send(JSON.stringify({ CMD: "IsBusy", Payload: "" }));
        } catch (err) {
            ws.removeEventListener("message", onMessage);
            reject(err);
        }
    });
}

