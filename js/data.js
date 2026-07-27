/*
  KİTAP VERİLERİ
  ================
  Kataloğa yeni kitap eklemek için aşağıdaki listeye (BOOKS) yeni bir { ... }
  bloğu eklemen yeterli. Bir kitabı silmek için ilgili bloğu kaldır.

  Alan açıklamaları:
  - id            : Benzersiz bir metin/numara (ör: "kitap-009"). Her kitapta farklı olmalı.
  - title         : Kitabın adı.
  - publisher     : Yayınevi (opsiyonel, boş bırakılabilir "").
  - grade         : 9, 10, 11, 12 veya birden fazla sınıfa hitap ediyorsa "Genel".
  - examType      : "TYT", "AYT" veya her ikisini de kapsıyorsa "TYT-AYT".
  - subject       : Branş adı (Türkçe, Matematik, Geometri, Fizik, Kimya, Biyoloji,
                    Tarih, Coğrafya, Felsefe, Din Kültürü, İngilizce, Edebiyat, vb.)
                    Kendi branşlarını serbestçe yazabilirsin, filtre listesi otomatik oluşur.
  - condition     : Kullanım durumu, serbest metin. Örn:
                    "Sıfır (Hiç Kullanılmamış)", "Az Kullanılmış - Temiz",
                    "Kullanılmış - İyi Durumda", "Kullanılmış - Bazı Sayfalar Yazılı"
  - cover         : Kapak fotoğrafının yolu/linki. "images/" klasörüne koyduğun bir
                    dosya olabilir (ör: "images/tyt-matematik.jpg") ya da doğrudan
                    internetten bir görsel linki olabilir.
  - images        : Ek görseller (iç sayfalar, yıpranma detayı vb.) - dizi halinde.
                    Boş bırakmak istersen: []
  - description   : Kitap açıklaması (konu kapsamı, neden sattığın, notların vb.)
  - originalPrice : Kitabın orijinal/yeni fiyatı (sayı, TL). Bilmiyorsan null yaz.
  - originalPriceLink : Orijinal fiyatın görülebileceği/satın alınabileceği çalışan
                    link (yayınevi sitesi, kitapyurdu, trendyol vb.). Yoksa "" bırak.
  - sellPrice     : Senin ikinci el satış fiyatın (sayı, TL). Zorunlu.
  - sold          : true/false - Kitap satıldıysa true yap, "SATILDI" etiketiyle görünür.
*/

const BOOKS = [
  {
    id: "kitap-001",
    title: "TYT Matematik Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Matematik",
    condition: "Az Kullanılmış - Temiz",
    cover: "images/tyt-matematik.jpg",
    images: [],
    description:
      "TYT matematik müfredatının tamamını konu anlatımlı özetlerle destekleyen soru bankası. İçinde birkaç sayfada kurşun kalemle çözüm notu var, silinmiş durumda. Cilt ve kapak sağlam.",
    originalPrice: 180,
    originalPriceLink: "https://www.3dyayinlari.com/",
    sellPrice: 90,
    sold: false
  },
  {
    id: "kitap-002",
    title: "AYT Geometri Konu Anlatımlı",
    publisher: "Palme Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Geometri",
    condition: "Sıfır (Hiç Kullanılmamış)",
    cover: "images/ayt-geometri.jpg",
    images: [],
    description:
      "Hiç açılmamış, folyosu yeni çıkarılmış. AYT geometri konularının tamamı örnek çözümlerle anlatılıyor.",
    originalPrice: 150,
    originalPriceLink: "https://www.palmeyayincilik.com.tr/",
    sellPrice: 110,
    sold: false
  },
  {
    id: "kitap-003",
    title: "TYT-AYT Fizik Formül Kitapçığı",
    publisher: "Endemik Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "Fizik",
    condition: "Kullanılmış - İyi Durumda",
    cover: "images/fizik-formul.jpg",
    images: [],
    description:
      "Cep boyutunda formül kitapçığı, sınav öncesi hızlı tekrar için idealdi. Kapağında hafif köşe kıvrılması var.",
    originalPrice: 60,
    originalPriceLink: "",
    sellPrice: 25,
    sold: false
  },
  {
    id: "kitap-004",
    title: "10. Sınıf Türkçe Konu Anlatım Föyleri",
    publisher: "Bilfen Yayıncılık",
    grade: 10,
    examType: "TYT",
    subject: "Türkçe",
    condition: "Kullanılmış - Bazı Sayfalar Yazılı",
    cover: "images/10-turkce.jpg",
    images: [],
    description:
      "Paragraf, dil bilgisi ve anlam bilgisi konularını kapsayan föy seti. Bazı sayfalarda kendi el yazım notlarım var, fotokopiyle çekip temiz halini de kullanabilirsin.",
    originalPrice: 120,
    originalPriceLink: "",
    sellPrice: 45,
    sold: true
  },
  {
    id: "kitap-005",
    title: "AYT Kimya Soru Bankası",
    publisher: "Acil Yayınları",
    grade: 12,
    examType: "AYT",
    subject: "Kimya",
    condition: "Az Kullanılmış - Temiz",
    cover: "images/ayt-kimya.jpg",
    images: [],
    description:
      "Modern kimya, kimyasal tepkimeler ve organik kimya konularını içeren geniş soru bankası. Çözümlü.",
    originalPrice: 165,
    originalPriceLink: "https://www.acilyayinlari.com/",
    sellPrice: 70,
    sold: false
  },
  {
    id: "kitap-006",
    title: "9. Sınıf Biyoloji Konu Anlatımlı",
    publisher: "Aydın Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Biyoloji",
    condition: "Sıfır (Hiç Kullanılmamış)",
    cover: "images/9-biyoloji.jpg",
    images: [],
    description:
      "9. sınıf müfredatına uygun, bol görselli konu anlatım kitabı. Kullanılmadı.",
    originalPrice: 140,
    originalPriceLink: "",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-007",
    title: "TYT Tarih Kampı",
    publisher: "Tonguç Akademi",
    grade: "Genel",
    examType: "TYT",
    subject: "Tarih",
    condition: "Kullanılmış - İyi Durumda",
    cover: "images/tyt-tarih.jpg",
    images: [],
    description:
      "Kısa ve öz konu anlatımlarıyla TYT tarih konularını tek kitapta topluyor. Kapak köşeleri hafif yıpranmış.",
    originalPrice: 95,
    originalPriceLink: "",
    sellPrice: 40,
    sold: false
  },
  {
    id: "kitap-008",
    title: "AYT Edebiyat Soru Bankası",
    publisher: "Karekök Yayınları",
    grade: 12,
    examType: "AYT",
    subject: "Edebiyat",
    condition: "Az Kullanılmış - Temiz",
    cover: "images/ayt-edebiyat.jpg",
    images: [],
    description:
      "Edebi sanatlar, akımlar ve dönemler konularını kapsayan çözümlü soru bankası.",
    originalPrice: 155,
    originalPriceLink: "https://www.karekokyayinlari.com.tr/",
    sellPrice: 65,
    sold: false
  }
];
