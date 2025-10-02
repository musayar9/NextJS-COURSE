Harika bir soru 👍 Bunlar özellikle **Next.js 13+ (App Router)** yapısında çok karıştırılan kavramlar. Sana teker teker, anlaşılır şekilde açıklayayım:

---

### 1. **Router Cache (Yönlendirme Önbelleği)**

* Next.js’in **App Router**’da kullandığı genel cache mekanizmasıdır.
* Sayfalar arasında gezinirken (navigasyon) **önceden render edilmiş** route’lar bellekte saklanır, böylece tekrar gidildiğinde hızlı açılır.
* Örnek: `/products` sayfasına gittin → başka sayfaya geçtin → tekrar `/products` sayfasına dönersen, yeniden fetch ve render yapmaz, cache’den getirir (tabii cache politikana göre).

---

### 2. **Full Route Cache (Tam Route Önbelleği)**

* Bir route’un **tam HTML çıktısı** cache’lenir.
* Yani bir kere render edilen sayfa (SSR/SSG fark etmez), cache’de saklanır ve tekrar istenirse direkt oradan gelir.
* Genelde `fetch`’lerin `force-cache` olması durumunda ve route’un **statik** davranması halinde oluşur.
* Örnek: `/about` sayfası statik → build veya ilk render sonrası HTML saklanır → tekrar isteyen herkese aynı HTML döner.

---

### 3. **Data Cache (Veri Önbelleği)**

* `fetch()` ile alınan **harici API veya DB verileri** cache’lenir.
* Default olarak **5 dakika** (Next.js default) cache yapılır.
* Eğer `fetch(url, { cache: "force-cache" })` dersen → tamamen cache’lenir.
* Eğer `fetch(url, { cache: "no-store" })` dersen → cache kullanılmaz, her seferinde yeni veri çekilir.
* Yani bu tamamen **veri seviyesinde cache**.

---

### 4. **Request Memoization (İstek Hatırlama)**

* Aynı request birden fazla yerde çağrıldığında, **aynı render döngüsü içinde** tekrar tekrar istek atılmasın diye Next.js bunu optimize eder.
* Örnek:

  ```ts
  const data1 = await fetch("https://api.example.com/users").then(r => r.json());
  const data2 = await fetch("https://api.example.com/users").then(r => r.json());
  ```

  → Normalde 2 kere istek atılırdı.
  → Next.js bunları **memoize eder**, sadece **1 kez fetch yapar**, sonucu paylaşır.

---

### 5. **Data Source (Veri Kaynağı)**

* Uygulamanın veriyi aldığı yer.
* API, Database, 3rd party servis olabilir.
* Örn: PostgreSQL, MongoDB, REST API, GraphQL API vs.
* Data Cache ve Memoization işte bu **data source**’lardan gelen veriyi optimize etmek için kullanılır.

---

📌 Özet tablo:

| Kavram                  | Açıklama                                                |
| ----------------------- | ------------------------------------------------------- |
| **Router Cache**        | Route’ların (sayfa geçişleri) hızlı açılması için cache |
| **Full Route Cache**    | Sayfanın tüm HTML çıktısı cache edilir                  |
| **Data Cache**          | `fetch` ile gelen API/DB verileri cache edilir          |
| **Request Memoization** | Aynı render döngüsünde aynı request bir kez yapılır     |
| **Data Source**         | Verinin geldiği yer (API, DB, servis)                   |

---


Next.js ve modern React dünyasında `server-only` kavramı genellikle **verinin sadece sunucuda işlenip istemciye gönderilmediğini garanti etmek** anlamına gelir. Daha detaylı açıklayayım:

---

## 1. **Server-only nedir?**

* Bir kod, modül veya fonksiyon **sadece sunucuda çalıştırılır**, istemcide (browser) **bundle edilmez**.
* Amaç: **gizli bilgiler**, **sunucuya özel işlemler** veya **database bağlantıları** istemciye sızmasın.

