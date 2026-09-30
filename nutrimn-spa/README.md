# NutriMN - Mongolian Food Composition Database (SPA)

Цэвэр JavaScript (ES modules) дээр бичсэн Single Page Application.

- `src/` - эцсийн хувилбар (router, pages, layout, navbar, i18n + хүнсний найрлагын өгөгдөл, хайлт, тооцоолуур)
- `steps/` - 2.1 ... 2.5 болон step6_food_data хувилбарууд
- `tests/` - Playwright автомат шалгалт

## Ажиллуулах
    cd src
    python -m http.server 8000
http://localhost:8000 (ES module тул file:// хэлбэрээр ажиллахгүй)

## Өгөгдөл
`src/data/nutritions.json` дахь утгууд нь ОЙРОЛЦОО лавлах тоо. Албан ёсны Монгол хүнсний найрлагын хүснэгтээр солино уу.
