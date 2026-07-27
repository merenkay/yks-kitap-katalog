const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

// images klasörünün varlığından emin olalım
const uploadDir = path.join(__dirname, 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Dosya kaydetme ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Dosya adı: iso-tarih_orijinaladi.jpg şeklinde benzersiz kaydedilir
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname) || '.jpg';
        cb(null, `kitap_${uniquePrefix}${ext}`);
    }
});

const upload = multer({ storage: storage });

// Telefonda açılacak olan HTML arayüzü
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>YKS Kitap Foto Yükleyici</title>
            <style>
                body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f0f2f5; }
                .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; width: 80%; max-width: 400px; }
                input[type="file"] { display: none; }
                .btn { display: inline-block; padding: 15px 25px; background: #007bff; color: white; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; }
                #status { margin-top: 15px; font-weight: bold; color: #28a745; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>📷 Kitap Fotoğrafı Yükle</h2>
                <p>Çektiğin veya seçtiğin fotoğraflar anında bilgisayara aktarılır.</p>
                
                <!-- capture="environment" arka kamerayı doğrudan açmayı sağlar -->
                <label class="btn" for="fileInput">📸 Fotoğraf Çek / Seç</label>
                <input type="file" id="fileInput" accept="image/*" capture="environment" multiple onchange="uploadFiles()">
                
                <div id="status"></div>
            </div>

            <script>
                async function uploadFiles() {
                    const input = document.getElementById('fileInput');
                    const status = document.getElementById('status');
                    if (!input.files.length) return;

                    status.style.color = '#333';
                    status.innerText = 'Yükleniyor...';

                    for (let file of input.files) {
                        const formData = new FormData();
                        formData.append('photo', file);

                        try {
                            const res = await fetch('/upload', { method: 'POST', body: formData });
                            if (res.ok) {
                                status.style.color = '#28a745';
                                status.innerText = '✅ Başarıyla Yüklendi!';
                            } else {
                                status.style.color = '#dc3545';
                                status.innerText = '❌ Yükleme Hatası!';
                            }
                        } catch (err) {
                            status.style.color = '#dc3545';
                            status.innerText = '❌ Baglanti Hatasi!';
                        }
                    }
                    input.value = ''; // Input'u temizle ki üst üste rahat çekilsin
                }
            </script>
        </body>
        </html>
    `);
});

// Fotoğraf yükleme endpoint'i
app.post('/upload', upload.single('photo'), (req, res) => {
    console.log(`[+] Yeni fotoğraf kaydedildi: ${req.file.filename}`);
    res.json({ success: true, file: req.file.filename });
});

// Sunucuyu 3000 portunda başlat
app.listen(3000, '0.0.0.0', () => {
    console.log('--------------------------------------------------');
    console.log('🚀 Sunucu çalışıyor!');
    console.log('Local erişim: http://localhost:3000');
    console.log('--------------------------------------------------');
});