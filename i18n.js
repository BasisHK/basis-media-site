/* ============ Basis Media — i18n (EN / 粵) ============ */
(function () {
  "use strict";

  var STORAGE_KEY = "basis-lang";
  var dict = {
    en: {
      "nav.work": "Work",
      "nav.process": "Process",
      "nav.services": "Services",
      "nav.journal": "Journal",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.talk": "Let's talk",
      "nav.talkArrow": "Let's talk →",
      "nav.menu": "Open menu",
      "menu.foot": "Hong Kong · AI Creative Marketing Agency · 香港",

      "hero.eyebrow": "Hong Kong · AI Creative Marketing Agency · 香港",
      "hero.title": "<span class=\"line\"><span class=\"w\">AI</span> <span class=\"w\">marketing</span></span><span class=\"line\"><span class=\"w\">that</span> <span class=\"w accent\">actually</span></span><span class=\"line\"><span class=\"w accent\">gets</span> <span class=\"w\">seen.</span></span>",
      "hero.body": "We're a Hong Kong AI creative marketing agency — strategy, campaigns and content systems that move brands. Short-form, brand films, paid creative and UGC, directed by people who know the city.",
      "hero.cta": "See the work ↓",
      "hero.scroll": "Scroll",

      "statement.html": "<span class=\"reveal-word\">Most</span> <span class=\"reveal-word\">marketing</span> <span class=\"reveal-word\">gets</span> <span class=\"reveal-word\">ignored.</span> <span class=\"reveal-word accent\">We</span> <span class=\"reveal-word accent\">build</span> <span class=\"reveal-word accent\">creative</span> <span class=\"reveal-word accent\">people</span> <span class=\"reveal-word accent\">actually</span> <span class=\"reveal-word accent\">stop</span> <span class=\"reveal-word accent\">for</span> <span class=\"reveal-word accent\">—</span> <span class=\"reveal-word accent\">and</span> <span class=\"reveal-word accent\">act</span> <span class=\"reveal-word accent\">on.</span>",

      "caps.eyebrow": "What sets us apart",
      "caps.1": "AI creative marketing",
      "caps.2": "Strategy + production",
      "caps.3": "Hong Kong-made",
      "caps.4": "Founder-led",
      "caps.5": "Bilingual 中英",
      "caps.6": "Performance-minded",
      "caps.trust": "Trusted by <strong>Tech Data</strong> · <strong>a tavola</strong> · <strong>ÓNA</strong> · <strong>Pho Bay</strong> · <strong>SPICE</strong> · and brands across Hong Kong.",
      "clients.eyebrow": "Clients we've worked with",
      "partner.eyebrow": "Our official technical partner",
      "partner.note": "Platform and commerce infrastructure for campaigns that scale.",

      "work.head": "Selected <em>work</em>",
      "work.sub": "Agency campaigns and programs — strategy through creative, measured in results.",
      "work.1.tag": "Growth campaign",
      "work.1.title": "Kowloon Noodle Co.",
      "work.1.body": "Weekend demand campaign: creative platform, 12-asset short-form system and organic-to-paid growth that filled a Sham Shui Po institution.",
      "work.1.stat": "2.4M reach · +180% weekend covers",
      "work.2.tag": "Brand platform",
      "work.2.title": "後生仔講嘢 <em>/ Youngblood</em>",
      "work.2.body": "Bilingual thought-leadership platform — format, campaign packs and distribution that grew founder authority into Top 20 HK Business.",
      "work.2.stat": "Top 20 HK Business · 60k monthly",
      "work.3.tag": "Launch campaign",
      "work.3.title": "Sheung Wan <em>Boutique</em>",
      "work.3.body": "Full-funnel product launch: hero film, UGC seeding and paid social that sold out 400 units in 72 hours.",
      "work.3.stat": "Sold out in 72h · 4.1x ROAS",
      "work.4.tag": "Always-on program",
      "work.4.title": "Café <em>collective</em>",
      "work.4.body": "Multi-brand always-on program — shared UGC engine and agency ops for six cafés that needed marketing, not another one-off shoot.",
      "work.4.stat": "300+ assets · 9.2% avg engagement",

      "manifesto.eyebrow": "Our belief",
      "manifesto.html": "<span class=\"reveal-word\">We're</span> <span class=\"reveal-word\">an</span> <span class=\"reveal-word accent\">AI</span> <span class=\"reveal-word accent\">creative</span> <span class=\"reveal-word accent\">marketing</span> <span class=\"reveal-word accent\">agency</span> <span class=\"reveal-word\">—</span> <span class=\"reveal-word\">strategy,</span> <span class=\"reveal-word\">campaigns</span> <span class=\"reveal-word\">and</span> <span class=\"reveal-word\">content</span> <span class=\"reveal-word\">systems</span> <span class=\"reveal-word\">for</span> <span class=\"reveal-word\">brands</span> <span class=\"reveal-word\">that</span> <span class=\"reveal-word\">need</span> <span class=\"reveal-word\">to</span> <span class=\"reveal-word\">get</span> <span class=\"reveal-word\">seen.</span>",
      "manifesto.foot": "Human taste. AI speed. Marketing that works in Hong Kong — and travels beyond it.",

      "reel.eyebrow": "Agency reel · 香港製造 · 2026",
      "reel.static": "We make it",
      "reel.note": "Strategy in the morning. Creative by the afternoon. A month of marketing assets from a single production day — wherever your brand actually lives.",

      "bigstat.quote": "“<b>2.4 million views</b> came out&nbsp;of one noodle shop in Sham Shui Po.”",
      "bigstat.n1": "Views from one noodle shop",
      "bigstat.n2": "Weekend covers, sustained",
      "bigstat.n3": "Videos from one shoot day",
      "bigstat.client": "Client",
      "bigstat.shoot": "Shoot time",
      "bigstat.videos": "Videos cut",
      "bigstat.covers": "Weekend covers",
      "bigstat.day": "1 day",

      "process.head": "How we <em>work</em>",
      "process.sub": "An agency process built for speed — from positioning to creative that performs, usually in under three weeks.",
      "process.1.t": "Strategy",
      "process.1.b": "We start with the marketing problem, not a content wishlist. Audience, offer, channels, competitive noise — then the one sharp idea worth building a campaign around. Street-level insight meets AI research speed.",
      "process.1.n": "Deliverable — a one-page creative marketing brief.",
      "process.2.t": "AI creative direction",
      "process.2.b": "AI is our production accelerator, not our creative director. We generate concepts, hooks and variants at volume, then a human kills almost all of them. Speed on the machine side, taste and brand judgement on ours.",
      "process.2.n": "Deliverable — concepts, hooks &amp; campaign frames in 72 hours.",
      "process.3.t": "Produce",
      "process.3.b": "Campaign films, short-form systems, UGC and bilingual assets — shot lean, cut platform-native, designed for both organic and paid. One production day can feed a month of marketing.",
      "process.3.n": "Deliverable — a campaign kit + always-on content pack.",
      "process.4.t": "Grow",
      "process.4.b": "Publishing isn't the finish line. We distribute, read retention and performance, re-cut winners, and feed paid with creative that already proved itself organically. Marketing as a system you tune.",
      "process.4.n": "Deliverable — monthly reporting a human actually explains.",

      "services.head": "What we <em>do</em>",
      "services.sub": "Full-stack AI creative marketing — strategy through production, including UGC.",
      "services.1.t": "AI creative strategy",
      "services.1.b": "Positioning, campaign platforms and channel plans — accelerated with AI research, decided by humans who know what Hong Kong will actually stop for.",
      "services.2.t": "Short-form &amp; social systems",
      "services.2.b": "TikTok, Reels, Shorts and always-on social engines — hook-first creative built to stop the scroll, travel, and feed paid.",
      "services.3.t": "Brand campaigns",
      "services.3.b": "From concept to hero film to paid rollout — including podcasts and long-form when the brand needs a deeper content system.",
      "services.4.t": "UGC &amp; creator programs",
      "services.4.b": "Creator-style content at marketing scale — authentic UGC that converts, without the influencer price tag.",

      "jstrip.eyebrow": "From the journal · 我哋寫嘅嘢",
      "jstrip.more": "Read all →",
      "jstrip.1.t": "Why your restaurant's TikTok should look like a mistake",
      "jstrip.1.b": "Polished food film is invisible. Shaky, loud and slightly wrong is what gets sent to the group chat.",
      "jstrip.2.t": "AI doesn't make content — it makes volume",
      "jstrip.2.b": "The machine gives you fifty cuts. Taste is still the only thing deciding which one ships.",
      "jstrip.3.t": "The 9-second rule for Hong Kong short-form",
      "jstrip.3.b": "MTR-length attention. What we've learned about the beat where HK viewers decide to stay.",
      "jstrip.read": "min read",

      "cta.title": "Let's build marketing<br /><span class=\"accent\">worth watching.</span>",
      "cta.sub": "Tell us about your brand. We'll tell you the campaign we'd run.",
      "cta.btn": "Contact us →",
      "cta.loc": "Based in Hong Kong · Working everywhere · 香港製造",
      "footer.agency": "AI Creative Marketing Agency.",
      "footer.tag": "<a href=\"journal.html\" data-magnetic>Journal</a> · AI Creative Marketing Agency.",

      "about.eyebrow": "About the agency · 關於我們",
      "about.title": "We're <em>Basis Media</em>",
      "about.intro": "A Hong Kong AI creative marketing agency — strategy, campaigns and content systems for brands that need more than another post.",
      "about.lead": "We build marketing that gets <em>seen, shared and acted on</em> — not decks that die in a shared drive.",
      "workPage.eyebrow": "The portfolio · 作品集",
      "workPage.title": "Selected <em>work</em>",
      "workPage.intro": "Agency campaigns and always-on programs for Hong Kong brands — growth, launch, brand platforms and UGC systems, measured in results.",
      "workPage.ctaTitle": "Got a brief<br /><span class=\"accent\">worth running?</span>",
      "workPage.ctaSub": "Tell us about your brand. We'll tell you the campaign we'd build.",
      "journal.eyebrow": "Journal · 隨筆",
      "journal.title": "Notes from <em>the agency</em>",
      "journal.intro": "What we're learning about AI creative marketing, attention and Hong Kong audiences — written between campaigns, not by a content calendar.",
      "contact.eyebrow": "Contact · 聯絡我們",
      "contact.title": "Let's talk about<br /><em>the brief.</em>",
      "contact.intro": "New campaigns, always-on programs, or a sharp creative problem — tell us what you're trying to move. We'll come back with how we'd run it.",
      "contact.emailLabel": "Email the agency",
      "contact.note": "We usually reply within one business day.",
      "contact.based": "Based",
      "contact.basedVal": "Hong Kong · 香港<br />Working everywhere",
      "contact.best": "Best for",
      "contact.bestVal": "Growth campaigns, launches, brand platforms, UGC programs",
      "contact.lang": "Languages",
      "contact.langVal": "English · 粵語 · 中英",
      "contact.formLabel": "Or send a short brief",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.brand": "Brand / company",
      "contact.achieve": "What are you trying to achieve?",
      "contact.send": "Send brief →",
      "contact.formNote": "Opens your email app addressed to business@basis.hk. Prefer WhatsApp-speed? Email still works best for briefs.",
      "contact.ph.name": "Your name",
      "contact.ph.email": "you@brand.com",
      "contact.ph.brand": "Brand name",
      "contact.ph.brief": "Launch, growth, always-on, UGC — a few lines is enough.",
      "contact.c1.t": "The goal",
      "contact.c1.b": "Awareness, launch sell-through, always-on pipeline — pick the outcome.",
      "contact.c2.t": "The audience",
      "contact.c2.b": "Who needs to see it, and where they actually scroll in Hong Kong.",
      "contact.c3.t": "The timing",
      "contact.c3.b": "Drop date, campaign window, or ongoing retainer.",

      "about.p1": "We're an <em>AI creative marketing agency</em>. Strategy first, creative that performs, production that scales — including short-form, brand films and UGC when the brief needs them.",
      "about.p2": "Traditional agencies sell process. Pure content shops sell volume. We sit in the gap: marketing problems solved with AI-accelerated creative, directed by people who know what Hong Kong audiences actually stop for.",
      "about.p3": "AI changed the maths. We can research faster, concept wider, and ship campaign kits that used to take a quarter — which means ambitious brands get big-agency creative without big-agency drag. UGC and creator programs stay in the mix because authentic content still converts; it just sits inside a sharper marketing system now.",
      "about.g1.t": "Founder-led",
      "about.g1.b": "You work with the people who make the work — no account layer, no handoff to a junior you never meet. Small team, direct line, decisions made fast.",
      "about.g2.t": "AI-accelerated marketing",
      "about.g2.b": "AI handles research drafts, variants, cutdowns and transcripts. Humans handle strategy, taste and brand judgement — the parts that still decide whether marketing works.",
      "about.g3.t": "Hong Kong-made",
      "about.g3.b": "We live here. Bilingual by default — Cantonese and English, subtitled both ways — because this city's audience is genuinely split and pretending otherwise loses half of it.",
      "about.g4.t": "Built as a growth system",
      "about.g4.b": "We don't launch campaigns and walk away. We publish, read performance, re-cut winners, and feed paid with creative that already proved itself. Marketing you tune, not marketing you forget.",
      "about.manLabel": "Manifesto · 我哋信咩",
      "about.man1": "A deck has never once made someone <em>queue for noodles.</em>",
      "about.man3": "We start with the marketing problem — then build the creative system that solves it. Campaigns, short-form, UGC, paid — whichever mix actually moves the brand.",
      "about.man5": "Big brands got loud budgets. Everyone else needs <em>sharper creative marketing.</em> That's the gap we close.",
      "about.manSig": "Basis Media · AI Creative Marketing Agency · HK",
      "about.bts.eyebrow": "Behind the scenes · 拍攝現場",
      "about.bts.note": "Strategy in the room. Production on the street. Four districts, no bloat.",
      "about.caps.eyebrow": "What we do",
      "about.caps.1": "AI creative strategy",
      "about.caps.2": "Brand &amp; campaign creative",
      "about.caps.3": "Short-form &amp; social systems",
      "about.caps.4": "UGC &amp; creator programs",
      "about.caps.5": "Paid creative &amp; cutdowns",
      "about.caps.6": "Bilingual 中英",
      "about.caps.7": "Podcasts &amp; long-form systems",
      "about.caps.8": "Monthly reporting a human explains",

      "journal.1.t": "Why your restaurant's TikTok should look like a <em>mistake</em>",
      "journal.1.d": "The glossy food film your cousin's agency shot is invisible. Hand-held, badly lit, one honest sentence from the boss — that's the clip that ends up in a group chat at 11pm.",
      "journal.1.m": "4 min read",
      "journal.2.t": "AI doesn't make content — it makes <em>volume</em>",
      "journal.2.d": "We can generate fifty variants before lunch. That's not the win. The win is that a human now has all afternoon to pick the one that's actually good, and kill the other forty-nine.",
      "journal.2.m": "6 min read",
      "journal.3.t": "The 9-second rule for Hong Kong <em>short-form</em>",
      "journal.3.d": "Between Central and Admiralty you get about nine seconds of a stranger's life. We broke down retention curves from 300+ HK videos to find where people actually decide to stay.",
      "journal.3.m": "5 min read",
      "journal.4.t": "粵語定英文？ Stop choosing — <em>subtitle both</em>",
      "journal.4.d": "Hong Kong's feed is genuinely bilingual and picking one language quietly deletes half your audience. How we script, shoot and cut for 中英 without doubling the budget.",
      "journal.4.m": "4 min read",

      "jstrip.1.read": "4 min read",
      "jstrip.2.read": "6 min read",
      "jstrip.3.read": "5 min read",

      "meta.home": "Basis Media HK — AI Creative Marketing Agency",
      "meta.about": "About — Basis Media, Hong Kong AI Creative Marketing Agency",
      "meta.work": "Selected work — Basis Media HK",
      "meta.journal": "Journal — Basis Media, AI Creative Marketing Agency",
      "meta.contact": "Contact — Basis Media, AI Creative Marketing Agency",

      "case.back": "← All work",
      "case.challenge": "The challenge",
      "case.strategy": "The strategy",
      "case.campaign": "The campaign",
      "case.results": "The results",
      "case.role": "Agency role",
      "case.timeline": "Timeline",
      "case.channels": "Channels",
      "case.year": "Year",
      "case.next": "Next project",
      "case.start": "Start a campaign",
      "cursor.view": "View",
      "cursor.talk": "Talk"
    },

    zh: {
      "nav.work": "作品",
      "nav.process": "流程",
      "nav.services": "服務",
      "nav.journal": "隨筆",
      "nav.about": "關於",
      "nav.contact": "聯絡",
      "nav.talk": "傾吓先",
      "nav.talkArrow": "傾吓先 →",
      "nav.menu": "打開選單",
      "menu.foot": "香港 · AI 創意行銷公司 · Hong Kong",

      "hero.eyebrow": "香港 · AI 創意行銷公司 · Hong Kong",
      "hero.title": "<span class=\"line\"><span class=\"w\">真係</span> <span class=\"w accent\">會被睇到</span></span><span class=\"line\"><span class=\"w\">嘅</span> <span class=\"w\">AI</span></span><span class=\"line\"><span class=\"w accent\">行銷</span><span class=\"w\">。</span></span>",
      "hero.body": "我哋係香港嘅 AI 創意行銷公司 — 策略、campaign 同內容系統，幫品牌郁得動。短片、品牌影片、付費創意同 UGC，由識呢個城市嘅人執手。",
      "hero.cta": "睇吓作品 ↓",
      "hero.scroll": "向下掃",

      "statement.html": "<span class=\"reveal-word\">大部分</span> <span class=\"reveal-word\">行銷</span> <span class=\"reveal-word\">都冇人理。</span> <span class=\"reveal-word accent\">我哋</span> <span class=\"reveal-word accent\">做嘅</span> <span class=\"reveal-word accent\">係人真係會停低</span> <span class=\"reveal-word accent\">—</span> <span class=\"reveal-word accent\">然後行動</span> <span class=\"reveal-word accent\">嘅創意。</span>",

      "caps.eyebrow": "我哋唔同喺邊",
      "caps.1": "AI 創意行銷",
      "caps.2": "策略 + 製作",
      "caps.3": "香港製造",
      "caps.4": "創辦人主導",
      "caps.5": "雙語 中英",
      "caps.6": "講求成效",
      "caps.trust": "合作過 <strong>Tech Data</strong> · <strong>a tavola</strong> · <strong>ÓNA</strong> · <strong>Pho Bay</strong> · <strong>SPICE</strong> · 同香港多個品牌。",
      "clients.eyebrow": "合作過嘅客戶",
      "partner.eyebrow": "我哋嘅官方技術合作夥伴",
      "partner.note": "支援可擴展 campaign 嘅平台同電商基建。",

      "work.head": "精選<em>作品</em>",
      "work.sub": "Agency campaign 同長期計劃 — 由策略做到創意，用結果計數。",
      "work.1.tag": "增長 campaign",
      "work.1.title": "Kowloon Noodle Co.",
      "work.1.body": "週末需求 campaign：創意平台、12 條短片系統，再由 organic 推到付費，令深水埗老字號重新排長龍。",
      "work.1.stat": "240 萬觸及 · 週末客量 +180%",
      "work.2.tag": "品牌平台",
      "work.2.title": "後生仔講嘢 <em>/ Youngblood</em>",
      "work.2.body": "雙語思想領袖平台 — 節目格式、campaign pack 同分發系統，令創辦人權威打入香港商業 Top 20。",
      "work.2.stat": "香港商業 Top 20 · 每月 6 萬",
      "work.3.tag": "上市 campaign",
      "work.3.title": "上環 <em>Boutique</em>",
      "work.3.body": "全漏斗產品上市：主視覺影片、UGC 種草同付費社交，72 小時賣清 400 件。",
      "work.3.stat": "72 小時售罄 · 4.1x ROAS",
      "work.4.tag": "長期計劃",
      "work.4.title": "Café <em>collective</em>",
      "work.4.body": "多品牌長期行銷計劃 — 共用 UGC 引擎同 agency 營運，幫六間咖啡店做行銷，唔係再拍一次就算。",
      "work.4.stat": "每季 300+ 素材 · 平均互動 9.2%",

      "manifesto.eyebrow": "我哋信咩",
      "manifesto.html": "<span class=\"reveal-word\">我哋</span> <span class=\"reveal-word\">係一間</span> <span class=\"reveal-word accent\">AI</span> <span class=\"reveal-word accent\">創意</span> <span class=\"reveal-word accent\">行銷</span> <span class=\"reveal-word accent\">公司</span> <span class=\"reveal-word\">—</span> <span class=\"reveal-word\">為需要被睇到嘅品牌</span> <span class=\"reveal-word\">提供策略、</span> <span class=\"reveal-word\">campaign</span> <span class=\"reveal-word\">同內容系統。</span>",
      "manifesto.foot": "人嘅味道。AI 嘅速度。喺香港行得通 — 亦傳得出去嘅行銷。",

      "reel.eyebrow": "Agency reel · 香港製造 · 2026",
      "reel.static": "我哋整到",
      "reel.note": "朝早定策略，晏晝出創意。一個拍攝日可以餵足一個月行銷素材 — 喺你品牌真正存在嘅地方拍。",

      "bigstat.quote": "「喺深水埗一間粉麵店，做出<strong>240 萬次觀看</strong>。」",
      "bigstat.n1": "一間粉麵店帶嚟嘅觀看",
      "bigstat.n2": "週末客量，持續上升",
      "bigstat.n3": "一個拍攝日出嘅片",
      "bigstat.client": "客戶",
      "bigstat.shoot": "拍攝時間",
      "bigstat.videos": "剪輯數量",
      "bigstat.covers": "週末客量",
      "bigstat.day": "1 日",

      "process.head": "我哋點<em>做</em>",
      "process.sub": "為速度而設嘅 agency 流程 — 由定位到有表現嘅創意，通常三個星期內搞掂。",
      "process.1.t": "策略",
      "process.1.b": "我哋由行銷問題入手，唔係內容願望清單。受眾、產品、渠道、競爭噪音 — 再搵出值得建整個 campaign 嘅一個銳利想法。街頭洞察配 AI 研究速度。",
      "process.1.n": "交付 — 一頁式創意行銷 brief。",
      "process.2.t": "AI 創意方向",
      "process.2.b": "AI 係我哋嘅製作加速器，唔係創意總監。我哋大量產出概念、hook 同變體，再由人杀掉絕大部分。機器負責快，我哋負責味道同品牌判斷。",
      "process.2.n": "交付 — 72 小時內出概念、hook 同 campaign 框架。",
      "process.3.t": "製作",
      "process.3.b": "Campaign 影片、短片系統、UGC 同雙語素材 — 精簡拍、平台原生剪，同時服務 organic 同付費。一個拍攝日可以餵足一個月行銷。",
      "process.3.n": "交付 — campaign kit + 長期內容包。",
      "process.4.t": "增長",
      "process.4.b": "發布唔係終點。我哋分發、睇留存同表現、重剪贏家，再用 organic 已驗證嘅創意餵付費。行銷係一套調校系統。",
      "process.4.n": "交付 — 有人真係解釋得明嘅每月報告。",

      "services.head": "我哋<em>做咩</em>",
      "services.sub": "全棧 AI 創意行銷 — 由策略到製作，包括 UGC。",
      "services.1.t": "AI 創意策略",
      "services.1.b": "定位、campaign 平台同渠道計劃 — AI 研究加速，由識香港人會停低睇咩嘅人拍板。",
      "services.2.t": "短片同社交系統",
      "services.2.b": "TikTok、Reels、Shorts 同長期社交引擎 — hook 先行，令內容停得住、傳得開、餵得動付費。",
      "services.3.t": "品牌 campaign",
      "services.3.b": "由概念到主視覺影片到付費 rollout — 品牌需要更深內容系統時，亦包括 podcast 同長片。",
      "services.4.t": "UGC 同創作者計劃",
      "services.4.b": "創作者風格內容做到行銷規模 — 真實 UGC 轉得到化，又唔使網紅天價。",

      "jstrip.eyebrow": "嚟自隨筆 · From the journal",
      "jstrip.more": "睇晒 →",
      "jstrip.1.t": "點解餐廳 TikTok 要睇落似「整錯」",
      "jstrip.1.b": "靚到發光嘅美食片冇人睇。震震、大聲、有啲唔完美，先會入到 group chat。",
      "jstrip.2.t": "AI 唔係整內容 — 係整產量",
      "jstrip.2.b": "機器畀你五十條。邊條出街，仲係口味決定。",
      "jstrip.3.t": "香港短片嘅 9 秒法則",
      "jstrip.3.b": "港鐵長度嘅注意力。我哋學到觀眾決定留低嘅嗰一下。",
      "jstrip.read": "分鐘",

      "cta.title": "一齊整出<br /><span class=\"accent\">值得睇嘅行銷。</span>",
      "cta.sub": "同我哋講你嘅品牌。我哋會講會點跑呢個 campaign。",
      "cta.btn": "聯絡我哋 →",
      "cta.loc": "以香港為家 · 工作遍全球 · 香港製造",
      "footer.agency": "AI 創意行銷公司。",
      "footer.tag": "<a href=\"journal.html\" data-magnetic>隨筆</a> · AI 創意行銷公司。",

      "about.eyebrow": "關於我哋 · About the agency",
      "about.title": "我哋係 <em>Basis Media</em>",
      "about.intro": "香港 AI 創意行銷公司 — 為需要多過再發一篇 post 嘅品牌，提供策略、campaign 同內容系統。",
      "about.lead": "我哋整嘅行銷係人會<em>睇到、分享、然後行動</em> — 唔係死喺 shared drive 嘅簡報。",
      "workPage.eyebrow": "作品集 · The portfolio",
      "workPage.title": "精選<em>作品</em>",
      "workPage.intro": "為香港品牌做嘅 agency campaign 同長期計劃 — 增長、上市、品牌平台同 UGC 系統，用結果計數。",
      "workPage.ctaTitle": "有 brief<br /><span class=\"accent\">值得跑？</span>",
      "workPage.ctaSub": "同我哋講你嘅品牌。我哋會講會點起呢個 campaign。",
      "journal.eyebrow": "隨筆 · Journal",
      "journal.title": "嚟自<em>agency</em>嘅筆記",
      "journal.intro": "我哋學緊嘅 AI 創意行銷、注意力同香港受眾 — 喺 campaign 之間寫，唔係內容日曆逼出嚟。",
      "contact.eyebrow": "聯絡 · Contact",
      "contact.title": "一齊傾吓<br /><em>個 brief。</em>",
      "contact.intro": "新 campaign、長期計劃，定係一個銳利嘅創意問題 — 同我哋講你想郁啲咩。我哋會返嚟講點跑。",
      "contact.emailLabel": "電郵聯絡",
      "contact.note": "通常一個工作天內回覆。",
      "contact.based": "基地",
      "contact.basedVal": "香港 · Hong Kong<br />工作遍全球",
      "contact.best": "最適合",
      "contact.bestVal": "增長 campaign、上市、品牌平台、UGC 計劃",
      "contact.lang": "語言",
      "contact.langVal": "英文 · 粵語 · 中英",
      "contact.formLabel": "或者寄份短 brief",
      "contact.name": "姓名",
      "contact.email": "電郵",
      "contact.brand": "品牌 / 公司",
      "contact.achieve": "你想達到咩目標？",
      "contact.send": "傳送 brief →",
      "contact.formNote": "會開啟你嘅電郵 app，收件人係 business@basis.hk。想快？電郵仍然最啱交 brief。",
      "contact.ph.name": "你嘅名",
      "contact.ph.email": "you@brand.com",
      "contact.ph.brand": "品牌名",
      "contact.ph.brief": "上市、增長、長期、UGC — 寫幾句就得。",
      "contact.c1.t": "目標",
      "contact.c1.b": "曝光、上市賣清、長期 pipeline — 揀個結果。",
      "contact.c2.t": "受眾",
      "contact.c2.b": "邊啲人要睇到，同佢哋喺香港邊度 scroll。",
      "contact.c3.t": "時間",
      "contact.c3.b": "上市日、campaign 窗口，定係長期 retainer。",

      "about.p1": "我哋係一間<em>AI 創意行銷公司</em>。策略先行，創意要有表現，製作要夠規模 — 當 brief 需要，包括短片、品牌影片同 UGC。",
      "about.p2": "傳統 agency 賣流程。純內容店賣產量。我哋坐喺中間：用 AI 加速嘅創意解決行銷問題，由識香港觀眾會停低睇咩嘅人執手。",
      "about.p3": "AI 改咗帳。我哋可以研究得快啲、概念得闊啲、以前要一季先出得齊嘅 campaign kit 而家交得出 — 有野心嘅品牌可以攞到大型 agency 嘅創意，又唔使大型 agency 嘅拖泥帶水。UGC 同創作者計劃仍然喺度，因為真實內容仲係轉得化；而家佢哋坐喺更銳利嘅行銷系統入面。",
      "about.g1.t": "創辦人主導",
      "about.g1.b": "你直接同整嘢嘅人合作 — 冇 account 層，唔會轉手畀你從未見過嘅 junior。細團隊、直綫、決策快。",
      "about.g2.t": "AI 加速行銷",
      "about.g2.b": "AI 處理研究草稿、變體、剪短版同字幕。人負責策略、味道同品牌判斷 — 決定行銷成唔成事嘅部分。",
      "about.g3.t": "香港製造",
      "about.g3.b": "我哋住呢度。預設雙語 — 粵語同英文，兩邊都有字幕 — 因為呢個城市嘅觀眾真係分兩邊，扮睇唔到就會失去一半。",
      "about.g4.t": "建成增長系統",
      "about.g4.b": "我哋唔會 launch 完就走人。我哋發布、睇表現、重剪贏家，再用 organic 已驗證嘅創意餵付費。係你會調校嘅行銷，唔係你會忘記嘅行銷。",
      "about.manLabel": "宣言 · Manifesto",
      "about.man1": "簡報從未令任何人<em>為粉麵排長龍。</em>",
      "about.man3": "我哋由行銷問題入手 — 再起一套解決佢嘅創意系統。Campaign、短片、UGC、付費 — 邊樣真係郁得動品牌就用邊樣。",
      "about.man5": "大品牌有大聲預算。其他人需要<em>更銳利嘅創意行銷。</em>呢個就係我哋補嘅位。",
      "about.manSig": "Basis Media · AI 創意行銷公司 · 香港",
      "about.bts.eyebrow": "拍攝現場 · Behind the scenes",
      "about.bts.note": "策略喺房入面。製作喺街上。四個區，冇多餘。",
      "about.caps.eyebrow": "我哋做咩",
      "about.caps.1": "AI 創意策略",
      "about.caps.2": "品牌同 campaign 創意",
      "about.caps.3": "短片同社交系統",
      "about.caps.4": "UGC 同創作者計劃",
      "about.caps.5": "付費創意同剪短版",
      "about.caps.6": "雙語 中英",
      "about.caps.7": "Podcast 同長片系統",
      "about.caps.8": "有人解釋得明嘅每月報告",

      "journal.1.t": "點解餐廳 TikTok 要睇落似<em>整錯</em>",
      "journal.1.d": "你表哥 agency 拍嗰條又光又靚嘅美食片冇人睇。手持、燈光差、老闆一句老實說話 — 先係夜晚十一點入到 group chat 嗰條。",
      "journal.1.m": "4 分鐘",
      "journal.2.t": "AI 唔係整內容 — 係整<em>產量</em>",
      "journal.2.d": "午餐前可以出五十個變體。呢個唔係贏。贏係人而家有成個晏晝去揀真係好嘅一條，杀掉其他四十九條。",
      "journal.2.m": "6 分鐘",
      "journal.3.t": "香港<em>短片</em>嘅 9 秒法則",
      "journal.3.d": "中環到金鐘，你大約有陌生人生命嘅九秒。我哋拆過 300+ 條香港片嘅留存曲線，搵觀眾決定留低嘅位置。",
      "journal.3.m": "5 分鐘",
      "journal.4.t": "粵語定英文？唔好揀 — <em>兩邊都上字幕</em>",
      "journal.4.d": "香港 feed 真係雙語，揀一種語言就靜靜刪走一半受眾。我哋點樣寫、拍、剪中英，又唔使預算加倍。",
      "journal.4.m": "4 分鐘",

      "jstrip.1.read": "4 分鐘",
      "jstrip.2.read": "6 分鐘",
      "jstrip.3.read": "5 分鐘",

      "meta.home": "Basis Media HK — AI 創意行銷公司",
      "meta.about": "關於 — Basis Media，香港 AI 創意行銷公司",
      "meta.work": "精選作品 — Basis Media HK",
      "meta.journal": "隨筆 — Basis Media，AI 創意行銷公司",
      "meta.contact": "聯絡 — Basis Media，AI 創意行銷公司",

      "case.back": "← 全部作品",
      "case.challenge": "挑戰",
      "case.strategy": "策略",
      "case.campaign": "Campaign",
      "case.results": "結果",
      "case.role": "Agency 角色",
      "case.timeline": "時間線",
      "case.channels": "渠道",
      "case.year": "年份",
      "case.next": "下一個項目",
      "case.start": "開始一個 campaign",
      "cursor.view": "睇",
      "cursor.talk": "傾"
    }
  };

  function getLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "zh" || stored === "en") return stored;
    } catch (e) {}
    return "en";
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "zh") lang = "en";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function t(lang, key) {
    var pack = dict[lang] || dict.en;
    if (pack[key] != null) return pack[key];
    return dict.en[key] != null ? dict.en[key] : key;
  }

  function apply(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-HK" : "en";
    document.documentElement.setAttribute("data-lang", lang);
    document.body.classList.toggle("is-zh", lang === "zh");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      if (el.childElementCount && !el.hasAttribute("data-i18n-force-text")) return;
      el.textContent = t(lang, key);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (!key) return;
      document.title = t(lang, key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(lang, key);
      el.querySelectorAll("[data-i18n]").forEach(function (child) {
        var ck = child.getAttribute("data-i18n");
        if (!ck) return;
        if (child.childElementCount && !child.hasAttribute("data-i18n-force-text")) return;
        child.textContent = t(lang, ck);
      });
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      el.setAttribute("placeholder", t(lang, key));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      el.setAttribute("aria-label", t(lang, key));
    });

    document.querySelectorAll("[data-cursor]").forEach(function (el) {
      var cur = el.getAttribute("data-cursor");
      if (cur === "View" || cur === "睇") el.setAttribute("data-cursor", t(lang, "cursor.view"));
      if (cur === "Talk" || cur === "傾") el.setAttribute("data-cursor", t(lang, "cursor.talk"));
    });

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // Re-trigger word reveals if needed
    document.querySelectorAll(".reveal-word").forEach(function (w) {
      w.style.opacity = "";
    });
  }

  function bind() {
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-set-lang"));
      });
    });
  }

  function boot() {
    bind();
    apply(getLang());
  }

  window.BasisI18n = { setLang: setLang, getLang: getLang, apply: apply, t: t };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
