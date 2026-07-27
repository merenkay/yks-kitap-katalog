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
                    Kitap birden fazla branşı birden kapsıyorsa (ör. Fizik+Kimya+Biyoloji
                    ortak deneme kitabı) tek bir metin yerine dizi de yazabilirsin:
                    subject: ["Fizik", "Kimya", "Biyoloji"]
                    Bu kitap, üç branş filtresinden hangisi seçilirse seçilsin listede
                    görünür ve kartında/detayında üç branş etiketi de gösterilir.
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

                    Kitap artık internette satılmıyorsa / hiçbir yerde linkini
                    bulamadıysan (baskısı tükenmiş, sitesi kalkmış vb.):
                      originalPrice: null,
                      originalPriceLink: "",
                    şeklinde bırak. Bu durumda kartta/detayda orijinal fiyat
                    satırı hiç görünmez, sadece senin ikinci el satış fiyatın
                    gösterilir. Sakın rastgele bir sayı (ör. 0) ya da başka bir
                    kitabın linkini yapıştırma — yanlış/çalışmayan link
                    göstermektense hiç göstermemek daha doğru.
  - sellPrice     : Senin ikinci el satış fiyatın (sayı, TL). Zorunlu.
  - sold          : true/false - Kitap satıldıysa true yap, "SATILDI" etiketiyle görünür.
*/

/*
  SEPET / SİPARİŞ
  ================
  Ziyaretçi "Sepete Ekle" ile kitap seçip sepetini oluşturuyor. Sepet penceresinde
  sipariş metni bir kutuda gösteriliyor ve "WhatsApp'ta Paylaş" butonuna basınca
  WhatsApp açılıyor; ziyaretçi orada kendi rehberinden mesajı kime göndermek
  istediğini kendisi seçiyor (sabit bir numara tanımlamana gerek yok).
*/

