# coding-game-mobile

Python öğreten, oyunlaştırılmış kodlama uygulamasının mobil istemcisi. Proje adı henüz seçilmedi, repo adı geçicidir.

## Teknoloji

- React Native ve Expo, TypeScript
- Android ve iOS derlemeleri için EAS Build
- Kod kalitesi için ESLint ve Prettier

## API ile ilişki

Mobil uygulama API'ye yalnızca [API sözleşmesi](https://github.com/Hasmolam/coding-game-api/blob/main/API-SOZLESMESI.md) üzerinden bağlıdır.

- API tipleri elle yazılmaz. API reposundaki `openapi.json` dosyasından üretilir.
- API hazır olmadan ekranlar, aynı dosyadan çalışan sahte API ile yazılır.
- Sözleşmede bir değişiklik gerekiyorsa API reposunda issue veya PR açılır. Sözleşme PR'ları frontend onayı olmadan birleşmez.

## Tasarım

Ekran tasarımları ve kullanıcı akışları Penpot'ta: [tasarım dosyası](https://design.penpot.app/?screen=viewer&file-id=e7ca6b81-c0d3-8029-8008-ffdfaf3f3871&page-id=e7ca6b81-c0d3-8029-8008-ffdfaf3f3872&section=interactions&index=0&share-id=9ffd2526-33a9-49bc-83f3-ee29a6cdea0b). Dosyada iki sayfa var:

- **Ekranlar:** 15 mobil ekran (390×844). Sunum modunda dört akış tıklanarak gezilebilir: İlk açılış, Günlük kullanım, Giriş hatası ve Yanlış cevap.
- **Tasarım sistemi:** renkler, yazı ölçeği ve bileşenler (Buton, Taş, Seçenek, Alan, Sekme çubuğu, Ders üst barı, maskot pozları).

Akışlar:

- **İlk açılış:** Karşılama, ilk ders, ders sonu, kayıt ("İlerlemeni kaydet"), seri, lig ve öğrenme yolu. Hesabı olan kullanıcı karşılamadan girişe geçer.
- **Günlük kullanım:** Öğrenme yolundan derse girilir. Ders boşluk doldurma, çoktan seçmeli test ve eşleştirme sorularından oluşur, ardından ders sonu gelir. Seri ekranı yalnızca günün ilk dersinden sonra, lig ekranı yalnızca sıralama değişince gösterilir.
- **Alt sekmeler:** Öğren, Lig ve Profil.

Tema dosyası ([#3](https://github.com/Hasmolam/coding-game-mobile/issues/3)) renk, yazı ve köşe değerlerini Tasarım sistemi sayfasından alır.

## Yol haritası

İşler yukarıdan aşağıya sırayla ilerler. Aynı aşamadaki işler paralel yürüyebilir. Her işin ayrıntısı, ne zaman bitmiş sayılacağı ve hangi işe bağlı olduğu kendi issue'sunda yazar. Güncel durumu [Issues](https://github.com/Hasmolam/coding-game-mobile/issues) ve [Milestones](https://github.com/Hasmolam/coding-game-mobile/milestones) sayfalarından takip edin.

### 1 · Kurulum

Proje iskeleti, otomatik kontroller ve tema.

- [#1 Expo ve TypeScript ile proje iskeletini kur](https://github.com/Hasmolam/coding-game-mobile/issues/1)
- [#2 CI: her PR'da lint ve tip kontrolü](https://github.com/Hasmolam/coding-game-mobile/issues/2)
- [#3 Tema dosyası ve temel bileşenler](https://github.com/Hasmolam/coding-game-mobile/issues/3)

### 2 · Tasarım ve gezinme

Kullanıcı akışları, ekran tasarımları ve gezinme iskeleti.

- [#4 Kullanıcı akışları ve ekran tasarımları](https://github.com/Hasmolam/coding-game-mobile/issues/4)
- [#5 Gezinme iskeleti](https://github.com/Hasmolam/coding-game-mobile/issues/5)

### 3 · Ortak sözleşme

API ile ortak dil, otomatik üretilen tipler ve sahte API.

- [#6 Sözleşme kurallarını API ekibiyle birlikte kesinleştir](https://github.com/Hasmolam/coding-game-mobile/issues/6)
- [#7 API tiplerini openapi.json'dan üret ve API istemcisini kur](https://github.com/Hasmolam/coding-game-mobile/issues/7)
- [#8 Sahte (mock) API ile geliştirme](https://github.com/Hasmolam/coding-game-mobile/issues/8)

### 4 · Hesap

Kayıt, giriş, şifre sıfırlama ve hesap silme.

- [#9 Kayıt, giriş ve çıkış](https://github.com/Hasmolam/coding-game-mobile/issues/9)
- [#10 Şifre sıfırlama ve hesap silme ekranları](https://github.com/Hasmolam/coding-game-mobile/issues/10)

### 5 · Öğrenme

Öğrenme yolu, ders ekranı, soru tipleri, ders sonu, profil ve sıralama.

- [#11 Öğrenme yolu ekranı](https://github.com/Hasmolam/coding-game-mobile/issues/11)
- [#12 Ders ekranı ve soru tipleri](https://github.com/Hasmolam/coding-game-mobile/issues/12)
- [#13 Yanlış cevaplanan soruların tekrarı](https://github.com/Hasmolam/coding-game-mobile/issues/13)
- [#14 Ders sonu ekranı ve sonucun gönderilmesi](https://github.com/Hasmolam/coding-game-mobile/issues/14)
- [#15 Profil ve haftalık sıralama ekranları](https://github.com/Hasmolam/coding-game-mobile/issues/15)

### 6 · Sağlamlık ve dağıtım

Hata durumları, sürüm kontrolü ve test sürümü.

- [#16 Yükleme, hata ve bağlantı yok durumları](https://github.com/Hasmolam/coding-game-mobile/issues/16)
- [#17 Uygulama sürümü kontrolü](https://github.com/Hasmolam/coding-game-mobile/issues/17)
- [#18 EAS Build ile test sürümü](https://github.com/Hasmolam/coding-game-mobile/issues/18)

## Kurallar

- Uygulamada dile özel kod yazılmaz. Soru ekranı sorunun `type` alanına göre çizilir, içerik API'den gelir.
- Tanınmayan bir soru tipi veya alan gelirse uygulama çökmez.
- Puan, XP, seri ve ders kilidi uygulamada hesaplanmaz, sunucudan gelir.
- Token'lar yalnızca `expo-secure-store` ile saklanır.
- Renk, yazı tipi ve boşluk değerleri yalnızca tema dosyasından alınır.

## Çalışma kuralları

- `main` dalına doğrudan push yapılamaz. Her değişiklik pull request ile gelir.
- Her pull request en az bir onay almadan birleşmez. Onaydan sonra yeni commit gelirse onay yenilenir.
- Açık kalan yorumlar çözülmeden birleştirme yapılmaz.
- Dal adları `feature/kisa-aciklama` veya `fix/kisa-aciklama` biçimindedir.
- Pull request küçük tutulur ve tek bir işi yapar. Açıklamada ilgili issue yazılır (`Closes #9`).
- Birleştirme yalnızca "Squash and merge" ile yapılır, dal birleşince otomatik silinir.
- Şifre, anahtar ve token gibi gizli bilgiler repoya eklenmez. Bunlar ortam değişkenlerinde tutulur.

## Lisans

Tüm hakları saklıdır. Bu repo yalnızca görüntülenebilir, izinsiz kullanılamaz. Ayrıntılar [LICENSE](LICENSE) dosyasında.
