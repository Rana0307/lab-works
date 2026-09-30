import subprocess, time
from playwright.sync_api import sync_playwright
steps = {"step1_router":8801,"step2_pages":8802,"step3_layout":8803,"step4_navbar":8804}
exp = {"home":"Welcome to the home page.","search":"This is the search page.","calculator":"This is the calculator page.",
       "books":"This is the books page.","contact":"This is the contact page."}
procs = [subprocess.Popen(["python3","-m","http.server",str(port),"-d",f"/home/claude/steps/{s}"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL) for s,port in steps.items()]
time.sleep(1.5)
total=0; ok=0
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for s,port in steps.items():
            pg = b.new_page(); errs=[]
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
            pg.goto(f"http://localhost:{port}/index.html"); pg.wait_for_selector("#app section")
            res=[]
            for r,txt in exp.items():
                pg.evaluate(f"location.hash='#/{r}'"); pg.wait_for_timeout(80)
                res.append(txt in pg.inner_text("#app"))
            pg.evaluate("location.hash='#/nope'"); pg.wait_for_timeout(80)
            res.append("Page not found." in pg.inner_text("#app"))
            if s == "step4_navbar": res.append(pg.locator(".app-navbar").count()==1)
            res.append(not errs)
            total+=len(res); ok+=sum(res)
            print(s, "PASS" if all(res) else f"FAIL {res} {errs}")
        b.close()
finally:
    for pr in procs: pr.terminate()
print(f"{ok}/{total} checks passed (step5 covered by test_spa.py)")
