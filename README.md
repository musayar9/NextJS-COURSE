### Intercept Routes

**Intercepting Routes**

 **Tanım**
Intercepting Routes sayesinde başka bir route’a gitmek istediğinde, **o route’u normalde açılacağı yerde değil, mevcut route’un üzerinde bir modal / overlay gibi gösterebiliyorsun.**
Yani aslında başka bir sayfayı "yakalıyorsun" (intercept) ve farklı bir şekilde render ediyorsun.

---

###  Örnek Senaryo

Bir sosyal medya uygulaması düşünelim:

- `/feed` sayfasında gönderiler var.
- Bir gönderiye tıkladığında normalde `/post/123` sayfasına gidersin.
- Ama sen kullanıcıyı feed’den koparmak istemiyorsun. Bunun yerine, `/post/123` sayfasını bir **modal pencere** içinde açmak istiyorsun.

Bunu intercept routes ile yapıyorsun.

---

###  Dosya Yapısı Örneği

```bash
app
 ├─ feed
 │   ├─ page.tsx
 │   └─ @modal
 │       └─ post
 │           └─ [id]
 │               └─ page.tsx
 └─ post
     └─ [id]
         └─ page.tsx
```

- `/post/[id]` → normal sayfa (kendi başına açıldığında).
- `/feed/@modal/post/[id]` → aynı sayfanın modal versiyonu.

Burada `@modal` bir **parallel route** slotu. Intercept route sayesinde Next.js, `/post/[id]` isteğini **yakalar** ve `@modal` slotunda render eder.

---

### 🚦 Çalışma Mantığı

- Kullanıcı `/feed` üzerindeyken bir gönderiye tıklarsa:

  - Route change olur → ama sayfa tamamen değişmez.
  - Next.js `/post/[id]` isteğini yakalar ve `@modal/post/[id]` içindeki `page.tsx` render edilir.
  - Böylece modal açılır.

- Kullanıcı direkt `/post/123` URL’sine giderse:

  - Normal `app/post/[id]/page.tsx` yüklenir.

---

### ✅ Avantajları

- Modal, drawer, overlay gibi UI’lerde route yönetimini kolaylaştırır.
- URL her zaman güncel kalır (back/forward çalışır).
- Kod tekrarını azaltır: aynı sayfayı hem normal hem modal olarak kullanabilirsin.

---

---

## 📂 Dosya Yapısı

```bash
app
 ├─ feed
 │   ├─ page.tsx
 │   └─ @modal
 │       └─ post
 │           └─ [id]
 │               └─ page.tsx   ← Modal versiyonu
 └─ post
     └─ [id]
         └─ page.tsx           ← Normal sayfa
```

---

## `app/feed/page.tsx`

```tsx
"use client";

import Link from "next/link";

export default function FeedPage() {
  const posts = [
    { id: "1", title: "İlk gönderi" },
    { id: "2", title: "İkinci gönderi" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Feed</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            {/* Burada link aslında /post/[id] route’una gider */}
            {/* Ama Intercept Routes bunu yakalayıp @modal altında açar */}
            <Link href={`/post/${post.id}`} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## `app/post/[id]/page.tsx` (Normal sayfa)

```tsx
export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Gönderi Sayfası</h1>
      <p>Gönderi ID: {params.id}</p>
      <p>Bu, normal /post/{params.id} sayfası.</p>
    </div>
  );
}
```

---

## `app/feed/@modal/post/[id]/page.tsx` (Modal versiyon)

```tsx
"use client";

import { useRouter } from "next/navigation";

export default function PostModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-lg font-bold mb-4">Modal Gönderi</h1>
        <p>Gönderi ID: {params.id}</p>
        <p>Bu, /feed üzerindeyken modal içinde açılır.</p>

        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
