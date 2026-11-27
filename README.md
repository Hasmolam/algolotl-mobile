# algolotl-mobile

Algolotl'un mobil istemcisi. Algolotl, Python öğreten oyunlaştırılmış bir kodlama uygulaması.

## Teknoloji

- Expo SDK 58 (React Native 0.88), TypeScript, Expo Router
- Stil: [Uniwind](https://docs.uniwind.dev) (React Native için Tailwind CSS 4)
- Temel bileşenler: [React Native Reusables](https://reactnativereusables.com) (bileşen kodu projeye kopyalanır)
- Animasyon: Reanimated
- Android ve iOS derlemeleri için EAS Build
- Kod kalitesi için ESLint ve Prettier

## Yerelde çalıştırma

Gerekenler: Node.js 22.13 veya üstü (22, 24 ya da 26 serisi; tek sayılı sürümler desteklenmez) ve telefonda **Expo Go** uygulamasının SDK 58 sürümü.

```bash
git clone git@github.com:Hasmolam/algolotl-mobile.git
cd algolotl-mobile
npm install
npm start
```

Terminalde çıkan QR kodu Android'de Expo Go ile, iOS'ta kamera ile okut. Bilgisayar ve telefon aynı ağda olmalı. Aynı ağda değilseniz `npx expo start --tunnel` kullanın.

Mağazadaki Expo Go SDK 58'i desteklemiyorsa: Android'de telefonu USB ile bağlayıp `npm run android` çalıştırın, Expo CLI doğru sürümü kurar. iOS'ta `npx eas-cli@latest go` ile kurulur (Expo hesabı gerekir).

Sık kullanılan komutlar:

| Komut               | Ne yapar                                   |
| ------------------- | ------------------------------------------ |
| `npm start`         | Geliştirme sunucusunu başlatır             |
| `npm run web`       | Uygulamayı tarayıcıda açar                 |
| `npm run lint`      | ESLint ve Prettier kontrolü                |
| `npm run typecheck` | TypeScript tip kontrolü                    |
| `npm run format`    | Bütün dosyaları Prettier ile biçimlendirir |
| `npm run doctor`    | Bağımlılık ve ayar sorunlarını arar        |

Paket eklerken `npm install` yerine `npx expo install <paket>` kullanın, SDK ile uyumlu sürümü o seçer. PR açmadan önce `npm run lint`, `npm run format:check` ve `npm run typecheck` temiz geçmeli; aynı kontroller her PR'da GitHub Actions'ta da çalışır.

## Klasör yapısı

Kod özelliklere (feature) göre ayrılır. Bağımlılık tek yönde akar: `app → features → shared`.

```
src/
  app/                 Yalnızca rotalar (Expo Router). Her dosya bir ekran adresidir.
  features/            Uygulamanın özellikleri: welcome, auth, lesson, league...
    <ad>/
      index.ts         Feature'ın dışarıya açılan tek kapısı
      screens/         Rotaların gösterdiği ekranlar
      components/      Yalnızca bu feature'da kullanılan bileşenler
      hooks/  api/  model/   Gerektiğinde
  shared/              Birden çok feature'ın kullandığı kod
    ui/
      primitives/      React Native Reusables bileşenleri, temaya uyarlanmış
      *.tsx            Oyun bileşenleri, Penpot'taki adlarıyla (Taş, Seçenek, Alan...)
    lib/               Yardımcılar (ör. cn)
    session/           Oturum durumu (misafir / giriş yapmış)
  global.css           Tek tema dosyası: renk, yazı tipi, köşe ve boşluk değerleri
```

Kurallar (ESLint ile denetlenir):

- `src/app` içindeki rota dosyası tek satırdır, ekranı feature'dan alır: `export { WelcomeScreen as default } from '@/features/welcome';`. Tek istisna `_layout.tsx` dosyalarıdır, gezinmeyi onlar tanımlar.
- Feature'lar birbirine import ile değil adresle geçer: `router.push('/sign-up')`.
- Bir feature başka bir feature'ı içe aktarmaz. İki feature aynı koda ihtiyaç duyarsa o kod `shared`'a taşınır.
- Feature'lar dışarıdan yalnızca `index.ts` üzerinden kullanılır, iç dosyalarına doğrudan erişilmez.
- `shared` hiçbir feature'a bağlı olamaz.
- Yeni bir React Native Reusables bileşeni eklemek için: `npx @react-native-reusables/cli@latest add <bileşen>`. Bileşen `src/shared/ui/primitives` klasörüne gelir.

## Gezinme

Gezinme [`src/app/_layout.tsx`](src/app/_layout.tsx) içinde, Expo Router'ın korumalı rotalarıyla (`Stack.Protected`) kurulu. Oturum durumu `src/shared/session` içindeki `useSession()` ile okunur. Şimdilik yalnızca bellekte tutuluyor, gerçek kayıt ve giriş #9 ile gelecek.

| Kim görür             | Adres                           | Ekran                             |
| --------------------- | ------------------------------- | --------------------------------- |
| Yalnızca misafir      | `/`                             | Karşılama                         |
|                       | `/sign-in`                      | Giriş                             |
|                       | `/sign-up`                      | Kayıt ("İlerlemeni kaydet")       |
| Yalnızca giriş yapmış | `/learn`, `/league`, `/profile` | Alt sekmeler: Öğren, Lig, Profil  |
| Herkes                | `/lesson/[lessonId]`            | Ders (ilk ders hesapsız yapılır)  |
|                       | `/lesson-result`                | Ders sonu                         |
|                       | `/streak`                       | Seri (günün ilk dersinden sonra)  |
|                       | `/league-promotion`             | Lig yükselme (sıralama değişince) |

Erişimi olmayan bir adrese giden misafir `/` adresine, giriş yapmış kullanıcı `/learn` adresine yönlendirilir.

Akışlar:

- **İlk açılış:** Karşılama → ders → ders sonu → kayıt → seri → lig → öğrenme yolu. Hesabı olan kullanıcı karşılamadan girişe geçer.
- **Günlük kullanım:** Öğrenme yolu → ders → ders sonu → (seri) → (lig) → öğrenme yolu. Seri ve lig ekranlarının gösterilip gösterilmeyeceği API'den gelecek (#14); şimdilik iki yol da düğme olarak duruyor.
- Ders sonu, seri ve lig ekranlarından öğrenme yoluna `returnToLearningPath()` ile dönülür. Araya giren ekranlar geçmişten silinir, geri tuşu onlara dönmez.

## Tema ve temel bileşenler

Bütün renk, yazı tipi, yazı boyutu, köşe ve kenar değerleri [`src/global.css`](src/global.css) dosyasında, Penpot'taki "Tasarım sistemi" sayfasından alınmıştır. Ekranlarda bu değerler sınıf adlarıyla kullanılır, ham değer (`#1E5FD1`, `16`) yazılmaz.

| Ne                | Sınıflar                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Renk              | `bg-primary`, `text-muted-foreground`, `bg-streak-soft`, `text-success-strong`...                                                      |
| Yazı ailesi       | `font-sans`, `font-sans-semibold`, `font-sans-bold`, `font-sans-extrabold`, `font-mono`                                                |
| Yazı boyutu       | `text-display`, `text-title`, `text-heading`, `text-subheading`, `text-button`, `text-body`, `text-caption`, `text-small`, `text-code` |
| Köşe              | `rounded-stone` (12), `rounded-button` (16), `rounded-card` (24)                                                                       |
| Basılabilir kenar | `edge-primary`, `edge-card`, `edge-success`... (altta 4px koyu kenar)                                                                  |

React Native'de kalınlık yazı tipi dosyasıyla seçildiği için `font-bold` gibi sınıflar yerine `font-sans-bold` gibi aileler kullanılır.

Temel bileşenler `src/shared/ui/primitives` klasöründe:

- `Text`: `display`, `h1`, `h2`, `h3`, `muted`, `label`, `caption`, `small`, `code` varyantları.
- `Button`: `default` (mavi), `secondary` (beyaz), `success`, `destructive`, `streak`, `ghost`, `link`. `disabled` verilince pasif görünüme geçer. Basılınca 4px aşağı iner.
- `Card`: beyaz kart; `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` ile.
- `Progress`: ders üst barındaki 16px çubuk (`size="default"`) ve ünite ilerlemesindeki 12px çubuk (`size="sm"`).

Bileşenlerin hepsi, geliştirme sırasında karşılama ekranındaki "Bileşenler" bağlantısından açılan `/bilesenler` ekranında görülebilir. Bu ekran yayın sürümünde açılmaz.

Tema dosyasına yeni bir yazı boyutu, yazı ailesi, köşe ya da kenar eklenirse [`src/shared/lib/utils.ts`](src/shared/lib/utils.ts) içindeki listeye de eklenmelidir. Yoksa `cn()` sınıf çakışmalarını yanlış çözer.

## API ile ilişki

Mobil uygulama API'ye yalnızca [API sözleşmesi](https://github.com/Hasmolam/algolotl-api/blob/main/API-SOZLESMESI.md) üzerinden bağlıdır.

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

Tema dosyası ([#3](https://github.com/Hasmolam/algolotl-mobile/issues/3)) renk, yazı ve köşe değerlerini Tasarım sistemi sayfasından alır.

## Yol haritası

İşler yukarıdan aşağıya sırayla ilerler. Aynı aşamadaki işler paralel yürüyebilir. Her işin ayrıntısı, ne zaman bitmiş sayılacağı ve hangi işe bağlı olduğu kendi issue'sunda yazar. Güncel durumu [Issues](https://github.com/Hasmolam/algolotl-mobile/issues) ve [Milestones](https://github.com/Hasmolam/algolotl-mobile/milestones) sayfalarından takip edin.

### 1 · Kurulum

Proje iskeleti, otomatik kontroller ve tema.

- [#1 Expo ve TypeScript ile proje iskeletini kur](https://github.com/Hasmolam/algolotl-mobile/issues/1)
- [#2 CI: her PR'da lint ve tip kontrolü](https://github.com/Hasmolam/algolotl-mobile/issues/2)
- [#3 Tema dosyası ve temel bileşenler](https://github.com/Hasmolam/algolotl-mobile/issues/3)

### 2 · Tasarım ve gezinme

Kullanıcı akışları, ekran tasarımları ve gezinme iskeleti.

- [#4 Kullanıcı akışları ve ekran tasarımları](https://github.com/Hasmolam/algolotl-mobile/issues/4)
- [#5 Gezinme iskeleti](https://github.com/Hasmolam/algolotl-mobile/issues/5)

### 3 · Ortak sözleşme

API ile ortak dil, otomatik üretilen tipler ve sahte API.

- [#6 Sözleşme kurallarını API ekibiyle birlikte kesinleştir](https://github.com/Hasmolam/algolotl-mobile/issues/6)
- [#7 API tiplerini openapi.json'dan üret ve API istemcisini kur](https://github.com/Hasmolam/algolotl-mobile/issues/7)
- [#8 Sahte (mock) API ile geliştirme](https://github.com/Hasmolam/algolotl-mobile/issues/8)

### 4 · Hesap

Kayıt, giriş, şifre sıfırlama ve hesap silme.

- [#9 Kayıt, giriş ve çıkış](https://github.com/Hasmolam/algolotl-mobile/issues/9)
- [#10 Şifre sıfırlama ve hesap silme ekranları](https://github.com/Hasmolam/algolotl-mobile/issues/10)

### 5 · Öğrenme

Öğrenme yolu, ders ekranı, soru tipleri, ders sonu, profil ve sıralama.

- [#11 Öğrenme yolu ekranı](https://github.com/Hasmolam/algolotl-mobile/issues/11)
- [#12 Ders ekranı ve soru tipleri](https://github.com/Hasmolam/algolotl-mobile/issues/12)
- [#13 Yanlış cevaplanan soruların tekrarı](https://github.com/Hasmolam/algolotl-mobile/issues/13)
- [#14 Ders sonu ekranı ve sonucun gönderilmesi](https://github.com/Hasmolam/algolotl-mobile/issues/14)
- [#15 Profil ve haftalık sıralama ekranları](https://github.com/Hasmolam/algolotl-mobile/issues/15)

### 6 · Sağlamlık ve dağıtım

Hata durumları, sürüm kontrolü ve test sürümü.

- [#16 Yükleme, hata ve bağlantı yok durumları](https://github.com/Hasmolam/algolotl-mobile/issues/16)
- [#17 Uygulama sürümü kontrolü](https://github.com/Hasmolam/algolotl-mobile/issues/17)
- [#18 EAS Build ile test sürümü](https://github.com/Hasmolam/algolotl-mobile/issues/18)

## Kurallar

- Uygulamada dile özel kod yazılmaz. Soru ekranı sorunun `type` alanına göre çizilir, içerik API'den gelir.
- Tanınmayan bir soru tipi veya alan gelirse uygulama çökmez.
- Puan, XP, seri ve ders kilidi uygulamada hesaplanmaz, sunucudan gelir.
- Token'lar yalnızca `expo-secure-store` ile saklanır.
- Renk, yazı tipi ve boşluk değerleri yalnızca tema dosyasından alınır.

## Çalışma kuralları

- `main` dalına doğrudan push yapılamaz. Her değişiklik pull request ile gelir.
- Her pull request en az bir onay almadan birleşmez. Onaydan sonra yeni commit gelirse onay yenilenir.
- CI ("Lint ve tip kontrolü": ESLint, Prettier ve TypeScript) geçmeyen pull request birleşmez.
- Açık kalan yorumlar çözülmeden birleştirme yapılmaz.
- Dal adları `feature/kisa-aciklama` veya `fix/kisa-aciklama` biçimindedir.
- Pull request küçük tutulur ve tek bir işi yapar. Açıklamada ilgili issue yazılır (`Closes #9`).
- Birleştirme yalnızca "Squash and merge" ile yapılır, dal birleşince otomatik silinir.
- Şifre, anahtar ve token gibi gizli bilgiler repoya eklenmez. Bunlar ortam değişkenlerinde tutulur.

## Lisans

Tüm hakları saklıdır. Bu repo yalnızca görüntülenebilir, izinsiz kullanılamaz. Ayrıntılar [LICENSE](LICENSE) dosyasında.
