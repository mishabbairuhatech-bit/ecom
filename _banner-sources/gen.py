import json, pathlib

TPL = """<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html, body {{ width:900px; height:1200px; overflow:hidden; }}
  .stage {{ position:relative; width:900px; height:1200px; overflow:hidden; background:#2e2c27; }}
  .stage img {{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:{pos}; }}
  .scrim {{ position:absolute; inset:0; background:linear-gradient(to top, rgba(20,19,16,.78) 0%, rgba(20,19,16,.38) 38%, rgba(20,19,16,0) 62%); }}
  .copy {{ position:absolute; left:64px; right:64px; bottom:72px; color:#fff; }}
  .eyebrow {{ font-family:'Jost',sans-serif; font-weight:400; font-size:19px; letter-spacing:.30em; text-transform:uppercase; opacity:.92; }}
  .rule {{ width:56px; height:1px; background:rgba(255,255,255,.65); margin:22px 0 26px; }}
  .offer {{ font-family:'Cormorant Garamond',serif; font-weight:500; font-size:{size}px; line-height:1.02; letter-spacing:.05em; text-transform:uppercase; }}
  .sub {{ font-family:'Jost',sans-serif; font-weight:300; font-size:21px; letter-spacing:.02em; margin-top:22px; opacity:.9; }}
  .tag {{ display:inline-block; font-family:'Jost',sans-serif; font-weight:400; font-size:14px; letter-spacing:.24em; text-transform:uppercase;
          background:#fff; color:#2e2c27; padding:11px 20px; margin-top:34px; }}
</style></head>
<body>
  <div class="stage">
    <img src="{img}">
    <div class="scrim"></div>
    <div class="copy">
      <div class="eyebrow">{eyebrow}</div>
      <div class="rule"></div>
      <div class="offer">{offer}</div>
      <div class="sub">{sub}</div>
      <div class="tag">{tag}</div>
    </div>
  </div>
</body></html>
"""

banners = [
    dict(name="new-arrivals-offer",
         img="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1400&h=1900&auto=format&fit=crop",
         pos="center", eyebrow="New Arrivals", offer="Up to<br>40% off", size=104,
         sub="The new season, just landed.", tag="Shop Now"),
    dict(name="best-sellers-offer",
         img="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1400&h=1900&auto=format&fit=crop",
         pos="center", eyebrow="Best Sellers", offer="Extra<br>15% off", size=104,
         sub="The pieces everyone comes back for.", tag="Shop Now"),
    dict(name="real-estate-offer",
         img="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&h=1900&auto=format&fit=crop",
         pos="center", eyebrow="Real Estate", offer="Zero<br>brokerage", size=88,
         sub="On every listing booked this season.", tag="View Homes"),
]

out = pathlib.Path(__file__).parent
for b in banners:
    (out / f"{b['name']}.html").write_text(TPL.format(**b))
print(json.dumps([b["name"] for b in banners]))
