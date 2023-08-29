const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({ origin: true }))

app.post('/authenticate', async (req, res) => {
    const { username } = req.body
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "private-key": process.env.PRIVATE_KEY } }
        );
        res.status(r?.status).json(r.data);
    } catch (e) {
        res.status(e.response.code).json(e.response.data)
    }
})

function Run() {
    const PORT = process.env.PORT ?? 8000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}

Run()