```

---

## 🚦 Nasıl Çalışır?

- `/feed` sayfasında gönderiye tıklarsın → aslında `/post/[id]` route’una gidiyorsun.
- Ama Next.js intercepting sayesinde bu isteği yakalayıp `@modal/post/[id]` altında render ediyor → modal açılıyor.
- Eğer kullanıcı direkt URL’den `/post/1` yazarsa → `app/post/[id]/page.tsx` açılır (tam sayfa).

---

## 🔹 Slot Nedir?

- Next.js’te bir `slot`, belirli bir route yapısında aynı anda birden fazla “alanı” doldurmanı sağlar.
- Yani tek bir layout içinde **farklı içerik bölgeleri** (slotlar) tanımlayabilirsin.

Bunu `@` prefix’i ile yapıyorsun:

```
app/dashboard/layout.tsx
app/dashboard/@analytics/page.tsx
app/dashboard/@settings/page.tsx
```

Burada `@analytics` ve `@settings` → slot isimleri.
Layout’ta hangi slot nereye yerleşecekse, onu sen tanımlıyorsun.

---

## 🔹 Neden İhtiyaç Duyarız?

1. **Farklı UI bölgelerini paralel olarak yönetmek için**

   - Örneğin bir dashboard düşün. Sol tarafta menü, ortada içerik, sağda bildirim paneli olsun.
   - Her bölgeyi ayrı bir `slot` ile yönetmek işleri çok daha temiz yapar.

2. **Independent navigation (bağımsız gezinme)**

   - Kullanıcı `analytics` panelinde gezinirken `settings` slotu aynı kalabilir.
   - Yani her slot bağımsız olarak kendi route’unu yönetebilir.

3. **UI consistency (tutarlılık)**

   - Tüm sayfayı yeniden render etmek yerine, sadece slot içeriği değişir.
   - Bu, performans ve kullanıcı deneyimi için büyük avantajdır.

---

## 🔹 Hangi Durumlarda Kullanılır?

- **Dashboard** yapılarında → farklı panellerin aynı anda render edilmesi gerekiyorsa.
- **Split view** (bölünmüş ekran) uygulamalarında.
- **Messenger tarzı uygulamalarda** → solda sohbet listesi, ortada seçili sohbet, sağda profil bilgisi.
- **Modal / Drawer gibi interception routes ile birlikte** → aynı layout’un üzerine ek içerik bindirmek istediğinde.

---

## 🔹 Küçük Bir Örnek

📂 Yapı:

```
app/dashboard/layout.tsx
app/dashboard/@analytics/page.tsx
app/dashboard/@settings/page.tsx
```

📄 `layout.tsx`

```tsx
export default function DashboardLayout({
  children,
  analytics,
  settings,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  settings: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>{analytics}</div> {/* Sol panel */}
      <div>{children}</div> {/* Orta panel */}
      <div>{settings}</div> {/* Sağ panel */}
    </div>
  );
}
```

📄 `@analytics/page.tsx`

```tsx
export default function AnalyticsPage() {
  return <div>Analytics Panel</div>;
}
```

📄 `@settings/page.tsx`

```tsx
export default function SettingsPage() {
  return <div>Settings Panel</div>;
}
```

➡ `/dashboard` açıldığında, aynı anda `analytics` ve `settings` slotları da render edilir.

---

✅ Özet:

- **Slotlar**, Next.js’te paralel UI bölgeleri oluşturmak için kullanılır.
- En çok **dashboard, messaging app, modal/drawer gibi multi-view** senaryolarda tercih edilir.

Buradaki olay aslında tamamen **Next.js konfigürasyon dosyası** (`next.config.ts` ya da `.js`) ile ilgili. Adım adım açıklayayım 👇

---

### 1. `import type { NextConfig } from "next";`

- Burada **TypeScript tipi** import ediyorsun.
- `NextConfig` → Next.js’in kabul ettiği config nesnesinin tip tanımıdır.
- Yani senin `nextConfig` objen yazım hatalarına karşı tip desteği alıyor.
  Mesela yanlış bir property yazarsan (örneğin `devIndicator` yerine `devIndicators`) TypeScript uyarır.

---

### 2. `const nextConfig: NextConfig = { ... }`

- Burada bir **konfigürasyon objesi** tanımlıyorsun.
- Bu obje, Next.js’in build, dev server, logging gibi özelliklerini özelleştirmene yarıyor.

Senin örneğinde:

```ts
const nextConfig: NextConfig = {
  devIndicators: { position: "top-right" }, // HMR (Hot Reload) göstergesinin konumu
  logging: { fetches: { fullUrl: true } }, // Fetch loglarında tam URL görünsün
};
```

- `devIndicators.position` → Next.js development modda sağ üst köşede küçük bir **yeniden yükleniyor** ikonu çıkarır. Bunun yerini ayarlıyorsun.
- `logging.fetches.fullUrl` → `fetch` istekleri console’a loglanırken **tam URL** yazılsın diye ayarlanıyor.

---

### 3. `export default nextConfig;`

- Burada config objesini dışa aktarıyorsun.
- Next.js build ederken ya da dev server başlatırken otomatik olarak `next.config.js/ts` dosyasını okur ve bu objeyi kullanır.

---

✅ Yani kısaca:

- Bu dosya **Next.js için global ayarları** içeriyor.
- TypeScript ile `NextConfig` tipini vererek güvence alıyorsun.
- `devIndicators` → geliştirici deneyimi için görsel gösterge.
- `logging` → fetch gibi işlemlerin log formatı.

---

### 🔹 Temel Mantık

Normalde Next.js’te:

- `fetch` yaptığında → veri **statik** veya **dinamik** olarak alınır.
- ISR (Incremental Static Regeneration) sayesinde, sayfa ya da fetch sonucu **önbelleğe (cache)** alınır ve belirli bir süre sonra **yeniden üretilir**.

`revalidate` bu "kaç saniyede bir yenilensin?" sorusuna cevap veriyor.

---

### 🔹 Kodundaki İki Kullanım

1. **Sayfa düzeyinde (`export const revalidate = 3600;`)**

   ```ts
   export const revalidate = 3600;
   ```

   - Bu, sayfa için **global cache süresi** tanımlar.
   - Yani bu sayfa 3600 saniyede (1 saat) bir tekrar **re-generate** edilir.
   - Kullanıcı ilk geldiğinde cache varsa onu görür, 1 saat sonra biri geldiğinde ise arka planda yeni versiyon oluşturulur.

---

2. **Fetch düzeyinde (`{ next: { revalidate: 10 } }`)**

   ```ts
   await fetch("...", { next: { revalidate: 10 } });
   ```

   - Bu fetch isteği özel olarak **10 saniyede bir yenilensin** demek.
   - Yani API’den gelen veri 10 saniye boyunca cache’de tutulur.
   - 10 saniye geçince yeni gelen istek API’den tekrar veri çeker ve cache’i günceller.

---

### 🔹 Çalışma Akışı

Örneğin:

- Sen sayfayı açtın, API’den `"todo/1"` verisi geldi → cache’lendi.
- 10 saniye boyunca tüm ziyaretçiler aynı veriyi cache’den görür.
- 11. saniyede biri sayfaya girerse → Next.js API’den tekrar veri çeker ve yeni sonucu cache’e yazar.
- Ama aynı anda kullanıcıya eski cache gösterilir → yani **arka planda güncelleme** (ISR) olur.

---

✅ Özet:

- `export const revalidate = 3600` → sayfanın tamamı 1 saatte bir yenilenir.
- `fetch(..., { next: { revalidate: 10 } })` → sadece bu fetch isteği 10 saniyede bir yenilenir.

---

### 🔹 `revalidatePath("/")`

- Bu fonksiyon **belirli bir route’u (sayfayı)** yeniden doğruluyor.
- Yani sen butona bastığında Next.js `/` route’unun cache’ini temizliyor ve sonraki request geldiğinde veriyi **tekrar fetch ediyor**.
- Kullanım senaryosu: Sayfa bazlı revalidation yapmak istediğinde. Örneğin `/profile` sayfasındaki kullanıcı bilgilerini güncellediğinde sadece `/profile` route’unu yeniden fetch ettirmek.

---

### 🔹 `revalidateTag("word")`

- Bu fonksiyon ise **tag bazlı cache invalidation** yapıyor.
- Fetch isteğinde sen şunu demişsin:

  ```ts
  fetch("https://icanhazdadjoke.com", {
    next: { tags: ["word"] },
  });
  ```

  Burada `word` diye bir etiket verdin.

- `revalidateTag("word")` çağrıldığında, bu etikete bağlı olan **tüm fetch’ler** yeniden doğrulanıyor.
- Yani aynı etiketi farklı yerlerde kullanıyorsan (mesela `word` tag’i hem `/`, hem `/about` sayfasında geçiyorsa), hepsinin cache’i temizlenip tekrar güncelleniyor.
- Kullanım senaryosu: Birden fazla sayfada kullanılan aynı veriyi güncellemek istediğinde. (örn: "kategoriler" veya "ayarlar" verisi hem Navbar’da hem de bir formda varsa).

---

✅ **Özetle farkları:**

- `revalidatePath("/")`: **Belirli bir route** için cache temizleme.
- `revalidateTag("word")`: **Belirli bir veri grubunu (tag)** için cache temizleme.

Bu sayede Next.js sana iki farklı senaryo sunuyor:

- Route bazlı yenileme (`revalidatePath`)
- Veri bazlı yenileme (`revalidateTag`)

---

## 1. `export const dynamic = "force-dynamic"`

Bu dosyanın (ör. `page.js`, `route.js`, `layout.js`) **render davranışını** belirler.

- Normalde Next.js, sayfaları **Static Generation (SSG)** veya **Server-Side Rendering (SSR)** arasında otomatik seçer.
- `dynamic = "namic"` dediğinde:

  - Bu route **her istekte yeniden çalıştırılır** (SSR).
  - Hiçbir şekilde önbelleğe alınmaz.
  - Örnek kullanım: çok sık değişen veya kullanıcıya özel (auth, dashboard vs.) sayfalarda.

```js
// page.js
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

