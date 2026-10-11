/* ============================================================
   ZAXENBOOST — script.js
   Tüm etkileşimler: sepet, sekmeler, akordeon, animasyonlu
   imleç, scroll reveal, sayaçlar, kupon, ödeme ve daha fazlası.
   ============================================================ */

"use strict";

/* ---------------- Yardımcılar ---------------- */

var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

function fmt(n) {
  return n.toLocaleString("tr-TR") + "₺";
}

function icon(name, cls) {
  return '<svg class="ico ' + (cls || "") + '"><use href="#' + name + '"/></svg>';
}

function el(html) {
  var t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

/* ---------------- Veri ---------------- */

var GAMES = ["CS2", "VALORANT", "FORTNITE", "APEX LEGENDS", "PUBG", "RUST", "GTA V", "WARZONE", "OVERWATCH 2", "LOL", "DOTA 2", "ROBLOX"];

var FEATURES = [
  { n: "01", icon: "i-chart", title: "Sistem Taraması", desc: "Donanımını, sürücüleri, servisleri ve arka plan süreçlerini saniyeler içinde inceler; sistemine özel bir yol haritası çıkarır." },
  { n: "02", icon: "i-wand", title: "Akıllı Rehber", desc: "Ne oynuyorsun, laptop mu masaüstü mü, neyi kullanmıyorsun? Cevaplarına göre uygulanacak ayarları senin için seçer." },
  { n: "03", icon: "i-play", title: "Tek Tık Uygulama", desc: "Her ayar risk seviyesiyle listelenir. Onay ver, gerisini ZAXENBOOST yapar — önce yedek, sonra uygulama, en son doğrulama." },
  { n: "04", icon: "i-gauge", title: "Performans Takibi", desc: "FPS ve gecikme ölçer, önce/sonra farkını grafikle gösterir. Windows güncellemesi ayar bozarsa otomatik onarır." },
  { n: "05", icon: "i-gamepad", title: "Oyun Odaklı Mod", desc: "Oyunu açtığında arka plan sessizleşir, gereksiz servisler kapanır; oyun bitince her şey geri döner. 40+ oyun profili." },
];

var PLANS = {
  abonelik: {
    cols: "cols-4",
    note: "Abonelikte optimizasyon sınırsız: istediğin kadar uygula, Windows güncellemesinden sonra otomatik koru.",
    items: [
      { id: "a1", name: "Boost Aylık", price: 249, per: "/ ay", desc: "İstediğin zaman iptal et", features: ["Sınırsız optimizasyon", "Koruma modu", "FPS ölçümü", "Discord desteği"] },
      { id: "a3", name: "Boost 3 Aylık", price: 599, per: "/ 3 ay", desc: "Aylık ~200₺ — %20 avantaj", popular: true, features: ["Sınırsız optimizasyon", "Koruma modu", "FPS ölçümü", "Öncelikli destek", "Tüm oyun profilleri"] },
      { id: "a6", name: "Boost 6 Aylık", price: 999, per: "/ 6 ay", desc: "Aylık ~166₺ — %33 avantaj", features: ["Sınırsız optimizasyon", "Koruma modu", "FPS ölçümü", "Öncelikli destek", "Tüm oyun profilleri"] },
      { id: "a12", name: "Boost Yıllık", price: 1499, per: "/ yıl", desc: "Aylık ~125₺ — %50 avantaj", features: ["Sınırsız optimizasyon", "Koruma modu", "FPS ölçümü", "Öncelikli destek", "Tüm oyun profilleri", "Beta erişimi"] },
    ],
  },
  tek: {
    cols: "cols-2",
    note: "Tek kurulumda optimizasyon 1 kez uygulanır; ayarlar kalıcıdır ve tek tıkla geri alınabilir.",
    items: [
      { id: "t1", name: "Tek Kurulum", price: 199, per: "tek seferlik", desc: "Temel optimizasyon paketi", features: ["Optimizasyon (1 kez)", "Geri alma (tek tık)", "1 bilgisayar lisansı", "Discord desteği"] },
      { id: "t2", name: "Tek Kurulum Pro", price: 349, per: "tek seferlik", desc: "Extreme ayarlar dahil", popular: true, features: ["Optimizasyon (1 kez)", "Extreme ayarlar", "1 oyun profili", "Geri alma (tek tık)", "1 bilgisayar lisansı"] },
    ],
  },
  tam: {
    cols: "cols-3",
    note: "Bilgisayarını birlikte kuralım: temiz Windows, sürücüler, BIOS/RAM ve oyun ayarları. Fiyatlar 899₺'den başlar.",
    items: [
      { id: "f1", name: "Tam Kurulum + 1 Ay", price: 899, per: "tek seferlik", desc: "Uzman kurulumu + 1 ay abonelik", features: ["Uzaktan uzman kurulumu", "Format & temiz Windows", "Sürücü + BIOS/RAM ayarı", "1 ay sınırsız optimizasyon", "FPS ölçümü ve raporu"] },
      { id: "f3", name: "Tam Kurulum + 3 Ay", price: 1199, per: "tek seferlik", desc: "Uzman kurulumu + 3 ay abonelik", popular: true, features: ["Uzaktan uzman kurulumu", "Format & temiz Windows", "Sürücü + BIOS/RAM ayarı", "3 ay sınırsız optimizasyon", "FPS ölçümü ve raporu"] },
      { id: "f6", name: "Tam Kurulum + 6 Ay", price: 1499, per: "tek seferlik", desc: "Uzman kurulumu + 6 ay abonelik", features: ["Uzaktan uzman kurulumu", "Format & temiz Windows", "Sürücü + BIOS/RAM ayarı", "6 ay sınırsız optimizasyon", "FPS ölçümü ve raporu"] },
      { id: "f12", name: "Tam Kurulum + 1 Yıl", price: 1999, per: "tek seferlik", desc: "Uzman kurulumu + 1 yıl abonelik", features: ["Uzaktan uzman kurulumu", "Format & temiz Windows", "Sürücü + BIOS/RAM ayarı", "1 yıl sınırsız optimizasyon", "FPS ölçümü ve raporu"] },
      { id: "fv", name: "VIP Kurulum", price: 2499, per: "tek seferlik", desc: "Sınırsız takip ve bakım", features: ["Uzaktan uzman kurulumu", "Format & temiz Windows", "Sürücü + BIOS/RAM ayarı", "Ömür boyu optimizasyon", "Doğrudan WhatsApp hattı", "FPS ölçümü ve raporu"] },
    ],
  },
};

var COMPARE_ROWS = [
  ["Optimizasyon", "Sınırsız", "1 kez", "1 kez", "Sınırsız + uzman"],
  ["Extreme ayarlar", true, false, true, true],
  ["Ayar düzeyleri ve özel seçenekler", true, false, "dash", true],
  ["Oyun profili", "Sınırsız", "dash", "1 seçili", "Sınırsız"],
  ["Koruma modu", true, false, "dash", true],
  ["FPS ölçümü ve raporu", true, false, false, true],
  ["Uzaktan uzman kurulumu", false, false, false, true],
  ["Format & temiz Windows", false, false, false, true],
  ["Discord desteği", true, true, true, true],
];

var SECURITY = {
  no: {
    title: "Asla Yapmadıklarımız", icon: "i-shieldx",
    items: [
      "Gizli uzaktan erişim (RAT) yok",
      "Dosya veya parola taraması yok",
      "Oyun ve anti-cheat dosyalarına dokunma yok",
      "Windows Defender'i devre dışı bırakma yok",
      "Kripto madenciliği ve reklam yazılımı yok",
      "Tuş kaydı ve ekran görüntüsü yok",
    ],
  },
  yes: {
    title: "Prensiplerimiz", icon: "i-shield",
    items: [
      "Denetlenebilir, açık çekirdek modülü",
      "Her sürüm için herkese açık VirusTotal raporu",
      "Kod imzalı kurulum dosyası (dijital imza)",
      "Her işlem öncesi otomatik sistem yedeği",
      "Tek tıkla tüm değişiklikleri geri alma",
      "Antivirüs firmalarıyla beyaz liste iş birliği",
    ],
  },
  net: {
    title: "İnternete Ne Gider?", icon: "i-wifi",
    items: [
      "Yalnız zaxenboost.com sunucuları (lisans + güncelleme)",
      "Ayar kataloğu indirmeleri",
      "Ping ölçümleri (oyun sunucuları)",
      "Gerekirse GPU sürücüsü indirme",
      "Destek mesajlaşması",
      "Hiçbir kişisel dosya yüklenmez",
    ],
  },
};

var REVIEWS = [
  { name: "Emre A.", tag: "CS2 · i5-12400F · RTX 3060", text: "Yıllardır 140 FPS'de takılıyordum, ZAXENBOOST sonrası 210'a çıktı. Frame time grafiği artık düz çizgi.", stars: 5 },
  { name: "Deniz K.", tag: "Valorant · Ryzen 5 5600", text: "Ping 32'den 19'a düştü. Rehber gerçekten sorarak uyguluyor, her ayarı görüp onaylıyorsun — bu çok güven verdi.", stars: 5 },
  { name: "Kaan T.", tag: "Tam Kurulum · Laptop", text: "Uzman format attı, BIOS/RAM ayarı yaptı; laptop'ta 60 FPS'i göreceğimi düşünmüyordum. Ölçüm raporunu da paylaşmaları çok şeffaf.", stars: 5 },
];

var FAQS = [
  { q: "Antivirüsüm neden uyarı veriyor?", a: "ZAXENBOOST Windows güç planlarına ve servislerine dokunduğu için bazı antivirüsler davranışa bakarak genel ('Generic/Heur') uyarı gösterebilir. Bu virüs olduğu anlamına gelmez; tweak araçları için tipik bir yanlış pozitiftir. Her sürümü 70+ motorla tarıyoruz ve VirusTotal raporunu sitede açıkça paylaşıyoruz." },
  { q: "FPS gerçekten artıyor mu?", a: "Test sistemlerimizde ortalama %25–%40 FPS artışı ve daha stabil frame times ölçülüyor. Uygulama içindeki FPS testiyle farkı kendi bilgisayarında ölçebilirsin. Sonuç donanıma göre değişir; memnun kalmazsan 14 gün içinde koşulsuz iade var." },
  { q: "Anti-cheat ile sorun yaşar mıyım?", a: "Hayır. ZAXENBOOST oyun dosyalarına ve anti-cheat süreçlerine dokunmaz; yaptığı her şey Windows tarafındadır. Vanguard, FACEIT, EAC, BattlEye ve Ricochet ile test edildi, ban riski oluşturmaz." },
  { q: "Tek kurulum ile abonelik arasındaki fark ne?", a: "Tek kurulumda optimizasyon 1 kez uygulanır ve ayarlar kalıcıdır. Abonelikte optimizasyon sınırsızdır: Windows güncellemesi ayarları sıfırlarsa tekrar uygularsın, koruma modu aktiftir ve tüm oyun profilleri dahildir." },
  { q: "Bilgisayarım bozulur mu? Geri alma nasıl çalışır?", a: "Her işlem öncesi otomatik sistem geri yükleme noktası ve değer yedeği alınır. Extreme ayarlar ayrıca etiketlenir ve ekstra onay ister. Tek tıkla tümünü veya seçtiklerini geri alabilirsin; en kötü senaryoda Windows geri yükleme her şeyi eski haline getirir." },
  { q: "Lisans kaç bilgisayarda çalışır? Donanım değişirse?", a: "Lisans tek bilgisayara bağlıdır. Bilgisayar değişirsen Hesabım panelinden lisansı ücretsiz taşırsın; küçük donanım değişiklikleri (RAM, depolama) lisansı etkilemez." },
  { q: "Ödeme seçenekleri ve iade süreci nasıl?", a: "Kredi/banka kartı (3D Secure, 3 aya kadar taksit) ve Havale/EFT destekliyoruz. Tüm paketlerde 14 gün koşulsuz iade garantisi var: tek e-posta ile ödemen iade edilir, lisans devre dışı kalır." },
  { q: "Kurulum ne kadar sürer, teknik bilgi gerekir mi?", a: "Kendin kurarsan sihirbaz ortalama 3 dakikada tamamlanır. Tam Kurulum paketindeyse uzmanımız uzaktan bağlanır, baştan sona ayarlar ve ölçüm raporu verir — genellikle 45–60 dakika sürer, senden hiçbir teknik bilgi gerekmez." },
];

var SUPPORT = [
  { name: "Discord", icon: "i-dc", fill: true, color: "#5865F2", desc: "Topluluk, duyurular, kurulum yardımı ve canlı sohbet. En hızlı destek kanalı.", cta: "Discord'a Katıl" },
  { name: "WhatsApp", icon: "i-wa", fill: true, color: "#25D366", desc: "Müşterilere özel destek hattı. Ödeme sonrası Hesabım'dan tek tıkla bağlan.", cta: "WhatsApp Destek" },
  { name: "E-posta", icon: "i-mail", fill: false, color: "#3b82f6", desc: "Fatura, iade ve kurumsal talepler için. 24 saat içinde garantili yanıt.", cta: "destek@zaxenboost.com" },
  { name: "Canlı Destek", icon: "i-live", fill: false, color: "#22d3ee", desc: "Hafta içi 09:00–24:00 arası canlı görüşme. Kurulum sırasında ekran paylaşımı.", cta: "Hemen Bağlan" },
];

var ADDONS = [
  { id: "addon-aim", name: "Zaxen Aim Paketi", price: 249, desc: "Nişan yardımcısı + optimum hassasiyet bulucu" },
];

var COUPON = { code: "ZAXEN150", amount: 150, min: 500 };

/* ============================================================
   Durum (state)
   ============================================================ */

var cart = [];
var couponApplied = false;
var currentTab = "abonelik";
var paymentMethod = "kart";

try {
  var saved = localStorage.getItem("zaxenboost_cart");
  if (saved) cart = JSON.parse(saved) || [];
} catch (e) { /* localStorage kapalıysa sessizce geç */ }

function saveCart() {
  try { localStorage.setItem("zaxenboost_cart", JSON.stringify(cart)); } catch (e) {}
}

/* ============================================================
   Toast
   ============================================================ */

var toastTimer = null;

function showToast(msg, isErr) {
  var t = $("#toast");
  $("#toastMsg").textContent = msg;
  t.classList.toggle("err", !!isErr);
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2400);
}

