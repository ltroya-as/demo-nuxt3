export const VARIANT_CLASSES = {
  BASE: {
    primary:
      'bg-p-500 border-p-500 text-s-900 font-montserrat font-semibold md:hover:bg-p-700 md:hover:text-s-900 md:hover:border-p-700 active:bg-p-900 active:border-p-900 active:text-s-900 px-4 py-2',
    secondary:
      'bg-s-900 border-s-900 text-white font-montserrat font-semibold md:hover:text-white md:hover:bg-s-700 md:hover:border-s-700 active:bg-s-500 active:border-s-500 active:text-white px-4 py-2',
    tertiary:
      'bg-transparent border-s-600 text-p-em-high font-montserrat font-semibold md:hover:text-white md:hover:bg-s-700 border-s-600 active:bg-s-500 active:border-s-500 active:text-white px-4 py-2',
    'tertiary-dark':
      'bg-transparent text-white border-p-400 font-montserrat font-semibold md:hover:bg-p-400 md:hover:text-s-900 md:hover:border-p-400 active:bg-p-800 active:border-p-800 active:text-s-900 px-4 py-2',
    link: 'font-bold text-base border-0 border-b rounded-none border-s-900 md:hover:border-p-900 md:hover:text-p-900',
    clean:
      'bg-white outline -outline-offset-2 outline-2 outline-p-500 text-s-900 font-montserrat font-semibold md:hover:bg-p-500 md:hover:text-s-900 active:bg-p-600 active:text-white px-4 py-3',
  },

  DISABLED: {
    WITH_SPINNER: {
      primary: '',
      secondary: '',
    },
    WITHOUT_SPINNER: {
      primary:
        'disabled:opacity-60 disabled:bg-s-400 disabled:border-s-400 disabled:text-s-600 ',
      secondary:
        'disabled:opacity-60 disabled:bg-s-400 disabled:border-s-400 disabled:text-s-600',
      tertiary:
        'disabled:opacity-60 disabled:bg-white disabled:border-s-300 disabled:text-s-400 disabled:hover:bg-white disabled:hover:text-p-em-high disabled:hover:cursor-not-allowed',
      'tertiary-dark':
        'disabled:opacity-60 disabled:bg-white disabled:border-s-400 disabled:text-s-600',
    },
    HOVER: {
      primary: 'hover:!bg-p-500',
      secondary: 'hover:!bg-white hover:!border-p-500',
    },
    HOVER_WITHOUT_SPINNER: {
      primary:
        'hover:!bg-s-400 hover:!border-s-400 hover:!text-s-600 hover:!cursor-not-allowed',
      secondary:
        'hover:!text-s-600 hover:!bg-s-400 hover:!border-s-400 hover:!cursor-not-allowed',
    },
  },

  SPINNER: {
    primary: 'text-s-900',
    secondary: 'text-p-500',
  },

  DOWNLOAD: {
    primary: 'bg-p-900',
    secondary: 'bg-s-500',
    tertiary: 'bg-s-500',
    'tertiary-dark': 'bg-p-800',
  },
}
