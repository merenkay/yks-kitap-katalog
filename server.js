const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

// images klasörünü kontrol et
const uploadDir = path.join(__dirname, 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Türkçe karakter temizleme
function sanitizeFilename(name) {
    if (!name) return '';
    return name
        .trim()
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-');
}

// Storage ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const rawName = req.query.customName || '';
        const customName = sanitizeFilename(rawName);
        const ext = path.extname(file.originalname) || '.jpg';
        
        // İsmi req nesnesine ekleyelim ki sonrasında .txt oluştururken de kullanalım
        const finalBaseName = customName ? customName : `kitap_${Date.now()}`;
        req.finalBaseName = finalBaseName;

        cb(null, `${finalBaseName}${ext}`);
    }
});

const upload = multer({ storage: storage });

// Telefonda açılacak sayfa
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>YKS Kitap Foto Yükleyici</title>
            <style>
                * { box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f0f2f5; padding: 20px; }
                .card { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; width: 100%; max-width: 420px; }
                h2 { margin-top: 0; color: #1a1a1a; font-size: 1.4rem; }
                p { color: #666; font-size: 0.9rem; margin-bottom: 20px; }
                .form-group { text-align: left; margin-bottom: 15px; }
                label { display: block; font-size: 0.85rem; font-weight: bold; margin-bottom: 6px; color: #444; }
                input[type="text"], select { width: 100%; padding: 12px; border: 2px solid #e1e4e8; border-radius: 10px; font-size: 1rem; outline: none; background: white; transition: border-color 0.2s; }
                input[type="text"]:focus, select:focus { border-color: #007bff; }
                input[type="file"] { display: none; }
                .btn-select { display: block; width: 100%; padding: 14px; background: #e7f0ff; color: #007bff; border-radius: 10px; font-weight: bold; cursor: pointer; text-align: center; margin-bottom: 15px; border: 2px dashed #007bff; }
                .btn-submit { width: 100%; padding: 14px; background: #007bff; color: white; border: none; border-radius: 10px; font-weight: bold; font-size: 1rem; cursor: pointer; }
                .btn-submit:disabled { background: #ccc; cursor: not-allowed; }
                #file-name-preview { font-size: 0.85rem; color: #28a745; margin-bottom: 15px; font-weight: 500; word-break: break-all; }
                #status { margin-top: 15px; font-weight: bold; padding: 10px; border-radius: 8px; font-size: 0.9rem; }
                .success { background: #d4edda; color: #155724; }
                .error { background: #f8d7da; color: #721c24; }
                .info { background: #cce5ff; color: #004085; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>📷 YKS Kitap Kayıt</h2>
                <p>Kitap bilgilerini girin ve fotoğrafını çekin.</p>
                
                <div class="form-group">
                    <label for="customName">Kitap Adı veya ISBN:</label>
                    <input type="text" id="customName" placeholder="Örn: 3d-fizik-ayt" autocomplete="off">
                </div>

                <div class="form-group">
                    <label for="usageStatus">Kullanım Durumu:</label>
                    <input type="text" id="usageStatus" placeholder="Örn: %10 çözüldü, Temiz, İlk 2 test dolu..." autocomplete="off">
                </div>

                <label class="btn-select" for="fileInput">📸 Fotoğraf Çek / Seç</label>
                <input type="file" id="fileInput" accept="image/*" capture="environment" onchange="previewFile()">
                
                <div id="file-name-preview"></div>

                <button class="btn-submit" id="uploadBtn" onclick="uploadFile()" disabled>🚀 Bilgisayara Kaydet</button>
                
                <div id="status"></div>
            </div>

            <script>
                function previewFile() {
                    const input = document.getElementById('fileInput');
                    const preview = document.getElementById('file-name-preview');
                    const uploadBtn = document.getElementById('uploadBtn');

                    if (input.files.length > 0) {
                        preview.innerText = "Seçilen Fotoğraf: Hazır";
                        uploadBtn.disabled = false;
                    } else {
                        preview.innerText = "";
                        uploadBtn.disabled = true;
                    }
                }

                async function uploadFile() {
                    const input = document.getElementById('fileInput');
                    const customNameInput = document.getElementById('customName');
                    const usageStatusInput = document.getElementById('usageStatus');
                    const status = document.getElementById('status');
                    const uploadBtn = document.getElementById('uploadBtn');

                    if (!input.files.length) return;

                    status.className = 'info';
                    status.innerText = 'Yükleniyor...';
                    uploadBtn.disabled = true;

                    const formData = new FormData();
                    formData.append('photo', input.files[0]);

                    const nameParam = encodeURIComponent(customNameInput.value);
                    const usageParam = encodeURIComponent(usageStatusInput.value);

                    try {
                        const url = \`/upload?customName=\${nameParam}&usage=\${usageParam}\`;
                        const res = await fetch(url, { method: 'POST', body: formData });
                        const data = await res.json();

                        if (res.ok && data.success) {
                            status.className = 'success';
                            status.innerText = '✅ Kaydedildi: ' + data.imageFile + ' & ' + data.txtFile;
                            
                            // Formu sıfırla
                            input.value = '';
                            customNameInput.value = '';
                            usageStatusInput.value = '';
                            document.getElementById('file-name-preview').innerText = '';
                        } else {
                            status.className = 'error';
                            status.innerText = '❌ Yükleme Hatası!';
                            uploadBtn.disabled = false;
                        }
                    } catch (err) {
                        status.className = 'error';
                        status.innerText = '❌ Bağlantı Hatası!';
                        uploadBtn.disabled = false;
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// Yükleme Endpoint'i
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Dosya yüklenemedi' });
    }

    const usageInfo = req.query.usage || 'Belirtilmedi';
    const baseName = req.finalBaseName;
    const txtFilePath = path.join(uploadDir, `${baseName}.txt`);

    // .txt Dosyasının İçeriği
    const txtContent = `Kitap Adı / ID: ${baseName}\nKullanım Durumu: ${usageInfo}\nKayıt Tarihi: ${new Date().toLocaleString('tr-TR')}`;

    // .txt Dosyasını Oluştur ve Yaz
    fs.writeFile(txtFilePath, txtContent, 'utf8', (err) => {
        if (err) {
            console.error('TXT oluşturma hatası:', err);
        } else {
            console.log(`[+] .txt dosyası oluşturuldu: images/${baseName}.txt`);
        }
    });

    console.log(`[+] Fotoğraf kaydedildi: images/${req.file.filename}`);
    
    res.json({ 
        success: true, 
        imageFile: req.file.filename,
        txtFile: `${baseName}.txt`
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('--------------------------------------------------');
    console.log('🚀 Sunucu çalışıyor!');
    console.log('--------------------------------------------------');
});