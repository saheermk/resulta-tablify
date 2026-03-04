# Madrassa Poster App

A React-based web application built with Vite and TypeScript to automatically generate and export student result posters/reports from Google Sheets.

## Features

- **Dynamic Data Fetching**: Pulls student data directly from a configured Google Sheet using PapaParse.
- **Responsive Preview**: Scales the A4-sized poster preview dynamically based on the screen width using CSS transforms.
- **High-Quality Export**: Captures the generated posters exactly at A4 dimensions offline and exports them as PNG or PDF using `html2canvas` and `jsPDF`.
- **Filtering**: Allows filtering to show only students with a 'PASS' status.
- **Pagination support**: Limits the number of students per page to 13 and handles automatic pagination for PDF and image exports.
- **QR Code Generation**: Includes a footer with an embedded QR code pointing to a specified URL.

## Tech Stack

- React 19
- TypeScript
- Vite
- Framer Motion
- PapaParse (for CSV parsing from Google Sheets)
- html2canvas & jsPDF (for exporting)
- react-qr-code (for footer QR)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or download the code.
2. Navigate to the project directory:
   ```bash
   cd madrassa-poster-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Edit `src/config/appConfig.ts` to customize:

- `madrassaSheet.sheetId`: The ID of your public Google Sheet.
- `institution`: Your institution's English and Arabic names.
- `detailedColumns`: Mapping of Google Sheet columns to the application's data model based on the selected class.
- `branding`: Logo and Footer URL details.

### Running Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Architecture

- **`src/App.tsx`**: Main container managing state, data fetching from Google Sheets, export logic, and responsive viewing.
- **`src/components/MadrassaPosterMaker.tsx`**: Renders the A4-sized printable component, handling robust pagination, header rendering, and mapped rows.
- **`src/config/appConfig.ts`**: The central configurator that prevents core logic modification for every new deployment.

See `project_report.md` for a comprehensive overview of the project and instructions on how to build it from scratch!
