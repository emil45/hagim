import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('Hebrew homepage loads', async ({ page }) => {
    await page.goto('/he');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('English homepage loads', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Russian homepage loads', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('About page', () => {
  test('Hebrew about page loads', async ({ page }) => {
    await page.goto('/he/about');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('English about page loads', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Russian about page loads', async ({ page }) => {
    await page.goto('/ru/about');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('Glossary page', () => {
  test('Hebrew glossary page loads', async ({ page }) => {
    await page.goto('/he/glossary');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('English glossary page loads', async ({ page }) => {
    await page.goto('/en/glossary');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Russian glossary page loads', async ({ page }) => {
    await page.goto('/ru/glossary');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('Localization', () => {
  test('Hebrew locale has RTL direction', async ({ page }) => {
    await page.goto('/he');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('English locale has LTR direction', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('Russian locale has LTR direction', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });
});

test.describe('Page structure', () => {
  test('homepage has main content area', async ({ page }) => {
    await page.goto('/he');
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('about page renders content', async ({ page }) => {
    await page.goto('/he/about');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('glossary page renders content', async ({ page }) => {
    await page.goto('/he/glossary');
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
