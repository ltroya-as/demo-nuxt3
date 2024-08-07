export default defineEventHandler(() => ({
  finishedAt: (new Date().getTime() / 1000).toFixed(0),
  checkResults: [
    {
      name: 'WebsiteUptime',
      label: 'Website Uptime',
      status: 'ok',
      notificationMessage: 'The site is up and running',
      shortSummary: 'No short summary',
      meta: {},
    },
  ],
}))
