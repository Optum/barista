module.exports = {
  title: 'Barista',
  tagline: 'open source license and vulnerability management',
  url: 'https://optum.github.io/barista',
  baseUrl: '/barista/',
  favicon: 'img/barista-icon.ico',
  organizationName: 'Optum', // Usually your GitHub org/user name.
  projectName: 'barista', // Usually your repo name.
  onBrokenLinks: 'ignore',
  themeConfig: {
    navbar: {
      title: 'Barista Docs',
      logo: {
        alt: 'Barista logo',
        src: 'img/barista.png',
      },
      items: [
        {to: 'docs/overview', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/Optum/barista',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Admin Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/overview',
            },
            {
              label: 'Admin Setup',
              to: 'docs/setup-admin-tables',
            },
            {
              label: 'Project Setup',
              to: 'docs/setup-scan-project',
            },
          ],
        },
        {
          title: 'Technical Docs',
          items: [
            {
              label: 'Local Dev Environment Setup',
              to: 'docs/local-dev-environment',
            },
            {
              label: 'System Architecture',
              to: 'docs/architecture',
            },
            {
              label: 'License Scanners',
              to: 'docs/license-scanners',
            },
            {
              label: 'License Implementation',
              to: 'docs/licenses',
            },
            {
              label: 'How to Develop a Web Feature',
              to: 'docs/how-to-develop-a-feature',
            },
            {
              label: 'Building and Running Barista Using Docker',
              to: 'docs/barista-on-docker',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/Optum/barista/issues',
            },
            {
              label: 'Contributions to Barista',
              to: 'docs/contributions',
            },
            {
              label: 'Code of Conduct',
              to: 'docs/code-of-conduct',
            },
            {
              label: 'Individual Contributor License Agreement',
              to: 'docs/icla',
            },
          ],
          },
          {
          title: 'Attribution',
          items: [
            {
              label: 'barista-web',
              href: 'https://raw.githubusercontent.com/Optum/barista/master/barista-web/barista-web-attribution.txt',
            },
            {
              label: 'barista-api',
              href: 'https://raw.githubusercontent.com/Optum/barista/master/barista-api/barista-api-attribution.txt',
            },
            {
              label: 'barista-scan',
              href: 'https://raw.githubusercontent.com/Optum/barista/master/barista-scan/barista-scan-attribution.txt',
            },
          ],
          },
          {
              title: 'Project Build Status',
              items: [
                {
                  html: `
                  <a href="https://github.com/optum/barista" target="_blank" rel="noreferrer noopener" aria-label="Barista OSS Governance">
                    <img src="https://github.com/optum/barista/workflows/buildcontainers/badge.svg?branch=develop" alt="Container Build Status" />
                  </a>
                `,
                },
                {
                  html: `
                  <a href="https://github.com/optum/barista" target="_blank" rel="noreferrer noopener" aria-label="Barista OSS Governance">
                    <img src="https://github.com/optum/barista/workflows/buildrelease/badge.svg?branch=master" alt="Container Release Status" />
                  </a>
                `,
                },
              ],
            },
          ],
      copyright: `Copyright © ${new Date().getFullYear()} Optum, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
