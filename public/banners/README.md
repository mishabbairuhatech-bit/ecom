# Hero banner images

Drop finished banner artwork in this folder and it will be served from
`/banners/<filename>`.

## Adding a banner

1. Save the file here, e.g. `public/banners/spring-sale.jpg`
2. Add an entry to `heroSlides` in `lib/hero-slides.ts`:

```ts
{
  kind: "image",
  src: "/banners/spring-sale.jpg",
  alt: "Up to 40% off furniture and home",
  href: "/shop?category=furniture",
}
```

The carousel picks it up on the next build. Autoplay, arrows, dots, and
hover-to-pause work the same for image slides as for the built-in `split` ones,
and slide order follows array order.

## Recommended specs

| | |
|---|---|
| Dimensions | **2400 × 800 px** (3:1) |
| Format | JPG for photography, PNG when you need transparency, WebP to save weight |
| File size | Under ~400 KB — Next.js re-encodes and serves modern formats automatically |
| Safe area | Keep text in the **left 45%** — banners anchor left, so the right edge crops first |

The hero is `58vh` tall (max 540px) and full-bleed, so a 3:1 banner is cropped
horizontally to fill it. Slides anchor to `left center` by default, which keeps
left-aligned headline copy intact at every width. Override per slide when the
subject sits elsewhere:

```ts
{ kind: "image", src: "/banners/sale.jpg", alt: "…", href: "/shop",
  position: "center" }
```

## Narrow screens

The shorter the viewport, the more of the right edge is cut. Either keep
anything essential in the left 45% of the artwork, or supply a separate mobile
crop and swap it on breakpoint.

## Rights

Only add artwork you own or have licensed — your own photography, a
commissioned design, or stock under a license that permits commercial use.
Banners taken from another retailer carry both their copyright and their
trademarks, and using them implies an affiliation that may not exist.