const BOOKS = [
  {
    id: "kitap-001",
    title: "0`dan 10`a Kimya Konu Anlatımlı Soru Bankası Tonguç Akademi",
    publisher: "Tonguç Akademi",
    grade: 10,
    examType: "TYT",
    subject: "Kimya",
    condition: "Az Kullanılmış - Temiz",
    cover: "images/tonguc10kimya.jpg",
    images: [],
    description:
      "İlk 25sf çözülü, kitap 214sf. Cilt ve kapak sağlam.",
    originalPrice: 259,
    originalPriceLink: "https://www.kitapsec.com/Products/0dan-10a-Kimya-Konu-Anlatimli-Soru-Bankasi-Tonguc-Akademi-317870.html?srsltid=AfmBOoqIsVCwwzo6lPzKdx2zKFXnGvfJ8hCx53KPh1ajUgTy_JOGTbJc",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-002",
    title: "Çap Yayınları 10. Sınıf Fen Lisesi Kimya Soru Bankası",
    publisher: "Çap Yayınları",
    grade: 10,
    examType: "TYT",
    subject: "Kimya",
    condition: "İkinci El - İyi Durumda",
    cover: "images/cap10kimya.jpg",
    images: [],
    description:
      "Tamamı kurşun kalem ile çözülmüş, bazı sayfalarda notlar var. Cilt ve kapak sağlam.",
    originalPrice: 220,
    originalPriceLink: "https://www.trendyol.com/cap-yayinlari/cap-10-sinif-fen-lisesi-kimya-soru-bankasi-p-32937712",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-003",
    title: "0 dan 9 a Kimya Konu Anlatımlı Soru Bankası Tonguç Akademi",
    publisher: "Tonguç Akademi",
    grade: 9,
    examType: "TYT",
    subject: "Kimya",
    condition: "İkinci El - İyi Durumda",
    cover: "images/tonguc9kimya.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 269,
    originalPriceLink: "https://www.kitapsec.com/Products/0-dan-9-a-Kimya-Konu-Anlatimli-Soru-Bankasi-Tonguc-Akademi-374119.html?srsltid=AfmBOoobIkLhCouCSKfT8_a8bEt4D4PPsSgXeCz7HNtsDaGanIWHs3gF",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-004",
    title: "Orbital Yayınları 9. Sınıf Kimya Soru Bankası",
    publisher: "Orbital Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Kimya",
    condition: "İkinci El - İyi Durumda",
    cover: "images/orbital9kimya.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 449,
    originalPriceLink: "https://www.kitapisler.com/orbital-yayinlari-9-sinif-kimya-soru-bankasi_102167.html?srsltid=AfmBOoraFGtPblzxfBC0J3SOXIEChQvSaStrSC-4j-VEKz9PsDXSttsj",
    sellPrice: 150,
    sold: true
  },
  {
    id: "kitap-005",
    title: "ENS Yayıncılık 10. Sınıf Biyoloji Defter Kitap",
    publisher: "ENS Yayıncılık",
    grade: 10,
    examType: "TYT",
    subject: "Biyoloji",
    condition: "İkinci El - İyi Durumda",
    cover: "images/10-sinif-biyoloji-ens-yayinlari.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 215,
    originalPriceLink: "https://www.kitapisler.com/ens-yayincilik-10-sinif-biyoloji-defter-kitap_85443.html?srsltid=AfmBOooRbFeXjVRZht_vw5TxBR55-nbfvxTr5A7mrwgK7B0u2kcr_Hu9",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-006",
    title: "Palme 9. Sınıf Kimya Soru Kitabı Palme Yayınları",
    publisher: "Palme Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Kimya",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/palme-9-sinif-kimya-soru-bankasi.jpg",
    images: [],
    description:
      "İlk ünitesi çözülü. Cilt ve kapak sağlam.",
    originalPrice: 175,
    originalPriceLink: "https://www.indekskitap.com/urun/palme-9-sinif-kimya-soru-kitabi-palme-yayinlari?srsltid=AfmBOorWKyT3cfAkhdpG7niscuMwPriHHOTAJAPPVGdlwuscfn884aRn",
    sellPrice: 80,
    sold: false
  },
  {
    id: "kitap-007",
    title: "Bilgi Sarmal Yayınları TYT Fizik 40 x 7 Branş Denemeleri",
    publisher: "Bilgi Sarmal Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Fizik",
    condition: "Az Kullanılmış - Temiz",
    cover: "images/tyt-fizik-brans-denemeleri-bilgi-sarmal.jpg",
    images: [],
    description:
      "İlk 4 deneme çözülü, 36'sı boş. Cilt ve kapak sağlam.",
    originalPrice: 199,
    originalPriceLink: "https://www.kitapisler.com/bilgi-sarmal-yayinlari-tyt-fizik-40-x-7-brans-denemeleri_87359.html?srsltid=AfmBOorL6CaHHKpCeVAqY0o5ZkvlzEiGedbqMfutYRUkMyShCAEMvcKT",
    sellPrice: 50,
    sold: false
  },
  {
    id: "kitap-008",
    title: "Limit Yayınları TYT FKB 3 Ders + 4 Test = 7 Gün",
    publisher: "Limit Yayınları",
    grade: 12,
    examType: "TYT",
    subject: ["Fizik", "Kimya", "Biyoloji"],
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/tyt-fen-bilimleri-deneme-limit-yayinlari.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 100,
    originalPriceLink: "https://www.nadirkitap.com/limit-yayinlari-tyt-kronometre-fkb-fizik-kimya-biyoloji-3-4-7-gun-7-deneme-komisyon-kitap35501007.html?srsltid=AfmBOoos5p-1TGUetYW6w0LN7agqnBr8g2mJtklhGuGF_yv4cCko4jqN",
    sellPrice: 30,
    sold: false
  },
  {
    id: "kitap-009",
    title: "Kafa Dengi TYT Fizik Temel ve Orta Düzey Soru Bankası",
    publisher: "Kafa Dengi",
    grade: "Genel",
    examType: "TYT",
    subject: "Fizik",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/tyt-fizik-kafadengi.jpg",
    images: [],
    description:
      "Sadece dalgalar çözülmüş, tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 525,
    originalPriceLink: "https://www.kitapisler.com/kafa-dengi-yayinlari-tyt-fizik-temel-ve-orta-duzey-soru-bankasi_53764.html",
    sellPrice: 200,
    sold: false
  },
  {
    id: "kitap-010",
    title: "TYT AYT Fizik Son 20 Yıl Konularına Göre Çıkmış Sorular ve Çözümleri A Yayınları",
    publisher: "A Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "Fizik",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/tyt-ayt-fi-zi-k-son-20-yil-cikmis-sorular.jpg",
    images: [],
    description:
      "Tamamı tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 120,
    originalPriceLink: "https://www.kitapsec.com/Products/TYT-AYT-Fizik-Son-20-Yil-Konularina-Gore-Cikmis-Sorular-ve-Cozumleri-A-Yayinlari-393967.html?srsltid=AfmBOorV_caITc6Yte_PyPCSDImSiqaUTcZIr5J6gOMxVKVgiFKG8eFg",
    sellPrice: 40,
    sold: false
  },
  {
    id: "kitap-011",
    title: "10. Sınıf Tarih Özet Pano Yayınları",
    publisher: "Pano Yayınları",
    grade: 10,
    examType: "TYT",
    subject: "Tarih",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/10-sinif-tarih-ozet-atlasi.jpg",
    images: [],
    description:
      "Tamamı tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 120,
    originalPriceLink: "https://www.kitapsec.com/Products/10-Sinif-Tarih-Ozet-Pano-Yayinlari-546423.html?srsltid=AfmBOooq1mwL_5ssGfn2ubbEpllSXCBzvlSKmgH83eoCHrjmTXidwcEg",
    sellPrice: 20,
    sold: false
  },
  {
    id: "kitap-012",
    title: "9. Sınıf Biyoloji Soru Bankası Robert Yayınları",
    publisher: "Robert Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Biyoloji",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/9-sinif-biyoloji-soru-bankasi-robert-koleji-yayinlari.jpg",
    images: [],
    description:
      "Tamamı tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 52,
    originalPriceLink: "https://www.kitapsec.com/Products/9-Sinif-Biyoloji-Soru-Bankasi-Robert-Koleji-Yayinlari-546424.html?srsltid=AfmBOooq1mwL_5ssGfn2ubbEpllSXCBzvlSKmgH83eoCHrjmTXidwcEg",
    sellPrice: 40,
    sold: false
  },
  {
    id: "kitap-013",
    title: "Yayın Denizi 9. Sınıf Biyoloji Pro Soru Bankası",
    publisher: "Yayın Denizi",
    grade: 9,
    examType: "TYT",
    subject: "Biyoloji",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/9-sinif-biyoloji-yayindenizi-soru-bankasi.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 199,
    originalPriceLink: "https://www.kitapisler.com/yayin-denizi-9-sinif-biyoloji-pro-soru-bankasi_66591.html?srsltid=AfmBOorJtpghOLTr_R0KpQrrNwKR8KO_In_TQy7yWgUfY_RmXuSeVve9",
    sellPrice: 80,
    sold: false
  },
  {
    id: "kitap-014",
    title: "Biyotik Yayınları 9. Sınıf Biyoloji 25 x 11 Biyotik Tarama Testleri",
    publisher: "Biyotik Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Biyoloji",
    condition: "Bir kısmı eksik - İyi Durumda",
    cover: "images/biyotik-9-sinif-biyoloji-deneme.jpg",
    images: [],
    description:
      "Sadece 5 tane denemesi kalmış. Tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 95,
    originalPriceLink: "https://www.kitapisler.com/biyotik-yayinlari-9-sinif-biyoloji-25-x-11-biyotik-tarama-testleri_66604.html?srsltid=AfmBOoqfF4s9YqaIZnWFeaJw5cs7PHkOPC6WsCYr1LlZ-gMkFIOX2XOf",
    sellPrice: 10,
    sold: false
  },
  {
    id: "kitap-015",
    title: "Yayın Denizi 10x40 AYT Matematik Denemeleri",
    publisher: "Yayın Denizi",
    grade: "Genel",
    examType: "AYT",
    subject: "Matematik",
    condition: "Bir kısmı eksik - İyi Durumda",
    cover: "images/yayindenizi-6-adet-ayt-mat-deneme.jpg",
    images: [],
    description:
      "Sette 6 adet deneme kalmış. Tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 0,
    originalPriceLink: "",
    sellPrice: 10,
    sold: false
  },
  {
    id: "kitap-016",
    title: "Bilgi Sarmal 9. Sınıf Matematik Soru Bankası",
    publisher: "Bilgi Sarmal Yayınları",
    grade: 9,
    examType: "AYT",
    subject: "Matematik",
    condition: "Az çözülmüş - İyi Durumda",
    cover: "images/9-sinif-matematik-soru-bankasi-bilgi-sarmal.jpg",
    images: [],
    description:
      "İlk ünitesi çözülü gerisi tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 619,
    originalPriceLink: "https://www.kitapisler.com/bilgi-sarmal-9-sinif-matematik-soru-bankasi_97524.html?srsltid=AfmBOooL7lL_0YAPUscJ5fnks98DUi5W42QQFZX2E4Qsdqa7mbe6qvFK",
    sellPrice: 150,
    sold: false
  },
  {
    id: "kitap-017",
    title: "9. Sınıf Matematik Soru Kütüphanesi PRF Paraf Yayınları Kampanyalı",
    publisher: "Paraf Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Matematik",
    condition: "Az çözülmüş - İyi Durumda",
    cover: "images/9-sinif-matematik-soru-fasikulu-prf-yayinlari.jpg",
    images: [],
    description:
      "Birkaç fasikül çözülü gerisi tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 75,
    originalPriceLink: "https://www.kitapsec.com/Products/9-Sinif-Matematik-Soru-Kutuphanesi-PRF-Paraf-Yayinlari-Kampanyali-530862.html?srsltid=AfmBOoojbQOWVsNyKam0SpzATDpvRCRqOxzYx3hiqOf6S9RKGAO1wgqQ",
    sellPrice: 30,
    sold: false
  },
  {
    id: "kitap-018",
    title: "Bilgi Sarmal 10. Sınıf Matematik Soru Bankası",
    publisher: "Bilgi Sarmal Yayınları",
    grade: 10,
    examType: "TYT",
    subject: "Matematik",
    condition: "İkinci El - İyi Durumda",
    cover: "images/10-sinif-matematik-bilgi-sarmal.jpg",
    images: [],
    description:
      "%35 çözülü. Kapakta görseldeki gibi ufak yıpranmalar var.",
    originalPrice: 685,
    originalPriceLink: "https://www.kitapisler.com/bilgi-sarmal-10-sinif-matematik-soru-bankasi_102574.html?srsltid=AfmBOornguQV49VsM8ABXhkrsK9QnGP1zSxKzIwvn4Ib73x48hjLKD9S",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-019",
    title: "Yayın Denizi Yayınları 9.Sınıf Tek Serisi Video Çözümlü Fizik Soru Bankası",
    publisher: "Yayın Denizi",
    grade: 9,
    examType: "TYT",
    subject: "Fizik",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/9-sinif-fizik-soru-bankasi-yayindenizi.jpg",
    images: [],
    description:
      "Tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 685,
    originalPriceLink: "https://www.hepsiburada.com/yayin-denizi-yayinlari-9-sinif-tek-serisi-video-cozumlu-fizik-soru-bankasi-pm-HB00000EUO8S",
    sellPrice: 100,
    sold: false
  },
  {
    id: "kitap-020",
    title: "9. Sınıf Fen Lisesi Fizik Soru Bankası Çap Yayınları",
    publisher: "Çap Yayınları",
    grade: 9,
    examType: "TYT",
    subject: "Fizik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/9-sinif-fizik-soru-bankasi-cap-yayinlari.jpg",
    images: [],
    description:
      "İlk 8 test çözülü. Cilt ve kapak sağlam.",
    originalPrice: 49,
    originalPriceLink: "https://kitapsec.com/Products/9-Sinif-Fen-Lisesi-Fizik-Soru-Bankasi-Cap-Yayinlari-373845.html?srsltid=AfmBOoqTWlijj4pPnBs8hSkFgYmXSZInIO2AjEpRzdo8fIPAOAImIPJ6https://kitapsec.com/Products/9-Sinif-Fen-Lisesi-Fizik-Soru-Bankasi-Cap-Yayinlari-373845.html?srsltid=AfmBOoqTWlijj4pPnBs8hSkFgYmXSZInIO2AjEpRzdo8fIPAOAImIPJ6",
    sellPrice: 20,
    sold: false
  },
  {
    id: "kitap-021",
    title: "Bilgi Sarmal 10. Sınıf Fizik Soru Bankası",
    publisher: "Bilgi Sarmal Yayınları",
    grade: 10,
    examType: "TYT",
    subject: "Fizik",
    condition: "İkinci el - İyi Durumda",
    cover: "images/10-sinif-fizik-bilgi-sarmal.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 519,
    originalPriceLink: "https://www.kitapisler.com/bilgi-sarmal-10-sinif-fizik-soru-bankasi_102288.html?srsltid=AfmBOop10aStZ8dpqaOrrgqRScYEqEVY9R1UkLMvUFvaGC5zoLJFcbTe",
    sellPrice: 60,
    sold: false
  },
  {
    id: "kitap-022",
    title: "Orijinal Yayınları TYT AYT Geometri Soru Bankası",
    publisher: "Orijinal Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "Geometri",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/orijinal-tyt-ayt-geometri-soru-bankasi.jpg",
    images: [],
    description:
      "İlk ünitesi çözülü gerisi tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 519,
    originalPriceLink: "https://www.kitapisler.com/orijinal-yayinlari-tyt-ayt-geometri-soru-bankasi_84329.html?srsltid=AfmBOoo-gcj4oTlY3qErG3BMED9dPVAKcQMjnWrdkcRIPIEwTwKCYtOs",
    sellPrice: 180,
    sold: false
  },
  {
    id: "kitap-023",
    title: "Nihat Bilgin Yayınları 11. Sınıf Fizik Soru Kitabı",
    publisher: "Nihat Bilgin Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Fizik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/11-sinif-fizik-soru-bankasi-nihat-bilgin.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 475,
    originalPriceLink: "https://www.kitapisler.com/nihat-bilgin-yayinlari-11-sinif-fizik-soru-kitabi_91834.html?srsltid=AfmBOooaBeRa1Tif6yhE2iVL8PKitEdxUbKOwSYEZ4QpLfP8CyaJ9WwZ",
    sellPrice: 150,
    sold: false
  },
  {
    id: "kitap-024",
    title: "Nihat Bilgin Yayınları 11. Sınıf Fizik Soru Kitabı",
    publisher: "Nihat Bilgin Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Fizik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/11-sinif-fizik-soru-bankasi-nihat-bilgin.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 475,
    originalPriceLink: "https://www.kitapisler.com/nihat-bilgin-yayinlari-11-sinif-fizik-soru-kitabi_91834.html?srsltid=AfmBOooaBeRa1Tif6yhE2iVL8PKitEdxUbKOwSYEZ4QpLfP8CyaJ9WwZ",
    sellPrice: 150,
    sold: false
  }
];
