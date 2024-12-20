/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.photofix.in.net",
  generateRobotsTxt: true, // Automatically generate robots.txt
  sitemapSize: 5000, // Optional: Limit the number of URLs per sitemap file
  exclude: ["/admin/*", "/dashboard/*"], // Exclude specific routes if necessary
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.photofix.in.net/sitemap.xml", // Add any additional sitemaps if needed
    ],
  },
};

module.exports = config;