Bu durumda sayfa **her request’te yeni fetch yapar**.

---

## 2. `cache: "force-cache"`

Bu ise **fetch API’sinde** kullanılan bir opsiyon.
Next.js, kendi fetch wrapper’ını sağlıyor ve default olarak `GET` isteklerini **cache ediyor** (Static Rendering).

- `cache: "force-cache"` dersen → **veri build sırasında alınır ve cache’ten servis edilir.**
- Yani veri sabitlenmiş olur (SSG).
- Örnek: hiç değişmeyecek ürün listesi, blog yazısı vs.

```js
const data = await fetch("https://api.example.com/products", {
  cache: "force-cache",
});
```

Böylece bu veri **deploy sırasında alınır** ve her kullanıcıya aynı şekilde sunulur.

---

## Karşılaştırma Tablosu

| Özellik            | `dynamic = "force-dynamic"`                        | `cache: "force-cache"`                                    |
| ------------------ | -------------------------------------------------- | --------------------------------------------------------- |
| Nerede kullanılır? | Route seviyesinde (`page.js`, `route.js`)          | `fetch()` çağrısı seviyesinde                             |
| Davranış           | Her request’te yeniden render (SSR)                | Fetch sonucu build time’da alınıp cache edilir (SSG)      |
| Cache durumu       | Yok (her zaman fresh data)                         | Her zaman cache (veri sabit)                              |
| Kullanım senaryosu | Dashboard, auth sayfaları, sürekli değişen API’ler | Blog yazıları, sabit ürün listeleri, değişmeyen içerikler |

