# YKS Kitap Kataloğum

TYT/AYT kitaplarını sınıf, sınav türü ve branşa göre filtreleyip fiyata göre
sıralayabildiğin, sade bir ikinci el katalog sitesi. Sunucu/veritabanı yok,
build aracı yok — düz HTML/CSS/JS. Bu yüzden Netlify'a saniyeler içinde
yüklenebilir.

## Dosya yapısı

```
index.html        -> Sayfanın iskeleti
css/style.css      -> Tüm görünüm/tasarım
js/data.js         -> KİTAP VERİLERİ (sen burayı düzenleyeceksin)
js/app.js          -> Filtreleme/sıralama/modal mantığı (genelde dokunmana gerek yok)
images/            -> Kapak ve diğer görseller için klasör
netlify.toml       -> Netlify'a "bu klasörü olduğu gibi yayınla" talimatı
```

## Kitap ekleme / düzenleme

Tüm kitaplar `js/data.js` içindeki `BOOKS` listesinde. Yeni bir kitap eklemek
için listeye şuna benzer bir blok eklemen yeterli (dosyanın içinde her alanın
ne işe yaradığı ayrıntılı yorum olarak yazıyor):

```js
{
  id: "kitap-009",
  title: "TYT Kimya Soru Bankası",
  publisher: "Örnek Yayınları",
  grade: 10,                 // 9, 10, 11, 12 veya "Genel"
  examType: "TYT",           // "TYT" | "AYT" | "TYT-AYT"
  subject: "Kimya",
  condition: "Az Kullanılmış - Temiz",
  cover: "images/kimya.jpg", // veya doğrudan internet linki
  images: [],                // ek fotoğraflar (opsiyonel)
  description: "Kitap hakkında açıklama...",
  originalPrice: 150,
  originalPriceLink: "https://ornekyayin.com/urun",
  sellPrice: 60,
  sold: false
}
```

## Sepet ve WhatsApp'tan sipariş

Ziyaretçiler beğendikleri kitapları "Sepete Ekle" ile sepetlerine ekleyip, sağ
alttaki 🛒 **Sepet** butonundan sepetlerini görüp **"WhatsApp'tan Sipariş
Ver"** butonuyla sana doğrudan WhatsApp üzerinden, seçtiği kitapların ve
toplam tutarın yazılı olduğu hazır bir mesaj gönderebiliyor (ödeme/kargo
kısmını sen mesajlaştıktan sonra ayarlarsın — statik bir sitede gerçek bir
ödeme sistemi kurmak mümkün olmadığı için en pratik ve güvenilir yöntem bu).
Sepet, ziyaretçinin tarayıcısında saklanır; sayfayı kapatıp açsa bile kaybolmaz.

Mesajın **senin** WhatsApp'ına gitmesi için `js/data.js` dosyasının en üstündeki

```js
const SELLER_WHATSAPP_NUMBER = "905XXXXXXXXX";
```

satırını kendi numaranla değiştirmen gerekiyor. Numaranı başında ülke kodu
(Türkiye için 90) olacak şekilde, boşluksuz ve `+` işaretsiz yaz. Örneğin
telefon numaran `05XX XXX XX XX` ise, baştaki `0`'ı silip yerine `90` koyarak
`"905XXXXXXXXX"` şeklinde yazman yeterli.

Branş filtresi listedeki kitaplardan **otomatik** oluşturulur; yeni bir branş
yazman yeterli, filtreye elle eklemene gerek yok.

## Bilgisayarında test etme

`index.html` dosyasına çift tıklayıp tarayıcıda açman yeterli — hiçbir kurulum
gerektirmez. (İstersen VS Code'daki "Live Server" eklentisiyle de açabilirsin,
ikisi de çalışır.)

## Netlify üzerinden ücretsiz yayınlama

İki kolay yöntem var. Git/GitHub bilmiyorsan **Yöntem 1**'i kullan.

### Yöntem 1 — Netlify Drop (en kolay, hesap sonrası 30 saniye)

1. https://app.netlify.com adresine gidip ücretsiz bir hesap oluştur
   (Google/GitHub/e-posta ile).
2. Giriş yaptıktan sonra sol menüden **"Add new site" → "Deploy manually"**
   seçeneğine gir (veya doğrudan https://app.netlify.com/drop sayfasını aç).
3. Bilgisayarındaki proje klasörünü (`ykskitapkatalog`) doğrudan sürükleyip
   o sayfadaki kutuya bırak.
4. Birkaç saniye içinde siten `https://rastgele-isim-1234.netlify.app` gibi
   bir adreste yayına girer.
5. Site adını değiştirmek istersen: **Site settings → Change site name**.
6. Kitap listesini güncellediğinde (js/data.js'i düzenleyip kaydettiğinde),
   tüm klasörü tekrar aynı şekilde siteye sürükleyip bırakman yeterli —
   Netlify eski sürümü yenisiyle değiştirir.

### Yöntem 2 — GitHub üzerinden bağlama (otomatik güncelleme ister­sen)

Bu yöntemde her `git push` yaptığında site otomatik güncellenir.

1. Bu klasörü bir GitHub deposuna yükle (GitHub Desktop veya `git` komutlarıyla).
2. https://app.netlify.com üzerinde **"Add new site" → "Import an existing
   project"** seç, GitHub hesabını bağla ve ilgili depoyu seç.
3. Ayarlar ekranında:
   - Build command: **boş bırak**
   - Publish directory: **`.`** (kök dizin)
   (Bu proje zaten `netlify.toml` içinde bu ayarları taşıdığı için Netlify
   çoğu zaman bunları otomatik doldurur.)
4. **Deploy site** butonuna bas. Birkaç saniye içinde site yayında olur.
5. Sonraki güncellemeler için sadece `js/data.js` dosyasını düzenleyip GitHub'a
   push etmen yeterli, Netlify otomatik olarak yeniden yayınlar.

### Notlar

- Netlify'ın ücretsiz planı kişisel bir katalog sitesi için fazlasıyla yeterli
  (aylık 100 GB trafik gibi cömert bir limit var, kredi kartı istemiyor).
- İstersen **Site settings → Domain management** üzerinden kendi
  `.com` alan adını da (satın alarak) bağlayabilirsin; bu da ücretsiz planda
  desteklenir, sadece alan adının kendisi ücretlidir.
- Görselleri `images/` klasörüne koyup projeyle birlikte yüklersen (Yöntem 1)
  ya da repoya ekleyip push edersen (Yöntem 2), Netlify onları da otomatik
  yayınlar — ayrıca bir resim barındırma servisine ihtiyacın yok.
