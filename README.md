# Discord Kayıt Botu

Discord sunucunuz için otomatik kayıt sistemi. Yeni üyeler sunucuya katıldığında otomatik olarak "Kayıtsız" rolü alır ve kayıt panelinden cinsiyetlerini seçerek kayıt olabilirler.

## Özellikler

- ✅ Yeni üyelere otomatik "Kayıtsız" rol ataması
- ✅ Modern kayıt paneli (embed + butonlar)
- ✅ Cinsiyet seçimi (Erkek/Kadın)
- ✅ Otomatik rol yönetimi
- ✅ 24/7 GitHub Actions ile sürekli çalışma

## Kurulum

### Yerel Kurulum

1. Gerekli paketleri yükleyin:
```bash
npm install
```

2. `.env` dosyası oluşturun ve Discord bot token'ınızı ekleyin:
```env
DISCORD_TOKEN=your_bot_token_here
```

3. `config.js` dosyasında rol ve kanal ID'lerini güncelleyin

4. Botu başlatın:
```bash
npm start
```

### GitHub'da 24/7 Çalıştırma

Detaylı kurulum için [DEPLOYMENT.md](DEPLOYMENT.md) dosyasına bakın.

## Kullanım

1. Botu Discord sunucunuza ekleyin
2. Kayıt kanalında `!kayitpanel` komutunu kullanın (yönetici yetkisi gerekli)
3. Yeni üyeler otomatik olarak "Kayıtsız" rolü alacak
4. Üyeler kayıt panelinden cinsiyetlerini seçerek kayıt olabilir

## Konfigürasyon

`config.js` dosyasında aşağıdaki ayarları yapılandırın:

```javascript
module.exports = {
    roles: {
        unregistered: 'KAYITSIZ_ROL_ID',
        male: 'ERKEK_ROL_ID',
        female: 'KADIN_ROL_ID'
    },
    channels: {
        registration: 'KAYIT_KANAL_ID'
    }
};
```

## Gereksinimler

- Node.js 18.x veya üzeri
- Discord.js v14
- Discord bot token'ı

## Lisans

ISC
