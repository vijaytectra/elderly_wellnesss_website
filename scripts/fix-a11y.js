#!/usr/bin/env node
/**
 * Accessibility fixes applied uniformly across the site's HTML pages.
 *
 * 1. Social links contained only an <i> icon, so they had no accessible name
 *    (Lighthouse: "Links do not have a discernible name"). The icon font is
 *    also deferred, so these links were unnamed for sighted users too until it
 *    arrived. Adds aria-label + marks the icon decorative.
 * 2. target="_blank" links get rel="noopener" (security / best practice).
 *
 * Usage: node scripts/fix-a11y.js <file.html> [more.html ...]
 */
const fs = require('fs');

// host fragment -> accessible name
const SOCIALS = [
  [/facebook\.com/i, 'Elderly Wellness on Facebook'],
  [/(^|\/\/)(x\.com|twitter\.com)/i, 'Elderly Wellness on X'],
  [/instagram\.com/i, 'Elderly Wellness on Instagram'],
  [/linkedin\.com/i, 'Elderly Wellness on LinkedIn'],
  [/youtube\.com|youtu\.be/i, 'Elderly Wellness on YouTube'],
  [/pinterest\./i, 'Elderly Wellness on Pinterest'],
  [/wa\.me|whatsapp/i, 'Chat with Elderly Wellness on WhatsApp'],
];

let totalLabels = 0;
let totalRel = 0;

for (const file of process.argv.slice(2)) {
  let html = fs.readFileSync(file, 'utf8');
  let labels = 0;
  let rels = 0;

  // Name icon-only links and mark their glyph decorative.
  html = html.replace(
    /<a\s([^>]*href="([^"]+)"[^>]*)>(\s*<i class="(icofont-[a-z0-9-]+)"><\/i>\s*)<\/a>/gi,
    (match, attrs, href, inner, iconClass) => {
      const hit = SOCIALS.find(([re]) => re.test(href));
      if (!hit || /aria-label=/i.test(attrs)) return match;
      labels++;
      return `<a ${attrs} aria-label="${hit[1]}"><i class="${iconClass}" aria-hidden="true"></i></a>`;
    }
  );

  // rel="noopener" on every new-tab link that lacks a rel.
  html = html.replace(/<a\s([^>]*target="_blank"[^>]*)>/gi, (match, attrs) => {
    if (/\srel=/i.test(attrs)) return match;
    rels++;
    return `<a ${attrs.trimEnd()} rel="noopener">`;
  });

  if (labels || rels) fs.writeFileSync(file, html);
  console.log(`  ${file.padEnd(52)} aria-label:${labels}  rel=noopener:${rels}`);
  totalLabels += labels;
  totalRel += rels;
}

console.log(`\n  total: ${totalLabels} labels, ${totalRel} rel="noopener"`);