---

✅ Kısacası:

- **`dynamic = "force-dynamic"` → route bazında “hep SSR çalıştır”**
- **`cache: "force-cache"` → fetch bazında “hep SSG cache kullan”**

---

Next.js **App Router**’da `fetch` için kullanılan en önemli opsiyonlardan biri de **`cache: "no-store"`**.

---

## `cache: "no-store"` nedir?

- `fetch()` çağrısında kullanılır.
- **Hiçbir şekilde cache yapılmaz.**
- Veri her istekte **yeniden alınır** → tam SSR davranışı.
- `dynamic = "force-dynamic"` ile benzer ama farkı **fetch seviyesinde** olmasıdır.

---

## Örnek Kullanım

```js
// page.js
export default async function Page() {
  const data = await fetch("https://api.example.com/users", {
    cache: "no-store",
  }).then((res) => res.json());

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

🔎 Bu durumda:

- Her kullanıcı sayfayı açtığında **API’ye yeni istek atılır**.
- Hiçbir önbellek yok → her zaman **en güncel veri**.

---

## Karşılaştırma (özet tablo)

| Seçenek                     | Nerede?           | Açıklama                                                                                       |
| --------------------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| `cache: "force-cache"`      | `fetch`           | **Build time’da** cache edilir, her istekte cache’den gelir (SSG).                             |
| `cache: "no-store"`         | `fetch`           | **Hiç cache yapmaz**, her request’te yeni data alır (SSR).                                     |
| `dynamic = "force-dynamic"` | route (`page.js`) | Route’u komple SSR yapar (tüm fetch’ler `no-store` gibi davranır).                             |
| `revalidate: 60`            | `fetch`           | Cache yapılır ama her **60 saniyede bir güncellenir** (ISR – Incremental Static Regeneration). |

---

## Ne zaman kullanmalı?

- Kullanıcıya özel veri → ör. **profil bilgisi, dashboard**
- Çok sık değişen API → **banka kuru, borsa fiyatları, canlı skor**
- Cache kullanılamayacak hassas içerikler → **auth bilgisi**

---

👉 Kısaca:

- `no-store` → **fetch özelinde her zaman taze veri**
- `force-dynamic` → **sayfa özelinde SSR**
- `force-cache` → **fetch özelinde cache zorla**

---
