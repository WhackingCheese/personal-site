export function catchErrors(fn) {
    return (req, res) => fn(req, res);
}