/* ============================================================
   Scroll reveal
   ============================================================ */

var revealObs = null;

function observeReveals() {
  if (!revealObs) {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (e) { e.classList.add("visible"); });
      return;
    }
    revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }
  $$(".reveal:not(.visible)").forEach(function (e) {
    if (!e.dataset.obs) { e.dataset.obs = "1"; revealObs.observe(e); }
  });
}

/* ============================================================
   Animasyonlu imleç
   ============================================================ */

function initCursor() {
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) {
    ["#curDot", "#curRing", "#curGlow"].forEach(function (s) { var n = $(s); if (n) n.remove(); });
    return;
  }

  var dot = $("#curDot"), ring = $("#curRing"), glow = $("#curGlow");
  if (!dot || !ring || !glow) return;

  var pos = { x: -100, y: -100 };
  var rp = { x: -100, y: -100 };
  var gp = { x: -100, y: -100 };
  var scale = 1, targetScale = 1, alpha = 0.7, targetAlpha = 0.7;

  window.addEventListener("mousemove", function (e) {
    pos.x = e.clientX; pos.y = e.clientY;
    var t = e.target.closest ? e.target.closest("a,button,input,textarea,select,label,tr") : null;
    targetScale = t ? 1.9 : 1;
    targetAlpha = t ? 1 : 0.7;
  }, { passive: true });

  window.addEventListener("mousedown", function () { targetScale = 0.7; });
  window.addEventListener("mouseup", function () { targetScale = 1; });
  document.addEventListener("mouseleave", function () { pos.x = -100; pos.y = -100; });

  (function loop() {
    rp.x += (pos.x - rp.x) * 0.16;
    rp.y += (pos.y - rp.y) * 0.16;
    gp.x += (pos.x - gp.x) * 0.08;
    gp.y += (pos.y - gp.y) * 0.08;
    scale += (targetScale - scale) * 0.14;
    alpha += (targetAlpha - alpha) * 0.14;
    dot.style.transform = "translate(" + (pos.x - 3) + "px," + (pos.y - 3) + "px)";
    ring.style.transform = "translate(" + (rp.x - 19) + "px," + (rp.y - 19) + "px) scale(" + scale.toFixed(3) + ")";
    ring.style.opacity = alpha.toFixed(2);
    glow.style.transform = "translate(" + (gp.x - 45) + "px," + (gp.y - 45) + "px)";
    requestAnimationFrame(loop);
  })();
}

