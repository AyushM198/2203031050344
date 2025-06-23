export const logEvent = (type, message, data) => {
    const log = {
        type,
        message,
        data,
        timestamp: new Date().toISOString(),
    };
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(log);
    localStorage.setItem('logs', JSON.stringify(logs));
};