---

### 2. Nerelerde kullanılır?

1. **Database bağlantıları**

   ```ts
   import { db } from "./server-only-db";

   export async function getUsers() {
       return await db.query("SELECT * FROM users");
   }
   ```

   * `db` client sadece sunucuda çalışır.
   * Tarayıcıya gitmez, böylece credentials güvenli kalır.

2. **Server-only modüller**

   * `fs` (dosya sistemi), `path`, `crypto` gibi Node.js modülleri istemcide çalışmaz.
   * Bunları import ettiğin dosya **server-only** olmalı:

     ```ts
     // server-only.js
     import fs from "fs";

     export function readSecretFile() {
         return fs.readFileSync("secret.txt", "utf-8");
     }
     ```

3. **API çağrıları / gizli token kullanımı**

   ```ts
   const res = await fetch("https://api.example.com/data", {
       headers: { Authorization: `Bearer ${process.env.API_KEY}` },
       cache: "no-store"
   });
   ```

   * API key istemciye gitmez, çünkü sadece server tarafında çalışır.

---

### 3. **Next.js App Router ile**

* Next.js 13+’te `server-only` bir modül import ettiğinde, framework otomatik olarak bunu **client bundle’dan çıkarır**.
* Eğer client komponentte `server-only` bir modül import etmeye çalışırsan **build hatası** alırsın.

---

### 4. Özet

| Özellik     | Açıklama                                                    |
| ----------- | ----------------------------------------------------------- |
| Server-only | Kod **sadece sunucuda çalışır**, istemciye gönderilmez      |
| Amaç        | Gizli veriler, DB bağlantıları, server-only Node modülleri  |
| Hata durumu | Client komponentte import etmeye çalışırsan build fail olur |

---



Tamam, buna açıklık getireyim. `Promise.all` **JavaScript’te asenkron işlemleri topluca yönetmek için kullanılan bir yöntem**dir. Özellikle **birden fazla promise’i aynı anda çalıştırıp hepsi tamamlanınca devam etmek** istediğinde kullanılır.

---

## 1️⃣ Temel Kullanımı

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "Hello"));
const promise3 = 42;

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [3, "Hello", 42]
  })
  .catch((error) => {
    console.error(error);
  });
```

### Açıklama:

* `Promise.all` bir **array** alır ve içindeki tüm promise’ler **tamamlanana kadar bekler**.
* Tüm promise’ler resolve olursa `.then` çalışır ve **sonuçları aynı sırayla** verir.
* Eğer bir tane bile reject olursa, **hepsi fail olur** ve `.catch` çalışır.

---

## 2️⃣ Async/Await ile Kullanımı

```js
async function fetchAll() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2"
  ];

  const requests = urls.map(url => fetch(url).then(res => res.json()));

  try {
    const results = await Promise.all(requests);
    console.log(results); // Her URL’den gelen JSON sonuçları array olarak
  } catch (err) {
    console.error(err);
  }
}

fetchAll();
```

### Avantajı:

* Bütün istekleri **paralel** olarak çalıştırır, sırayla beklemekten çok daha hızlıdır.
* Sonuçlar **array içinde orijinal sırada** gelir.

---

## 3️⃣ Önemli Notlar

* Eğer herhangi bir promise reject olursa, **Promise.all tamamen fail olur**.
* Tüm sonuçları almak istiyorsan, `Promise.allSettled` kullanılabilir:

```js
const results = await Promise.allSettled([promise1, promise2, promise3]);
console.log(results);
/* [
  { status: 'fulfilled', value: 3 },
  { status: 'fulfilled', value: 'Hello' },
  { status: 'fulfilled', value: 42 }
] */
```

---

💡 Özet:

* `Promise.all` = **tüm promise’leri paralel çalıştır + hepsi bitince sonucu al**
* Resolve olursa → `.then` / reject olursa → `.catch`
