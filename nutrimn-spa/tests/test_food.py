import subprocess, time
from playwright.sync_api import sync_playwright
pr = subprocess.Popen(["python3","-m","http.server","8820","-d","/home/claude/nutri-spa/src"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
time.sleep(1.2)
res=[]
def check(n,c): res.append(bool(c)); print("PASS" if c else "FAIL", n)
try:
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={"width":1280,"height":900}); errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
        pg.goto("http://localhost:8820/index.html"); pg.wait_for_selector(".food-card")
        check("home: 6 featured cards", pg.locator(".food-card").count()==6)
        check("home: stats show 19 foods", pg.inner_text(".stat strong")=="19")
        check("home: Ямааны мах card", "Ямааны мах" in pg.inner_text("#app"))
        pg.evaluate("location.hash='#/search'"); pg.wait_for_selector("table.data")
        check("search: 19 rows", pg.locator("tbody tr").count()==19)
        pg.fill("#q","мах"); check("search 'мах' -> 5 rows", pg.locator("tbody tr").count()==5)
        pg.fill("#q","milk"); check("search English milk -> Airag + Cow milk", pg.locator("tbody tr").count()==2 and "Үхрийн сүү" in pg.inner_text("tbody"))
        pg.fill("#q",""); pg.select_option("#cat","vegetables"); check("category vegetables -> 5", pg.locator("tbody tr").count()==5)
        pg.select_option("#cat","all"); pg.click("th[data-sort=kcal]"); pg.click("th[data-sort=kcal]")
        check("sort kcal desc: first is Будаа(365)", "Будаа" in pg.locator("tbody tr").first.inner_text())
        pg.fill("#q","zzzz"); check("no results message", "Илэрц олдсонгүй" in pg.inner_text("#results"))
        pg.fill("#q","")
        pg.evaluate("location.hash='#/calculator'"); pg.wait_for_selector("#add")
        pg.select_option("#food","potato"); pg.fill("#grams","200"); pg.click("#add")
        pg.select_option("#food","mutton"); pg.fill("#grams","100"); pg.click("#add")
        kcal=pg.inner_text("[data-total=kcal]"); prot=pg.inner_text("[data-total=protein]")
        check(f"calc kcal = 77*2+234 = 388 (got {kcal})", kcal=="388")
        check(f"calc protein = 2*2+17 = 21 (got {prot})", prot=="21")
        check("energy share bar shown", pg.locator(".bar .seg").count()==3)
        pg.fill("#grams","-5"); pg.click("#add"); check("invalid grams rejected", "1" in pg.inner_text("#msg") and pg.locator("tbody tr").count()==2)
        pg.click("[data-remove='0']"); check("remove row -> kcal 234", pg.inner_text("[data-total=kcal]")=="234")
        pg.click("#langToggle"); pg.wait_for_timeout(300)
        check("EN: calculator kept & translated", pg.inner_text("#app h1")=="Meal calculator" and "Mutton" in pg.inner_text("#list"))
        pg.evaluate("location.hash='#/home'"); pg.wait_for_selector(".food-card")
        check("EN home shows Goat meat", "Goat meat" in pg.inner_text("#app"))
        pg.click("#clear") if pg.locator("#clear").count() else None
        check("no console errors", not errs)
        if errs: print(errs)
        b.close()
finally:
    pr.terminate()
print(f"{sum(res)}/{len(res)} passed")
