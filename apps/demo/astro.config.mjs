// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

const github = 'https://github.com/crystallizeapi/libraries';
const githubURL = new URL(github);
const githubPathParts = githubURL.pathname.split('/');
const title = 'Crystallize Libraries Demo App';

export default defineConfig({
    site: `https://${githubPathParts[1]}.github.io/${githubPathParts[2]}`,
    base: `${githubPathParts[2]}`,
    trailingSlash: 'ignore',
    integrations: [
        starlight({
            title,
            logo: {
                src: './src/assets/crystallize.svg',
                alt: title,
            },
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/crystallizeapi/libraries' }],
            customCss: ['./src/tailwind.css'],
            components: {
                Footer: './src/ui/components/astro/footer.astro',
            },
            sidebar: [
                {
                    label: 'JS Api Client',
                    autogenerate: { directory: 'js-api-client' },
                },
                {
                    label: 'ReactJS Components',
                    autogenerate: { directory: 'reactjs-components' },
                },
            ],
        }),
        react(),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
