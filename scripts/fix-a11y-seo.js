#!/usr/bin/env node
/**
 * Second pass of accessibility / SEO fixes, from a full static audit of every
 * content page. Each fix targets a specific Lighthouse audit:
 *
 *   link-name          icon-only <a> had no accessible name
 *   button-name        the icon-only #close-video modal button (12 pages)
 *   aria-allowed-role  role="presentation" hard-coded on <button> elements
 *   label              contact.html inputs used placeholder only
 *   link-text          a bare "Read More" link on about.html
 *   meta-description   missing on the three company/ legal pages
 *   canonical          three service pages pointed at a DIFFERENT page
 *
 * Usage: node scripts/fix-a11y-seo.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);

const counts = {};
const bump = (k, n = 1) => (counts[k] = (counts[k] || 0) + n);

const ALL_PAGES = [
  'index.html', 'about.html', 'contact.html', 'elderly-wellness.html',
  'how-elderly-wellness-works.html', 'investors.html', 'board-of-advisors.html',
  'nursing-services-for-elders.html', 'physiotherapy-services-for-elders.html',
  'geriatric-care-services-for-elders.html',
  'assisted-living-support-services-for-elders.html',
  'company/privacy-policy.html', 'company/refund-and-cancellation-policies.html',
  'company/terms-and-conditions.html',
];

// Accessible name for an icon-only control, derived from its IcoFont class.
const ICON_NAMES = {
  'icofont-facebook': 'Facebook',
  'icofont-twitter': 'X (Twitter)',
  'icofont-instagram': 'Instagram',
  'icofont-linkedin': 'LinkedIn',
  'icofont-pinterest': 'Pinterest',
  'icofont-whatsapp': 'WhatsApp',
  'icofont-email': 'Email',
  'icofont-brand-android-robot': 'Get it on Google Play',
  'icofont-brand-apple': 'Download on the App Store',
  'icofont-brand-windows': 'Get it from the Microsoft Store',
  'icofont-close-line-circled': 'Close video',
  'icofont-close': 'Close',
  'icofont-arrow-up': 'Back to top',
  'icofont-arrow-right': 'Next',
  'icofont-navigation-menu': 'Open menu',
};

for (const page of ALL_PAGES) {
  const abs = path.join(ROOT, page);
  if (!fs.existsSync(abs)) continue;
  let html = read(page);
  const before = html;

  // 1. Icon-only links: give them a name and mark the glyph decorative.
  html = html.replace(
    /<a\s([^>]*)>(\s*)<i class="(icofont-[a-z0-9-]+)"\s*><\/i>(\s*)<\/a>/gi,
    (m, attrs, s1, icon, s2) => {
      if (/aria-label=/i.test(attrs)) return m;
      const name = ICON_NAMES[icon];
      if (!name) return m;
      bump('link-name');
      return `<a ${attrs.trim()} aria-label="${name}">${s1}<i class="${icon}" aria-hidden="true"></i>${s2}</a>`;
    }
  );

  // 2. Icon-only buttons (the #close-video modal control).
  html = html.replace(
    /<button\s([^>]*)>(\s*)<i class="(icofont-[a-z0-9-]+)"\s*><\/i>(\s*)<\/button>/gi,
    (m, attrs, s1, icon, s2) => {
      if (/aria-label=/i.test(attrs)) return m;
      const name = ICON_NAMES[icon] || 'Close';
      bump('button-name');
      return `<button ${attrs.trim()} aria-label="${name}">${s1}<i class="${icon}" aria-hidden="true"></i>${s2}</button>`;
    }
  );

  // 3. role="presentation" is not an allowed role on <button>. These are
  //    hand-copied Owl arrows; drop the role and name them instead.
  html = html.replace(
    /<button([^>]*?)\srole="presentation"([^>]*)>/gi,
    (m, a, b) => {
      const rest = (a + b).trim();
      const isPrev = /owl-prev/.test(rest);
      const isNext = /owl-next/.test(rest);
      if (!isPrev && !isNext) return m;
      bump('aria-allowed-role');
      return `<button ${rest} aria-label="${isPrev ? 'Previous slide' : 'Next slide'}">`;
    }
  );

  // 4. Form controls labelled only by placeholder.
  html = html.replace(/<(input|textarea)\s([^>]*?)\/?>/gi, (m, tag, attrs) => {
    if (/aria-label=|aria-labelledby=|type="(hidden|submit|button|checkbox|radio)"/i.test(attrs)) return m;
    const ph = attrs.match(/placeholder="([^"]+)"/i);
    if (!ph) return m;
    bump('label');
    const selfClose = m.trim().endsWith('/>') ? '/>' : '>';
    return `<${tag} ${attrs.trim()} aria-label="${ph[1].replace(/\s*\*\s*$/, '').trim()}"${selfClose}`;
  });

  if (html !== before) write(page, html);
}

// 5. Generic "Read More" link on about.html -> descriptive accessible name.
{
  const f = 'about.html';
  let html = read(f);
  const out = html.replace(
    /<a href="the-inspiring-journey-of-eldery\.html"([^>]*)>Read More<\/a>/i,
    (m, attrs) => {
      if (/aria-label=/i.test(attrs)) return m;
      bump('link-text');
      return `<a href="the-inspiring-journey-of-eldery.html"${attrs} aria-label="Read more: the inspiring journey of Elderly">Read More</a>`;
    }
  );
  if (out !== html) write(f, out);
}

// 6. Meta descriptions for the legal pages.
const DESCRIPTIONS = {
  'company/privacy-policy.html':
    'Privacy Policy for Elderly Wellness - how we collect, use, and protect the personal information of our elder care service users in Chennai.',
  'company/refund-and-cancellation-policies.html':
    'Refund and cancellation policy for Elderly Wellness elder care services - booking changes, cancellation windows, and how refunds are processed.',
  'company/terms-and-conditions.html':
    'Terms and conditions for using Elderly Wellness elder care services in Chennai, covering bookings, payments, and service responsibilities.',
};
for (const [f, desc] of Object.entries(DESCRIPTIONS)) {
  let html = read(f);
  if (/<meta\s+name="description"/i.test(html)) continue;
  const out = html.replace(/(<title>[\s\S]*?<\/title>)/i, `$1\n    <meta name="description" content="${desc}"/>`);
  if (out !== html) { write(f, out); bump('meta-description'); }
}

// 7. Canonical URLs. Three service pages pointed at the physiotherapy page,
//    telling search engines to de-index them in favour of a competitor page.
const SITE = 'https://www.theelderlywellness.com/';
const CANONICAL_FOR = (page) => SITE + (page === 'index.html' ? '' : page.replace(/\\/g, '/'));

for (const page of ALL_PAGES) {
  const abs = path.join(ROOT, page);
  if (!fs.existsSync(abs)) continue;
  let html = read(page);
  const want = CANONICAL_FOR(page);
  const existing = html.match(/<link rel="canonical" href="([^"]*)"\s*\/?>/i);

  if (existing) {
    // Only rewrite when it points somewhere other than this page.
    const cur = existing[1];
    const curFile = cur.replace(/^https?:\/\/[^/]+\//, '').replace(/^\.\//, '');
    const wantFile = page === 'index.html' ? '' : page.replace(/\\/g, '/');
    const curBase = curFile.split('/').pop();
    const wantBase = wantFile.split('/').pop();
    if (curBase !== wantBase) {
      html = html.replace(existing[0], `<link rel="canonical" href="${want}"/>`);
      write(page, html);
      bump('canonical-wrong');
    }
  } else {
    const out = html.replace(/(<title>[\s\S]*?<\/title>)/i, `$1\n    <link rel="canonical" href="${want}"/>`);
    if (out !== html) { write(page, out); bump('canonical-added'); }
  }
}

console.log('  fixes applied:');
for (const [k, v] of Object.entries(counts)) console.log(`    ${k.padEnd(20)} ${v}`);
