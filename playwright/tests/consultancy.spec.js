import { test, expect } from '@playwright/test'

test.describe('Consultancy page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/consultancy/')
  })

  test('Should show consultancy hero', async ({ page }) => {
    const id = 'consultancy-hero'

    await expect(
      page.getByTestId(id).getByRole('heading', { name: 'Consultancy' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id).getByTestId('breadcrumb')).toHaveCount(1)

    await expect(
      page
        .getByTestId(id)
        .getByTestId('breadcrumb')
        .getByTestId('breadcrumb-item'),
    ).toHaveCount(2)

    await expect(page.getByTestId(id).getByTestId('consultancy-hero-content'))
      .toContainText(`Benchmark provides individual consultancy projects for many types
    of companies across the lithium ion battery supply chain, electric
    vehicle manufacturers, and investors.
  `)

    await page.waitForSelector('[data-testid="signInDesktopBtn"]')
    await page.waitForTimeout(500)

    await page
      .getByTestId(id)
      .getByRole('button', { name: 'Contact us' })
      .first()
      .click()

    await expect(page.getByTestId('contact-modal')).toHaveCount(1)
  })

  test('Should show About services section', async ({ page }) => {
    const id = 'consultancy-about-services'

    await expect(
      page.getByTestId(id).getByRole('heading', { name: 'About our services' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id))
      .toContainText(`Benchmark is a lithium-ion battery supply chain specialist
          organization which independently collects first-hand price, production
          and cost data. Using this we provide regular analysis on the
          international trade of minerals and metals, offering a range of
          information products through subscriptions, reports, events and
          consultancy services.`)
  })

  test('Should show Our methodology section', async ({ page }) => {
    const id = 'consultancy-our-methodology'

    await expect(
      page.getByTestId(id).getByRole('heading', { name: 'Our methodology' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id))
      .toContainText(`Benchmark’s consulting methodology is focused on insights from the
            primary data continuously collected throughout the global industry`)

    await expect(
      page
        .getByTestId(id)
        .getByTestId('timeline-services')
        .getByTestId('timeline-service-item'),
    ).toHaveCount(4)
  })

  test('Should show Our process section', async ({ page }) => {
    const id = 'consultancy-our-process'

    await expect(
      page.getByTestId(id).getByRole('heading', { name: 'Our process' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id))
      .toContainText(`Our continuous contact with the value chain, we have the world’s
            most extensive, accurate and up-to-date and knowledge bases.`)

    await expect(
      page
        .getByTestId(id)
        .getByTestId('timeline-with-squares')
        .getByTestId('timeline-with-squares-item'),
    ).toHaveCount(5)
  })

  test('Should show Our consultancy services section', async ({ page }) => {
    const id = 'consultancy-our-services'

    await expect(
      page
        .getByTestId(id)
        .getByRole('heading', { name: 'Our consultancy services' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id))
      .toContainText(`Whether a lithium brine or hard rock mine, battery grade
                chemical operation or lithium ion battery gigafactory plant,
                Benchmark Minerals’ unique data sets, world class analysis and
                independent thinking offers you the solution in a variety of
                ways:`)

    await expect(
      page.getByTestId(id).getByTestId('consultancy-our-services-item'),
    ).toHaveCount(9)
  })

  test('Should show Who is this designed for? section', async ({ page }) => {
    const id = 'consultancy-designed-for'

    await expect(
      page
        .getByTestId(id)
        .getByRole('heading', { name: 'Who is this designed for?' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id))
      .toContainText(`Whether a lithium brine or hard rock mine, battery grade chemical
            operation or lithium ion battery gigafactory plant, Benchmark
            Minerals’ unique data sets, world class analysis and independent
            thinking offers you the solution in a variety of ways:`)

    await expect(
      page
        .getByTestId(id)
        .getByTestId('consultancy-designed-for-items')
        .getByTestId('general-card'),
    ).toHaveCount(3)
  })

  test('Should show How do we deliver? section', async ({ page }) => {
    const id = 'consultancy-we-deliver'

    await expect(
      page.getByTestId(id).getByRole('heading', { name: 'How do we deliver?' }),
    ).toHaveCount(1)

    await expect(page.getByTestId(id))
      .toContainText(`Benchmark’s most senior and relevant analysts will be your
              consult. Providing workshops, in depth presentations and vast
              excel databases.`)

    await page.waitForSelector('[data-testid="signInDesktopBtn"]')
    await page.waitForTimeout(500)

    await page
      .getByTestId(id)
      .getByRole('button', { name: 'Find out more' })
      .first()
      .click()

    await expect(page.getByTestId('contact-modal')).toHaveCount(1)
  })
})
