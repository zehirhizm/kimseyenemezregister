# Discord Bot 24/7 Deployment Guide

Bu rehber, Discord kayıt botunuzu GitHub üzerinde 24/7 aktif tutmak için gerekli adımları açıklar.

## Gereksinimler
- GitHub hesabı
- Git kurulu bilgisayar
- Discord bot token'ı

## Adım 1: GitHub Repository Oluşturma

1. [GitHub](https://github.com) hesabınıza giriş yapın
2. Sağ üst köşeden **"New repository"** butonuna tıklayın
3. Repository adını girin (örn: `discord-kayit-bot`)
4. **Public** seçeneğini seçin (sınırsız çalışma süresi için)
5. **"Create repository"** butonuna tıklayın

## Adım 2: Kodu GitHub'a Yükleme

Komut satırını açın ve proje klasörüne gidin:

```bash
cd C:\Users\zehir\Desktop\kayitbot
```

Ardından şu komutları sırayla çalıştırın:

```bash
# Eğer daha önce git init yapmadıysanız
git init

# Tüm dosyaları ekleyin
git add .

# Commit oluşturun
git commit -m "Initial commit"

# GitHub repository'nizi ekleyin (URL'i kendi repository'nizle değiştirin)
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git

# Ana branch'i main olarak ayarlayın
git branch -M main

# Kodu GitHub'a gönderin
git push -u origin main
```

## Adım 3: Discord Token'ı Secret Olarak Ekleme

> **ÖNEMLİ:** `.env` dosyanızı asla GitHub'a yüklemeyin! `.gitignore` dosyası bunu engelleyecektir.

1. GitHub repository sayfanızda **"Settings"** sekmesine tıklayın
2. Sol menüden **"Secrets and variables"** > **"Actions"** seçeneğine tıklayın
3. **"New repository secret"** butonuna tıklayın
4. **Name:** `DISCORD_TOKEN`
5. **Secret:** Discord bot token'ınızı buraya yapıştırın (`.env` dosyanızdaki token)
6. **"Add secret"** butonuna tıklayın

## Adım 4: GitHub Actions'ı Etkinleştirme

1. Repository sayfanızda **"Actions"** sekmesine tıklayın
2. Eğer bir uyarı görürseniz, **"I understand my workflows, go ahead and enable them"** butonuna tıklayın
3. Sol tarafta **"Keep Discord Bot Alive"** workflow'unu göreceksiniz
4. Workflow otomatik olarak başlayacaktır

## Adım 5: Botun Çalıştığını Doğrulama

1. **Actions** sekmesinde çalışan workflow'u göreceksiniz
2. Workflow'a tıklayarak logları inceleyebilirsiniz
3. Discord sunucunuzda botun online olduğunu kontrol edin

## Nasıl Çalışır?

- ✅ Bot her 6 saatte bir otomatik olarak yeniden başlar
- ✅ Her çalışma yaklaşık 5.8 saat sürer
- ✅ Public repository için **tamamen ücretsiz ve sınırsız**
- ✅ Kod değişikliği yaptığınızda otomatik olarak güncellenir

## Kod Güncellemeleri

Botunuzda değişiklik yaptığınızda:

```bash
git add .
git commit -m "Açıklama mesajı"
git push
```

Kod GitHub'a yüklendiğinde bot otomatik olarak yeniden başlayacaktır.

## Sorun Giderme

### Bot online olmuyor
- **Actions** sekmesinden workflow loglarını kontrol edin
- `DISCORD_TOKEN` secret'ının doğru eklendiğinden emin olun
- Discord Developer Portal'da botun token'ının geçerli olduğunu kontrol edin

### Workflow çalışmıyor
- Repository'nin **public** olduğundan emin olun
- **Actions** sekmesinde workflow'ların etkin olduğunu kontrol edin
- `.github/workflows/keep-alive.yml` dosyasının doğru konumda olduğunu kontrol edin

### Bot sık sık offline oluyor
- Bu normaldir, GitHub Actions her 6 saatte bir yeniden başlar
- Birkaç saniyelik kesinti olabilir, ancak bot hızlıca geri gelir

## Önemli Notlar

⚠️ **Private Repository:** Eğer repository'nizi private yaparsanız, GitHub'ın ücretsiz planında ayda 2000 dakika (yaklaşık 33 saat) sınırı vardır.

⚠️ **Rate Limits:** Discord'un rate limit kurallarına dikkat edin. Bot sürekli çalıştığı için sorun olmaz.

✅ **Tamamen Ücretsiz:** Public repository kullanıldığında hiçbir ücret ödemezsiniz.

## Destek

Sorun yaşarsanız:
1. GitHub Actions loglarını kontrol edin
2. Discord bot token'ının geçerli olduğundan emin olun
3. Tüm dosyaların doğru konumda olduğunu kontrol edin
