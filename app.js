const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // Ganti port sesuai kebutuhan

app.use(cors()); // Mengizinkan semua origin

// Route untuk menangani permintaan GET
app.get('/getEwalletAccount', async (req, res) => {
    const { bankCode, accountNumber } = req.query; // Ambil parameter dari query

    // Validasi parameter
    if (!bankCode || !accountNumber) {
        return res.status(400).json({ error: 'bankCode dan accountNumber Tolong Dilengkapi' });
    }

    try {
        const response = await axios.get(`https://api-rekening.lfourr.com/getEwalletAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`);
        res.json(response.data); // Kirim data dari API ke klien
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat menghubungi API' });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
