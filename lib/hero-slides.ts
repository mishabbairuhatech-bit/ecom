/**
 * Hero carousel slides.
 *
 * Two kinds of slide are supported:
 *
 *  - `image`  A finished banner file with the artwork and text already baked in.
 *             Drop the file into `public/banners/` and reference it as
 *             `/banners/your-file.jpg`. See public/banners/README.md for sizes.
 *
 *  - `split`  Built from parts — offer line, headline, badge, CTA and a photo,
 *             composed at render time over a background gradient.
 *
 * Mix both freely; the carousel renders each by its `kind`.
 */

export type HeroSlide =
  | {
      kind: "image";
      /** `/banners/…` for local files, or an https URL on an allowlisted host. */
      src: string;
      /** Describe the offer for screen readers, e.g. "Up to 40% off furniture". */
      alt: string;
      href: string;
      /**
       * Focal point when the banner is cropped. Defaults to `"left center"`,
       * which keeps left-aligned headline copy visible on narrow viewports.
       * Use `"center"` for artwork whose subject sits in the middle.
       */
      position?: string;
    }
  | {
      kind: "split";
      offer: string;
      headline: string;
      badge?: string;
      note?: string;
      href: string;
      cta: string;
      img: string;
      bg: string;
      text: "light" | "dark";
    };

export const heroSlides: HeroSlide[] = [
  {
    kind: "image",
    src: "/banners/prime-everyday-offers.png",
    alt: "Prime Everyday Offers — up to 60% off, extra up to 5% off for Prime members",
    href: "/shop?category=fashion",
    position: "left top",
  },
  {
    kind: "image",
    src: "/banners/premium-edit.png",
    alt: "The Premium Edit — up to 60% off premium fashion",
    href: "/shop?category=fashion",
    position: "left top",
  },
  {
    kind: "image",
    src: "/banners/flight-bookings.png",
    alt: "Mega Deal Days — save 11% on flight bookings with Amazon Pay",
    href: "/shop",
    position: "left top",
  },
];