/* ============================================================
   Navbar / scroll efektleri
   ============================================================ */

function initNav() {
  var navbar = $("#navbar");
  var bar = $("#progressBar");
  var topBtn = $("#topBtn");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    navbar.classList.toggle("scrolled", y > 24);
    topBtn.classList.toggle("show", y > 600);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Mobil menü */
  var menuBtn = $("#menuBtn"), mobileMenu = $("#mobileMenu"), menuIcon = $("#menuIcon");

  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuIcon.innerHTML = '<use href="#i-menu"/>';
  }
  menuBtn.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("open");
    menuIcon.innerHTML = '<use href="#' + (open ? "i-close" : "i-menu") + '"/>';
  });
  $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* "Hemen Başla" butonları → Paketler bölümüne kaydır */
  ["#navCta", "#mobileCta", "#heroStart"].forEach(function (sel) {
    var b = $(sel);
    if (b) b.addEventListener("click", function () { scrollToPlans(); });
  });

  /* data-tab bağlantıları (Tam Kurulum) */
  $$('[data-tab]').forEach(function (a) {
    a.addEventListener("click", function () { setTab(a.dataset.tab); });
  });
}

function scrollToPlans() {
  var target = $("#paketler");
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

function scrollToCompare() {
  var target = $("#karsilastirma");
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

/* ============================================================
   İçerik üretimi
   ============================================================ */

function buildMarquee() {
  var track = $("#marqueeTrack");
  if (!track) return;
  var html = GAMES.map(function (g) {
    return '<span class="game-chip">' + icon("i-gamepad", "sm") + g + "</span>";
  }).join("");
  track.innerHTML = html + html; /* kesintisiz döngü için 2 kopya */
}

function buildFeatures() {
  var grid = $("#featuresGrid");
  if (!grid) return;
  grid.innerHTML = FEATURES.map(function (f, i) {
    return (
      '<article class="feat-card reveal" style="--d:' + i * 100 + 'ms">' +
      '<span class="feat-num">' + f.n + "</span>" +
      '<span class="feat-icon">' + icon(f.icon) + "</span>" +
      "<h3>" + f.title + "</h3><p>" + f.desc + "</p>" +
      "</article>"
    );
  }).join("");
}

function buildPricing() {
  var wrap = $("#pricingGrids");
  if (!wrap) return;
  var html = "";
  Object.keys(PLANS).forEach(function (tabId) {
    var tab = PLANS[tabId];
    html += '<div class="plan-grid-wrap" data-tab="' + tabId + '"><div class="plans-grid ' + tab.cols + '">';
    tab.items.forEach(function (p, i) {
      var feats = p.features.map(function (f) {
        return '<li><i class="tick">' + icon("i-check", "sm") + "</i>" + f + "</li>";
      }).join("");
      html +=
        '<div class="plan-card reveal' + (p.popular ? " popular" : "") + '" style="--d:' + i * 90 + 'ms">' +
        (p.popular ? '<span class="badge-pop">⭐ En Çok Tercih Edilen</span>' : "") +
        '<div class="plan-head"><div><h3>' + p.name + '</h3><p class="plan-desc">' + p.desc + "</p></div>" +
        '<span class="badge-launch">' + icon("i-tag", "sm") + " Lansman</span></div>" +
        '<div class="plan-price">' + fmt(p.price) + ' <span class="plan-per">' + p.per + "</span></div>" +
        '<ul class="plan-features">' + feats + "</ul>" +
        '<button class="add-btn' + (p.popular ? " primary" : "") + '" data-add="' + p.id + '">Sepete Ekle</button>' +
        "</div>";
    });
    html += "</div></div>";
  });
  wrap.innerHTML = html;
  setTab(currentTab, true);
}

function setTab(tabId, silent) {
  currentTab = tabId;
  $$("#pricingTabs .tab-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.tab === tabId);
  });
  $$(".plan-grid-wrap").forEach(function (w) {
    var active = w.dataset.tab === tabId;
    w.classList.toggle("active", active);
    if (active) w.style.animation = "none", void w.offsetWidth, w.style.animation = "";
  });
  var note = $("#pricingNote");
  if (note && PLANS[tabId]) note.textContent = PLANS[tabId].note;
  if (!silent) observeReveals();
}

function cmpCell(v) {
  if (v === true) return '<i class="lg yes"></i>';
  if (v === false) return '<i class="lg no"></i>';
  if (v === "dash") return '<i class="lg dash"></i>';
  return '<span class="cmp-txt">' + v + "</span>";
}

function buildCompare() {
  var body = $("#compareBody");
  if (!body) return;
  body.innerHTML = COMPARE_ROWS.map(function (row) {
    var cells = row.slice(1).map(function (v) { return "<td>" + cmpCell(v) + "</td>"; }).join("");
    return '<tr><td class="ta-l">' + row[0] + "</td>" + cells + "</tr>";
  }).join("");
}

function buildSecurity() {
  var map = { no: "#secNo", yes: "#secYes", net: "#secNet" };
  Object.keys(map).forEach(function (key) {
    var col = $(map[key]);
    if (!col) return;
    var data = SECURITY[key];
    var mark = key === "no" ? "no" : "yes";
    var items = data.items.map(function (t) {
      return "<li><i class=\"lg " + mark + '\"></i><span>' + t + "</span></li>";
    }).join("");
    col.innerHTML =
      '<div class="sec-col-head"><span class="sec-ico">' + icon(data.icon) + "</span><h3>" + data.title + "</h3></div>" +
      '<ul class="sec-list">' + items + "</ul>";
  });
}

function buildReviews() {
  var grid = $("#reviewsGrid");
  if (!grid) return;
  grid.innerHTML = REVIEWS.map(function (r, i) {
    var stars = "";
    for (var s = 0; s < r.stars; s++) stars += icon("i-star", "sm");
    return (
      '<article class="review-card reveal" style="--d:' + i * 120 + 'ms">' +
      '<div class="stars">' + stars + "</div>" +
      '<p class="review-text">"' + r.text + '"</p>' +
      '<div class="review-user"><b>' + r.name + "</b><span>" + r.tag + "</span></div>" +
      "</article>"
    );
  }).join("");
}

function buildFaq() {
  var list = $("#faqList");
  if (!list) return;
  list.innerHTML = FAQS.map(function (f) {
    return (
      '<div class="faq-item">' +
      '<button class="faq-q" aria-expanded="false"><span>' + f.q + "</span>" +
      '<span class="faq-chev">' + icon("i-arrow", "sm") + "</span></button>" +
      '<div class="faq-a"><div class="faq-a-inner"><p>' + f.a + "</p></div></div>" +
      "</div>"
    );
  }).join("");
}

function buildSupport() {
  var grid = $("#supportGrid");
  if (!grid) return;
  grid.innerHTML = SUPPORT.map(function (c, i) {
    return (
      '<article class="support-card reveal" style="--c:' + c.color + ";--bg-c:" + c.color + "1a;--bc:" + c.color + '40;--d:' + i * 100 + 'ms">' +
      '<span class="sup-ico">' + icon(c.icon, c.fill ? "fill" : "") + "</span>" +
      "<h3>" + c.name + "</h3><p>" + c.desc + "</p>" +
      '<button class="btn sup-btn">' + c.cta + "</button>" +
      "</article>"
    );
  }).join("");
}

/* ============================================================
   Sayaçlar
   ============================================================ */

function initCounters() {
  var stats = $("#stats");
  if (!stats) return;
  var counters = $$("strong[data-target]", stats);
  if (!("IntersectionObserver" in window)) {
    counters.forEach(function (c) { c.textContent = c.dataset.target + (c.dataset.suffix || ""); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      counters.forEach(function (c) { animateCount(c); });
    });
  }, { threshold: 0.3 });
  obs.observe(stats);
}

