from playwright.sync_api import sync_playwright
base = "http://localhost:8765/index.html"
res = []
def check(name, cond):
    res.append((name, bool(cond))); print(("PASS" if cond else "FAIL"), name)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width":1280,"height":800})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
    pg.goto(base); pg.wait_for_selector("#app section")
    check("default route renders home (mn)", "Нүүр хуудас" in pg.inner_text("#app"))
    for route, mn in [("search","Хайлт"),("calculator","Тооцоолуур"),("books","Ном"),("contact","Холбоо барих")]:
        pg.evaluate(f"location.hash='#/{route}'"); pg.wait_for_timeout(100)
        check(f"#/{route} shows '{mn}'", mn in pg.inner_text("#app h1"))
        check(f"#/{route} nav link active", pg.locator(f".app-menu a.active").get_attribute("href")==f"#/{route}")
    pg.evaluate("location.hash='#/xyz'"); pg.wait_for_timeout(100)
    check("unknown hash -> 404 page", "404" in pg.inner_text("#app h1"))
    pg.evaluate("location.hash='#/search'"); pg.wait_for_timeout(100)
    pg.click("#langToggle"); pg.wait_for_timeout(100)
    check("language toggle -> English page title", pg.inner_text("#app h1")=="Search")
    check("language toggle -> navbar English", "Calculator" in pg.inner_text("#menu"))
    check("route kept after language toggle", pg.evaluate("location.hash")=="#/search")
    check("html lang=en", pg.evaluate("document.documentElement.lang")=="en")
    pg.reload(); pg.wait_for_selector("#app section")
    check("language persists after reload (localStorage)", pg.inner_text("#app h1")=="Search")
    pg.click("#langToggle"); pg.wait_for_timeout(100)
    check("toggle back to Mongolian", pg.inner_text("#app h1")=="Хайлт")
    # mobile
    m = b.new_page(viewport={"width":390,"height":800}); m.goto(base); m.wait_for_selector("#app section")
    check("mobile: menu hidden initially", not m.locator("#menu").is_visible())
    m.click("#burger"); check("mobile: burger opens menu", m.locator("#menu").is_visible())
    m.click("#menu a[href='#/books']"); m.wait_for_timeout(100)
    check("mobile: menu closes after link click", not m.locator("#menu").is_visible())
    check("no console/page errors", not errs)
    if errs: print(errs)
    b.close()
print(f"\n{sum(ok for _,ok in res)}/{len(res)} passed")
