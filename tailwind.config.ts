import { type Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import bga2022 from './tailwind/bga2022'
import bme22 from './tailwind/bme22'
import bmw2022 from './tailwind/bmw2022'
import bwo21 from './tailwind/bwo21'

const emcolorDisabled = 'rgba(253, 189, 0, 0.38)'

const config: Config = {
  content: [
    './components/**/*.{js,vue,ts}',
    './constants/**/*.{js,vue,ts}',
    './constants/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './assets/**/*.svg',
    './utils/custom-legends.js',
  ],
  theme: {
    colors: {
      esg: {
        'industry-leading': '#006134',
        'good-practice': '#19bf55',
        'moderate-visibility': '#ffb628',
        'limited-visibility': '#e17e1e',
      },
      inherit: 'inherit',
      // primary colors
      p: {
        50: '#FFF7E0',
        100: '#FEEBB2',
        200: '#FEDE80',
        300: '#FDD24C',
        400: '#FDC723',
        500: '#FDBD00',
        600: '#FDAF00',
        700: '#FD9C00',
        800: '#FD8B00',
        900: '#FD8B00',

        // on primary
        em: {
          disabled: 'rgba(0, 0, 0, 0.38)',
          medium: 'rgba(0, 0, 0, 0.6)',
          high: 'rgba(0, 0, 0, 0.87)',
        },
      },

      // secondary colors
      s: {
        50: '#FAFBFF',
        100: '#F5F6FB',
        200: '#F0F1F7',
        300: '#E4E5EB',
        400: '#C2C3C8',
        500: '#A4A5AA',
        600: '#7A7B80',
        700: '#66676C',
        800: '#47484C',
        900: '#25262A',
        // on secondary
        em: {
          disabled: 'rgba(255, 255, 255, 0.38)',
          medium: 'rgba(255, 255, 255, 0.74)',
          high: '#FFFFFF',
        },
        emcolor: {
          disabled: emcolorDisabled,
          medium: 'rgba(253, 189, 0, 0.74)',
          high: '#FDBD00',
        },
      },

      surface: {
        em: {
          disabled: 'rgba(0, 0, 0, 0.38)',
          medium: 'rgba(0, 0, 0, 0.6)',
          high: 'rgba(0, 0, 0, 0.87)',
        },
      },

      grey: {
        50: '#FAFBFF',
        100: '#F3F5FC',
        200: '#DEE2EC',
        300: '#E7E8F0',
        400: '#CACBD3',
        600: '#C1C5CF',
        900: '#25262A',
      },

      disabled: '#DEE2EC',
      outline: 'rgba(0, 0, 0, 0.12)',
      transparent: 'rgba(0, 0, 0, 0)',
      error: '#B00020',
      'error-light': '#D94761',
      good: '#138800',
      white: '#fff',
      black: '#000',
      green: '#163220',
      'green-light': '#4BBF7C',
      blue: '#1B3050',
      'blue-light': '#a3bffa',
      input: '#7d020d',
      bwo21,
      bme22,
      bmw2022,
      bga2022,
      upTableIndicator: '#27AE60',
      downTableIndicator: '#EB5757',
      warning: '#F06800',
    },
    fill: (theme) => ({
      'p-100': theme('colors.p.100'),
      'p-500': theme('colors.p.500'),
      's-400': theme('colors.s.400'),
      white: '#fff',
    }),
    extend: {
      // this is for prose class
      typography: {
        DEFAULT: {
          css: {
            p: {
              '+ ul': {
                marginTop: '-20px',
              },
              '+ ol': {
                marginTop: '-20px',
              },
            },
            ul: {
              '> li': {
                marginTop: '0px',
                marginBottom: '0px',
              },
            },
            ol: {
              '> li': {
                marginTop: '0px',
                marginBottom: '0px',
              },
            },
          },
        },
      },
      screens: {
        'sm-height': { raw: '(max-height: 750px)' },
        '2xl': '1536px',
        '5xl': '1921px',
        '6xl': '2380px',
      },
      fontFamily: {
        lato: ['Lato'],
        baskerville: ['Libre Baskerville', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.625rem', // 10 px
      },
      minWidth: {
        'content-container': '1024px',
      },
      maxWidth: {
        'home-content': '1920px',
        'content-container': '1424px',
        'article-container': '944px',
        'article-container-medium': '678px',
        'contact-form-container': '1000px',
        'login-form-container': '400px',
        'newsletter-form-container': '1240px',
      },
      width: {
        // Medium article reference
        'article-container': '680px',
        'half-minus-p-2': 'calc(50% - 0.5rem)',
      },
      height: {
        'hero-container': '560px',
        '2xl-hero-container': '840px',

        'video-card-container': '470px',
        'xl-video-card-container': '500px',

        'esg-hero': '640px',
        '2xl-esg-hero': '720px',
      },
      boxShadow: {
        'dp-01':
          '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);',
        'dp-02':
          '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
        'dp-04':
          '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2);',
        file: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'summary-viewer-tab': 'inset 0px 4px 4px #D68B31',
        datepicker: `0 2px 0 0 ${emcolorDisabled}`,
        pm: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        'pm-hover': '0px 1px 10px #C1C5CF',
        'card-hover': '0px 0px 20px rgba(0, 0, 0, 0.1)',
        blockedIcon:
          '0 3px 5px 0 rgb(0 0 0 / 20%), 0 1px 18px 0 rgb(0 0 0 / 12%), 0 6px 10px 0 rgb(0 0 0 / 14%)',
      },
      transitionProperty: {
        'width-and-colors': 'width, background-color, filter',
        'shadow-and-colors': ' background-color, box-shadow',
      },
      spacing: {
        big: '60px',
        large: '30px',
        medium: '26px',
        low: '22px',
        small: '18px',
        '9/16': '56.25%',
      },
      keyframes: {
        bounceMenu: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        bounceMenu: 'bounceMenu 1s ease-in-out infinite',
      },
    },
  },
  plugins: [forms, typography],
}

export default config
