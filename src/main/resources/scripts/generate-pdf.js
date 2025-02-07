const puppeteer = require('puppeteer');
const fs = require('fs');

const generatePdf = async (contentPath) => {
    const browser = await puppeteer.launch({ headless: true});
    const page = await browser.newPage();

    const content = fs.readFileSync(contentPath, 'utf8');

    await page.setContent(content);
    const pdfBuffer = await page.pdf({
        printBackground: true
    });

    await browser.close();

    return pdfBuffer;
};

const contentPath = process.argv[2];
const fileName = process.argv[3];
generatePdf(contentPath).then(pdfBuffer => {
    fs.writeFileSync(fileName, pdfBuffer);
}).catch(err => {
    console.error("Error generating PDF: ", err);
});