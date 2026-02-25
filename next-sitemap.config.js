// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nunoreisrealteam.pt",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://nunoreisrealteam.pt/pt", hreflang: "pt" },
    { href: "https://nunoreisrealteam.pt/en", hreflang: "en" },
  ],
};