function animateCount(node) {
  var target = parseFloat(node.dataset.target);
  var decimals = parseInt(node.dataset.decimals || "0", 10);
  var suffix = node.dataset.suffix || "";
  var dur = 1900;
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var val = target * eased;
    node.textContent = val.toFixed(decimals).replace(".", ",") + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============================================================
   Sepet
   ============================================================ */

function findPlan(id) {
  var all = [];
  Object.keys(PLANS).forEach(function (t) { all = all.concat(PLANS[t].items); });
  var a = ADDONS.filter(function (x) { return x.id === id; })[0];
  return all.filter(function (p) { return p.id === id; })[0] || a || null;
}

function addToCart(id) {
  var p = findPlan(id);
  if (!p) return;
  var ex = cart.filter(function (i) { return i.id === id; })[0];
  if (ex) {
    ex.qty += 1;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, per: p.per || "eklenti", qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(p.name + " sepete eklendi");
  /* Kupon koşulu bozulduysa (min tutar) uyarıyı tazele */
  if (couponApplied && subtotal() < COUPON.min) {
    couponApplied = false;
    setCouponMsg("Sepet tutarı düştü — kupon koşulu artık sağlanmıyor.", "err");
  }
}

function changeQty(id, delta) {
  cart.forEach(function (i) { if (i.id === id) i.qty += delta; });
  cart = cart.filter(function (i) { return i.qty > 0; });
  saveCart();
  renderCart();
  if (couponApplied && subtotal() < COUPON.min) {
    couponApplied = false;
    setCouponMsg("Sepet tutarı düştü — kupon koşulu artık sağlanmıyor.", "err");
  }
}

function removeFromCart(id) {
  cart = cart.filter(function (i) { return i.id !== id; });
  saveCart();
  renderCart();
  if (couponApplied && subtotal() < COUPON.min) {
    couponApplied = false;
    setCouponMsg("Sepet tutarı düştü — kupon koşulu artık sağlanmıyor.", "err");
  }
}

function subtotal() {
  return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
}

function itemCount() {
  return cart.reduce(function (s, i) { return s + i.qty; }, 0);
}

function setCouponMsg(msg, cls) {
  var m = $("#couponMsg");
  if (!m) return;
  m.textContent = msg;
  m.className = "coupon-msg " + (cls || "");
}

function renderCart() {
  var count = itemCount();
  var sub = subtotal();
  var discount = couponApplied ? COUPON.amount : 0;
  var total = Math.max(0, sub - discount);

  /* Rozet */
  var badge = $("#cartBadge");
  badge.hidden = count === 0;
  badge.textContent = count;
  $("#drawerCount").textContent = count;

  /* Durum ekranları */
  var empty = $("#cartEmpty"), content = $("#cartContent"), success = $("#orderSuccess"), foot = $("#drawerFoot");
  if (success && !success.hidden) {
    empty.hidden = true; content.hidden = true; foot.style.display = "none";
    return;
  }
  empty.hidden = count > 0;
  content.hidden = count === 0;
  foot.style.display = count > 0 ? "" : "none";

  /* Ürün listesi */
  var itemsWrap = $("#drawerItems");
  itemsWrap.innerHTML = cart.map(function (i) {
    return (
      '<div class="cart-item">' +
      '<div class="ci-info"><b>' + i.name + "</b><small>" + (i.per === "eklenti" ? "Ekstra eklenti" : i.per) + "</small>" +
      '<div class="qty-row">' +
      '<div class="qty">' +
      '<button class="qty-btn" data-qty="' + i.id + '" data-delta="-1">−</button>' +
      "<span>" + i.qty + "</span>" +
      '<button class="qty-btn" data-qty="' + i.id + '" data-delta="1">+</button>' +
      "</div>" +
      '<button class="ci-del" data-del="' + i.id + '" aria-label="Kaldır">' + icon("i-trash", "sm") + "</button>" +
      "</div></div>" +
      '<b class="ci-price">' + fmt(i.price * i.qty) + "</b>" +
      "</div>"
    );
  }).join("");

  /* Taksit notu */
  $("#taksitNote").style.display = sub >= 2000 ? "" : "none";

  /* Eklentiler */
  var addonWrap = $("#addonWrap");
  addonWrap.innerHTML = ADDONS.map(function (a) {
    var added = cart.some(function (i) { return i.id === a.id; });
    return (
      '<div class="addon-item' + (added ? " added" : "") + '">' +
      "<div><b>" + a.name + "</b><small>" + a.desc + "</small></div>" +
      '<div class="addon-right"><b>' + fmt(a.price) + "</b>" +
      (added
        ? '<span class="in-cart">' + icon("i-check", "sm") + " Sepette</span>"
        : '<button class="btn btn-outline sm-btn" data-add="' + a.id + '">Ekle +</button>') +
      "</div></div>"
    );
  }).join("");

  /* Toplamlar */
  $("#sumSubtotal").textContent = fmt(sub);
  var dRow = $("#discountRow");
  dRow.hidden = !couponApplied;
  if (couponApplied) {
    $("#discountLabel").textContent = "Kampanya (" + COUPON.code + ")";
    $("#sumDiscount").textContent = "−" + fmt(COUPON.amount);
  }
  $("#sumTotal").textContent = fmt(total);
  $("#btnTotal").textContent = fmt(total);
}

/* ============================================================
   Çekmece (drawer)
   ============================================================ */

function openDrawer() {
  $("#drawer").classList.add("open");
  $("#drawerOverlay").classList.add("open");
  document.body.classList.add("no-scroll");
  /* Sipariş başarı ekranı açıksa sıfırla */
  var success = $("#orderSuccess");
  if (success && !success.hidden) resetOrderView();
  renderCart();
}

function closeDrawer() {
  $("#drawer").classList.remove("open");
  $("#drawerOverlay").classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function resetOrderView() {
  $("#orderSuccess").hidden = true;
  $("#cartContent").hidden = false;
  $("#cartEmpty").hidden = itemCount() > 0;
  $("#drawerFoot").style.display = itemCount() > 0 ? "" : "none";
}

function initDrawer() {
  $("#cartBtn").addEventListener("click", openDrawer);
  $("#drawerClose").addEventListener("click", closeDrawer);
  $("#drawerOverlay").addEventListener("click", closeDrawer);
  $("#successClose").addEventListener("click", function () {
    resetOrderView();
    closeDrawer();
  });
  $("#emptyBrowse").addEventListener("click", function () {
    closeDrawer();
    scrollToPlans();
  });
  $("#goCompare").addEventListener("click", function () {
    closeDrawer();
    scrollToCompare();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrawer();
      var mm = $("#mobileMenu");
      var mi = $("#menuIcon");
      if (mm) mm.classList.remove("open");
      if (mi) mi.innerHTML = '<use href="#i-menu"/>';
    }
  });

  /* Kupon */
  $("#couponApply").addEventListener("click", applyCoupon);
  $("#couponInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") applyCoupon();
  });

  /* Fatura tipi */
  $$("#invToggle .inv-type").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#invToggle .inv-type").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      var tax = $("#invTax");
      tax.placeholder = b.dataset.type === "kurumsal" ? "Vergi No" : "T.C. Kimlik No";
    });
  });

  /* Ödeme yöntemi */
  $("#payKart").addEventListener("click", function () { setPayment("kart"); });
  $("#payEft").addEventListener("click", function () { setPayment("eft"); });

  /* IBAN kopyala */
  $("#ibanCopy").addEventListener("click", function () {
    var text = "TR33 0001 0025 6789 0123 4567 89";
    function done() { showToast("IBAN panoya kopyalandı"); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else {
      fallbackCopy(text);
      done();
    }
  });

  /* Ödeme */
  $("#checkoutBtn").addEventListener("click", checkout);
}

function fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}

function setPayment(method) {
  paymentMethod = method;
  $("#payKart").classList.toggle("active", method === "kart");
  $("#payEft").classList.toggle("active", method === "eft");
  $("#payCardFields").hidden = method !== "kart";
  $("#payEftFields").hidden = method !== "eft";
}

function applyCoupon() {
  var input = $("#couponInput");
  var code = input.value.trim().toUpperCase();
  if (!code) {
    couponApplied = false;
    setCouponMsg("", "");
    renderCart();
    return;
  }
  if (code !== COUPON.code) {
    couponApplied = false;
    setCouponMsg("Geçersiz kampanya kodu.", "err");
    renderCart();
    return;
  }
  if (subtotal() < COUPON.min) {
    couponApplied = false;
    setCouponMsg("Bu kupon en az " + fmt(COUPON.min) + " tutarındaki sepetlerde geçerli.", "err");
    renderCart();
    return;
  }
  couponApplied = true;
  setCouponMsg(COUPON.code + " uygulandı — " + fmt(COUPON.amount) + " indirim 🎉", "ok");
  renderCart();
}

function markInvalid(input, invalid) {
  input.classList.toggle("invalid", invalid);
  return invalid;
}

function checkout() {
  var bad = false;
  var name = $("#invName");
  var email = $("#invEmail");

  if (markInvalid(name, name.value.trim().length < 3)) bad = true;
  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
  if (markInvalid(email, !emailOk)) bad = true;

  if (paymentMethod === "kart") {
    var no = $("#cardNo").value.replace(/\s/g, "");
    if (markInvalid($("#cardNo"), !/^\d{16}$/.test(no))) bad = true;
    if (markInvalid($("#cardExp"), !/^\d{2}\s*\/\s*\d{2}$/.test($("#cardExp").value.trim()))) bad = true;
    if (markInvalid($("#cardCvv"), !/^\d{3,4}$/.test($("#cardCvv").value.trim()))) bad = true;
  }

  if (bad) {
    showToast("Lütfen işaretli alanları kontrol et.", true);
    return;
  }

  /* Başarı ekranı */
  $("#cartContent").hidden = true;
  $("#drawerFoot").style.display = "none";
  $("#orderSuccess").hidden = false;

  /* Sipariş sonrası temizlik */
  cart = [];
  couponApplied = false;
  $("#couponInput").value = "";
  setCouponMsg("", "");
  saveCart();
  renderCart(); /* rozet ve sayaç da sıfırlansın */
}

