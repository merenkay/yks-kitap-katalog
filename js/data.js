/*
  KİTAP VERİLERİ
  ================
  Kataloğa yeni kitap eklemek için aşağıdaki listeye (BOOKS) yeni bir { ... }
  bloğu eklemen yeterli. Bir kitabı silmek için ilgili bloğu kaldır.

  Alan açıklamaları:
  - id            : ARTIK OPSİYONEL — yazmasan da olur, tamamen silebilirsin.
                    Boş bırakırsan kitabın adından otomatik ve kalıcı bir id
                    üretilir (aynı başlık her zaman aynı id'yi verir, kitap
                    sırası değişse/araya yeni kitap eklesen bile bozulmaz).
                    Sepet ve "bu kitabı paylaş" linkleri bu id'yi kullanıyor,
                    bu yüzden bir kitabı ekledikten sonra title'ını değiştirirsen
                    o kitaba önceden paylaşılmış linkler/sepetler geçersiz olur
                    (siteyi bozmaz, sadece o eski link artık o kitabı açmaz).
                    İstersen yine de elle kendi id'ini de yazabilirsin.
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
    sold: false
  },
  {
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
    sellPrice: 180,
    sold: false
  },
  {
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
    title: "Nihat Bilgin Yayınları 11. Sınıf Fizik Soru Kitabı",
    publisher: "Nihat Bilgin Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Fizik",
    condition: "İkinci el - İyi Durumda",
    cover: "images/11-sinif-fizik-soru-bankasi-nihat-bilgin.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 475,
    originalPriceLink: "https://www.kitapisler.com/nihat-bilgin-yayinlari-11-sinif-fizik-soru-kitabi_91834.html?srsltid=AfmBOooNv7ZK1fh2H-1sRb5dR-KpVuRJb-dbub_wCsNtpUoZckmDxzJs",
    sellPrice: 180,
    sold: false
  },
  {
    title: "Apotemi Modern Kimya",
    publisher: "Apotemi Yayınları",
    grade: 12,
    examType: "AYT",
    subject: "Kimya",
    condition: "İkinci el - İyi Durumda",
    cover: "images/apotemi-modern-kimya.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 479,
    originalPriceLink: "https://www.kitapisler.com/apotemi-modern-kimya_68172.html?srsltid=AfmBOoqw2f51Uya79bmNZQyBv6uk9hwwFzhBeEKlHTNHKs_L69fpaPxL",
    sellPrice: 120,
    sold: false
  },
  {
    title: "Limit Yayınları 11. Sınıf Fizik Soru Bankası",
    publisher: "Limit Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Kimya",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/11-limit-kimya.jpg",
    images: [],
    description:
      "Sadece ilk 2 sayfa çözülü. Cilt ve kapak sağlam.",
    originalPrice: 498,
    originalPriceLink: "https://www.kitapisler.com/limit-yayinlari-11-sinif-fizik-soru-bankasi_74021.html",
    sellPrice: 130,
    sold: false
  },
  {
    title: "Bilgi Sarmal AYT Matematik Soru Bankası",
    publisher: "Bilgi Sarmal Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Matematik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/bilgisarmal-ayt-matematik.jpg",
    images: [],
    description:
      "%35 çözülü. Cilt ve kapak sağlam.",
    originalPrice: 519,
    originalPriceLink: "https://www.kitapisler.com/bilgi-sarmal-ayt-matematik-soru-bankasi_83842.html",
    sellPrice: 170,
    sold: false
  },
  {
    title: "Aydın Yayınları AYT 12. Sınıf Kimya Ders İşleyiş Modülleri",
    publisher: "Aydın Yayınları",
    grade: 12,
    examType: "AYT",
    subject: "Kimya",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/12-ayt-kimya-aydin.jpg",
    images: [],
    description:
      "3 kitapçıktan 1'i çözülü. Cilt ve kapak sağlam.",
    originalPrice: 358,
    originalPriceLink: "https://www.kitapisler.com/aydin-yayinlari-ayt-12-sinif-kimya-ders-isleyis-modulleri_89789.html?srsltid=AfmBOorXBpQWJ2KztK0bB-1dDGzsu8sOGoBxsFPu4HQ9vH4p2xwaMj-o",
    sellPrice: 70,
    sold: false
  },
  {
    title: "Aydın Yayınları AYDIN 11. SINIF FİZİK KONU ÖZETLİ SORU BANKASI",
    publisher: "Aydın Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Fizik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/11-fizik-aydin.jpg",
    images: [],
    description:
      "Sadece vektörler çözülü gerisi tertemiz. Cilt ve kapak sağlam.",
    originalPrice: 355,
    originalPriceLink: "https://www.trendyol.com/aydin-yayinlari/aydin-11-sinif-fizik-konu-ozetli-soru-bankasi-2025-2026-guncel-baski-p-759768852",
    sellPrice: 80,
    sold: false
  },
  {
    title: "Apotemi Biyoloji Sistemler Konu Özetli Soru Bankası",
    publisher: "Apotemi Yayınları",
    grade: 11,
    examType: "AYT",
    subject: "Biyoloji",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/apotemi-sistemler.jpg",
    images: [],
    description:
      "Sinir endokrin ve dolaşımın bir kısmı çözülü kalanı tertemiz güncel kitap. Cilt ve kapak sağlam.",
    originalPrice: 479,
    originalPriceLink: "https://www.kitapisler.com/apotemi-biyoloji-sistemler-konu-ozetli-soru-bankasi_52288.html?srsltid=AfmBOoqTpAcpeWNItaXlqrNbkcpXVyJfRlsT2dorhf1YXogZ7AhMpHP9",
    sellPrice: 180,
    sold: false
  },
  {
    title: "Apotemi Trigonometri",
    publisher: "Apotemi Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Matematik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/apotemi-trigonometri.jpg",
    images: [],
    description:
      "%35 çözülü kurşun kalemle çözülüp silinmiş yerler var. Cilt ve kapak sağlam.",
    originalPrice: 359,
    originalPriceLink: "https://www.kitapisler.com/apotemi-trigonometri_78488.html?srsltid=AfmBOopF-VHLNVim53s4mkjqFhjg1rqbIxogXibxHNMsZ6CT6wDf_F9B",
    sellPrice: 130,
    sold: false
  },
  {
    title: "Apotemi Yayınları TYT Biyoloji Soru Bankası",
    publisher: "Apotemi Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Biyoloji",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/tyt-biyoloji-apotemi.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 479,
    originalPriceLink: "https://www.kitapisler.com/apotemi-yayinlari-tyt-biyoloji-soru-bankasi_78396.html?srsltid=AfmBOop-oLNeUyDPJZFmxXP64MK5adTwcI2qM6bokOHjqaDNd2_nhe1V",
    sellPrice: 260,
    sold: false
  },
  {
    title: "Apotemi Yayınları TYT Türkçe Soru Bankası",
    publisher: "Apotemi Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Türkçe",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/apotemi-tyt-turkce.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 639,
    originalPriceLink: "https://www.kitapisler.com/apotemi-yayinlari-tyt-turkce-soru-bankasi_92519.html?srsltid=AfmBOoqKfu7ovFh5Wa7LeQokm6wipt-vuVbanga_oKH8K2U3D_2YQVGG",
    sellPrice: 260,
    sold: false
  },
  {
    title: "3D Yayınları TYT Kimya Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Kimya",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/3d-tyt-kimya.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 498,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-tyt-kimya-soru-bankasi_84518.html?srsltid=AfmBOooP1JIUlZMLSBVoommulUn-jKVkLh1ZD5iUeURkIXNuA0MUwJif",
    sellPrice: 260,
    sold: false
  },
  {
    title: "3D Yayınları TYT Biyoloji Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Biyoloji",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/3d-tyt-biyoloji.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 496,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-tyt-biyoloji-soru-bankasi_84522.html?srsltid=AfmBOoq86SNLgwT_lZo_y3bPPgl0evUQLUHdpZy14J6ljSGSaHFkOpwy",
    sellPrice: 260,
    sold: false
  },
  {
    title: "3D Yayınları TYT Türkçe Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Türkçe",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/3d-tyt-turkce-soru-bankasi.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 580,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-tyt-turkce-soru-bankasi_84512.html?srsltid=AfmBOopMXe9Q62CqdmXsYUT_puzM1xwhn8YA1NGiak98RYivGJRRcyPk",
    sellPrice: 190,
    sold: false
  },
  {
    title: "3D Yayınları TYT Matematik Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Matematik",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/3d-tyt-matematik.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 580,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-tyt-matematik-soru-bankasi_84515.html?srsltid=AfmBOor0Eov9Pe_xVwmp-k0boCOO86C3LYuFfo2ZrXOb5zXLyzPOGoTc",
    sellPrice: 280,
    sold: false
  },
  {
    title: "3D Yayınları AYT Matematik Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Matematik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/3d-ayt-matematik.jpg",
    images: [],
    description:
      "%65 kurşun kalem ile çözülü. Cilt ve kapak sağlam.",
    originalPrice: 514,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-ayt-matematik-soru-bankasi_84524.html?srsltid=AfmBOop_5M2YImqK1xZoDmgdQmDWVLqc12XVADTShycubHuwJNM2HRXF",
    sellPrice: 190,
    sold: false
  },
  {
    title: "Ulti Yayınları TYT Tarih Branş Denemeleri",
    publisher: "Ulti Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: "Tarih",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/ulti-tyt-tatih-deneme.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 135,
    originalPriceLink: "https://www.kitapisler.com/ulti-yayinlari-tyt-tarih-brans-denemeleri_95634.html?srsltid=AfmBOooGJY3z1bD_RXhVlWU6vrE7cgvZvFrNEYu1J0eLwsmkbQMBwFzZ",
    sellPrice: 50,
    sold: false
  },
  {
    title: "3D Yayınları TYT Fen Bilimleri Simülasyon 15 Deneme",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT",
    subject: ["Fizik", "Kimya", "Biyoloji"],
    condition: "Bir kısmı eksik - İyi Durumda",
    cover: "images/3d-tyt-fen-deneme.jpg",
    images: [],
    description:
      "İçinde 4-5 denemesi kalmış. Cilt ve kapak sağlam.",
    originalPrice: 236,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-tyt-fen-bilimleri-simulasyon-15-deneme_92461.html?srsltid=AfmBOop3tWXDmEy848ohvdeIBD_1jHwOaDzGmnNxClEFJPs2Dl4AtD6R",
    sellPrice: 30,
    sold: false
  },
  {
    title: "3D Yayınları AYT Fizik Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Fizik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/3d-ayt-fizik.jpg",
    images: [],
    description:
      "Sadece çembersel hareket çözülü gerisi tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 530,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-ayt-fizik-soru-bankasi_84527.html?srsltid=AfmBOorwKzMN59jd5Q5URe7c472pwYO-Hyoj0xMFa1LRujWXbut_F2zT",
    sellPrice: 260,
    sold: false
  },
  {
    title: "Nihat Bilgin TYT-AYT Fizik Soru Bankası",
    publisher: "Nihat Bilgin Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/tyt-ayt-nihat-bilgin-fizik.jpg",
    images: [],
    description:
      "Sadece çembersel hareket çözülü gerisi tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 550,
    originalPriceLink: "https://www.kitapisler.com/Nihat-Bilgin-TYT-AYT-Fizik-Tumu-Cozumlu-Soru-Kitabi_42464.html?srsltid=AfmBOoppil8XIwnEIPAqOZMouRagSvUGcgfemQG7MiiHIyDmd_fQ2v7Q",
    sellPrice: 260,
    sold: false
  },
  {
    title: "Barış Çelenk Trigonometri Matematik Fasikülleri",
    publisher: "Barış Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Matematik",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/ayt-baris-trigonometri.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 349,
    originalPriceLink: "https://www.kitapisler.com/baris-celenk-trigonometri-matematik-fasikulleri_97522.html?srsltid=AfmBOopAHV7jvBnOTr6s_RAXtReiGL5qxY0MI5T4s36RXIlUSBqhwF9p",
    sellPrice: 250,
    sold: false
  },
  {
    title: "3D Yayınları AYT Biyoloji Soru Bankası",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Biyoloji",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/3d-ayt-biyoloji.jpg",
    images: [],
    description:
      "Yarısı çözülü. Cilt ve kapak sağlam.",
    originalPrice: 482,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-2023-ayt-biyoloji-soru-bankasi_84530.html?srsltid=AfmBOord8NWM2uqsPQIdZpFTCbRN6VCHBFRLWB_Ced8OnSUWwRENwPdn",
    sellPrice: 170,
    sold: false
  },
  {
    title: "3D Yayınları AYT Fen Bilimleri Simülasyon Denemeleri",
    publisher: "3D Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: ["Fizik", "Kimya", "Biyoloji"],
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/3d-ayt-fen-deneme.jpg",
    images: [],
    description:
      "İlk denemesi çözülmüş toplam 10 deneme var. Cilt ve kapak sağlam.",
    originalPrice: 298,
    originalPriceLink: "https://www.kitapisler.com/3d-yayinlari-ayt-fen-bilimleri-simulasyon-denemeleri_56858.html?srsltid=AfmBOophlvgLB8L6D2ukUUxeUNEQwXWvxJIMS-4oG7my7rrekbx_3KDb",
    sellPrice: 150,
    sold: false
  },
  {
    title: "Çap Yayınları Integral Matematik Konu Anlatımlı Soru Bankası",
    publisher: "Çap Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "Matematik",
    condition: "İkinci el - İyi Durumda",
    cover: "images/cap-integral.jpg",
    images: [],
    description:
      "İkinci el kurşun kalem ile çözülü. Cilt ve kapak sağlam.",
    originalPrice: 219,
    originalPriceLink: "https://www.kitapsec.com/Products/Matematik-Integral-Konu-Anlatimli-Soru-Bankasi-Cap-Yayinlari-751232.html?srsltid=AfmBOoqe0Rwx4J4GN6ZDbTqbGPQgJv1sDn1bA2hL_c9N9AgUUuZLvUK2",
    sellPrice: 50,
    sold: false
  },
  {
    title: "Çap Yayınları Elektrik ve Manyetizma Fizik Konu Anlatımlı Soru Bankası",
    publisher: "Çap Yayınları",
    grade: "Genel",
    examType: "AYT",
    subject: "Fizik",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/ayt-elektrik-manyetizma-cap.jpg",
    images: [],
    description:
      "İlk 3 sayfası çözülü gerisi tertemiz sıfır kitap. Cilt ve kapak sağlam.",
    originalPrice: 245,
    originalPriceLink: "https://www.kitapisler.com/cap-fizik-elektrik-manyetizma-konu-anlatimli-soru-bankasi_86749.html?srsltid=AfmBOormXZWgrsvro8nzMwhACMGyNt_8eRn0ompXIFKc8E2FvAcslhHt",
    sellPrice: 140,
    sold: false
  },
  {
    title: "TYT AYT Geometri 10 + 10 Deneme Orijinal Yayınları",
    publisher: "Orijinal Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "Geometri",
    condition: "Tertemiz - İyi Durumda",
    cover: "images/tyt-ayt-geometri-orijinal.jpg",
    images: [],
    description:
      "Tertemiz güncel sıfır kitap. Kitap kapak cildinin dışı fotoğraftaki kadar aşınmış içi tertemiz.Cilt ve kapak sağlam.",
    originalPrice: 155,
    originalPriceLink: "https://www.kitapsec.com/Products/TYT-AYT-Geometri-10-10-Deneme-Orijinal-Yayinlari-420932.html?srsltid=AfmBOorFhOYzufCf8mtzhJIsbLCHCsnUSMJd2lhXJh1a4-3Z-27ZgT9n",
    sellPrice: 90,
    sold: false
  },
  {
    title: "AYT Kimya Fen Bilimleri Yayınları Soru Bankası",
    publisher: "Fen Bilimleri Yayınları",
    grade: "Genel",
    examType: "TYT-AYT",
    subject: "Kimya",
    condition: "Az kullanılmış - İyi Durumda",
    cover: "images/ayt-kimya-fenbilimleri.jpg",
    images: [],
    description:
      "Elektrokimya ilk 2 testi çözülü gerisi tertemiz sıfır güncel. Cilt ve kapak sağlam.",
    originalPrice: 252,
    originalPriceLink: "https://www.kitapsec.com/Products/AYT-Cizgi-Ustu-Serisi-Kimya-Soru-Bankasi-Fen-Bilimleri-Yayinlari-861164.html?srsltid=AfmBOooU6TCj779BZiYDT-SFksvUxr5YBldJnc9TBToVpKTNLYO7xeXy",
    sellPrice: 150,
    sold: false
  },
];
