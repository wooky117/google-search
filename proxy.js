const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/autocomplete', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const response = await axios.get(`https://www.google.com/complete/search`, {
            params: { client: 'chrome', q: query },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching suggestions');
    }
});

app.listen(3000, () => console.log('Proxy server running on http://localhost:3000'));