/* ============================================================
   Delegasyon: tek dinleyici ile tüm dinamik butonlar
   ============================================================ */

function initDelegation() {
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-add],[data-qty],[data-del],.faq-q,.tab-btn") : null;
    if (!t) return;

    if (t.hasAttribute("data-add")) {
      addToCart(t.getAttribute("data-add"));
      return;
    }
    if (t.hasAttribute("data-qty")) {
      changeQty(t.getAttribute("data-qty"), parseInt(t.getAttribute("data-delta"), 10));
      return;
    }
    if (t.hasAttribute("data-del")) {
      removeFromCart(t.getAttribute("data-del"));
      return;
    }
    if (t.classList.contains("faq-q")) {
      var item = t.parentElement;
      var wasOpen = item.classList.contains("open");
      $$(".faq-item.open").forEach(function (x) {
        x.classList.remove("open");
        var q = $(".faq-q", x);
        if (q) q.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        t.setAttribute("aria-expanded", "true");
      }
      return;
    }
    if (t.classList.contains("tab-btn")) {
      setTab(t.getAttribute("data-tab"));
      return;
    }
  });
}

/* ============================================================
   Başlat
   ============================================================ */

function init() {
  /* İçerik üretimi (gözlemci kurulmadan önce) */
  buildMarquee();
  buildFeatures();
  buildPricing();
  buildCompare();
  buildSecurity();
  buildReviews();
  buildFaq();
  buildSupport();

  /* Gözlemciler ve etkileşimler */
  observeReveals();
  initCursor();
  initNav();
  initCounters();
  initDrawer();
  initDelegation();

  /* Sepeti geri yükle ve çiz */
  renderCart();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
