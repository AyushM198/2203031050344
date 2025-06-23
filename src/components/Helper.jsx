export const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
};

export const validateURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
