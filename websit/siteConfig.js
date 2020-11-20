// List of projects/orgs using your project for the users page.
const users = [];

const siteConfig = {
  title: "Risen.JS",
  tagline:
    "Risen is an easy, fast, and modern microservice framework for Node.JS",
  url: "https://daviemakz.github.io",
  baseUrl: "/risen-js/",
  // Used for publishing and more
  projectName: "Risen.JS",
  organizationName: "daviemaks",
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "quickstart", label: "Docs" },
    { doc: "settingup", label: "Tutorial" },
    { doc: "apirisen", label: "API" },
    { page: "help", label: "Help" }
  ],
  // If you have users set above, you add it here:
  users,
  /* path to images for header/footer */
  headerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",
  logoPath: "img/logo.png",
  /* Colors for website */
  colors: {
    primaryColor: "#2B0548",
    secondaryColor: "#20756d"
  },
  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2019 - ${new Date().getFullYear()} David Makuni`,
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },
  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],
  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,
  // Open Graph and Twitter card images.
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",
  footer: {
    links: [],
    logo: {},
    copyright: `Copyright © 2019 - ${new Date().getFullYear()} David Makuni`
  }
};

module.exports = siteConfig;
