// PDFCharger Chrome Extension - Background Service Worker

const PDFCHARGER_URL = 'https://pdfcharger.com/en';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: 'pdfcharger-open',
        title: 'Open with PDFCharger',
        contexts: ['link', 'page']
    });

    // Create submenu for specific tools
    chrome.contextMenus.create({
        id: 'pdfcharger-merge',
        parentId: 'pdfcharger-open',
        title: 'Merge PDFs',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'pdfcharger-compress',
        parentId: 'pdfcharger-open',
        title: 'Compress PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'pdfcharger-convert',
        parentId: 'pdfcharger-open',
        title: 'Convert to PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'pdfcharger-all-tools',
        parentId: 'pdfcharger-open',
        title: 'All Tools →',
        contexts: ['link', 'page']
    });

    console.log('PDFCharger context menus created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let url = PDFCHARGER_URL;

    switch (info.menuItemId) {
        case 'pdfcharger-merge':
            url = `${PDFCHARGER_URL}/tools/merge-pdf`;
            break;
        case 'pdfcharger-compress':
            url = `${PDFCHARGER_URL}/tools/compress-pdf`;
            break;
        case 'pdfcharger-convert':
            url = `${PDFCHARGER_URL}/tools/jpg-to-pdf`;
            break;
        case 'pdfcharger-all-tools':
        case 'pdfcharger-open':
            url = PDFCHARGER_URL;
            break;
        default:
            url = PDFCHARGER_URL;
    }

    // Open PDFCharger in a new tab
    chrome.tabs.create({ url: url });
});

// Log when service worker starts
console.log('PDFCharger background service worker started');
