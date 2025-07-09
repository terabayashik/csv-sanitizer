import { expect, test } from "@playwright/test";

test.describe("CSV Sanitizer Web App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have correct title and heading", async ({ page }) => {
    await expect(page).toHaveTitle(/CSV Sanitizer/);
    await expect(page.getByRole("heading", { name: "CSV Sanitizer" })).toBeVisible();
  });

  test("should have input and output sections", async ({ page }) => {
    await expect(page.getByText("Input")).toBeVisible();
    await expect(page.getByText("Output")).toBeVisible();
    await expect(page.getByPlaceholder("Or paste your CSV text here...")).toBeVisible();
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toBeVisible();
  });

  test("should process CSV text input", async ({ page }) => {
    const inputText = 'name,age,city\nJohn,25,Tokyo\n"Jane",30,"New York"\nBob,,London';
    const expectedOutput = '"name","age","city"\n"John","25","Tokyo"\n"Jane","30","New York"\n"Bob","","London"';

    // Input CSV text
    await page.getByPlaceholder("Or paste your CSV text here...").fill(inputText);

    // Check output
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toHaveValue(expectedOutput);

    // Check that buttons are enabled
    await expect(page.getByRole("button", { name: "Copy to Clipboard" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "Download CSV" })).toBeEnabled();
  });

  test("should handle empty input", async ({ page }) => {
    // Clear input
    await page.getByPlaceholder("Or paste your CSV text here...").fill("");

    // Check output is empty
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toHaveValue("");

    // Check that buttons are disabled
    await expect(page.getByRole("button", { name: "Copy to Clipboard" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Download CSV" })).toBeDisabled();
  });

  test("should handle single line CSV", async ({ page }) => {
    const inputText = "name,age,city";
    const expectedOutput = '"name","age","city"';

    await page.getByPlaceholder("Or paste your CSV text here...").fill(inputText);
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toHaveValue(expectedOutput);
  });

  test("should handle CSV with empty fields", async ({ page }) => {
    const inputText = "name,,city\n,25,\nJohn,30,Tokyo";
    const expectedOutput = '"name","","city"\n"","25",""\n"John","30","Tokyo"';

    await page.getByPlaceholder("Or paste your CSV text here...").fill(inputText);
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toHaveValue(expectedOutput);
  });

  test("should handle CSV with mixed quoted and unquoted fields", async ({ page }) => {
    const inputText = 'name,age,"city",description\nJohn,25,"Tokyo",Engineer\n"Jane",30,New York,"Software Developer"';
    const expectedOutput =
      '"name","age","city","description"\n"John","25","Tokyo","Engineer"\n"Jane","30","New York","Software Developer"';

    await page.getByPlaceholder("Or paste your CSV text here...").fill(inputText);
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toHaveValue(expectedOutput);
  });

  test("should handle file input", async ({ page }) => {
    // Create a test CSV file content
    const csvContent = 'name,age,city\nJohn,25,Tokyo\n"Jane",30,"New York"';

    // Create a file input
    const fileInput = page.getByRole("button", { name: "Choose File" }).locator('input[type="file"]');

    // Create a file-like object
    await fileInput.setInputFiles({
      name: "test.csv",
      mimeType: "text/csv",
      buffer: Buffer.from(csvContent),
    });

    // Wait for processing
    await page.waitForTimeout(100);

    // Check that the input text area is populated
    await expect(page.getByPlaceholder("Or paste your CSV text here...")).toHaveValue(csvContent);

    // Check that the output is correctly sanitized
    const expectedOutput = '"name","age","city"\n"John","25","Tokyo"\n"Jane","30","New York"';
    await expect(page.getByPlaceholder("Sanitized CSV will appear here...")).toHaveValue(expectedOutput);
  });

  test("should copy to clipboard", async ({ page }) => {
    const inputText = "name,age\nJohn,25";

    await page.getByPlaceholder("Or paste your CSV text here...").fill(inputText);

    // Grant clipboard permissions
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click copy button
    await page.getByRole("button", { name: "Copy to Clipboard" }).click();

    // Check for success message
    await expect(page.getByText("Copied to clipboard!")).toBeVisible();

    // Verify clipboard content
    const clipboardContent = await page.evaluate(() =>
      (navigator as unknown as { clipboard: { readText(): Promise<string> } }).clipboard.readText(),
    );
    expect(clipboardContent).toBe('"name","age"\n"John","25"');
  });

  test("should download CSV file", async ({ page }) => {
    const inputText = "name,age\nJohn,25";

    await page.getByPlaceholder("Or paste your CSV text here...").fill(inputText);

    // Set up download handler
    const downloadPromise = page.waitForEvent("download");

    // Click download button
    await page.getByRole("button", { name: "Download CSV" }).click();

    // Wait for download
    const download = await downloadPromise;

    // Check download filename
    expect(download.suggestedFilename()).toBe("sanitized.csv");
  });

  test("should have drag and drop zone", async ({ page }) => {
    const dropZone = page.locator("#drop-zone");
    await expect(dropZone).toBeVisible();
    await expect(dropZone.getByText("Drag and drop a CSV file here")).toBeVisible();
  });

  test("should show features section", async ({ page }) => {
    await expect(page.getByText("Features")).toBeVisible();
    await expect(page.getByText("Wraps all unquoted CSV fields in double quotes")).toBeVisible();
    await expect(page.getByText("Preserves already quoted fields")).toBeVisible();
    await expect(page.getByText("Handles empty fields by wrapping them in quotes")).toBeVisible();
  });

  test("should be responsive", async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator(".main-content")).toHaveCSS("display", "grid");

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator(".main-content")).toHaveCSS("display", "grid");
  });
});
