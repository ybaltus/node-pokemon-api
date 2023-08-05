module.exports = (app) => {
    app.get(`/`, async (req, res) => {
        res.send('Hello from Express!')
    })
}