# Project Report: Madrassa Poster App

## Overview

The Madrassa Poster App is a frontend web application designed to automate the generation of student result posters and reports. It caters specifically to educational institutions (like Madrassas) to fetch student marks from a public Google Sheet and format them into printable, A4-sized paginated reports.

## Architecture & Technology Stack

- **Framework:** React 19 built with Vite.
- **Language:** TypeScript for type safety and structured configuration.
- **Styling:** Vanilla CSS (`App.css`, `index.css`) utilizing a responsive scale transform strategy to fit large A4 previews on smaller screens.
- **Data Source:** Google Sheets (fetched as CSV format).
- **Key Libraries:**
  - `papaparse`: For parsing the CSV data fetched from the Google Sheet.
  - `html2canvas`: For rendering DOM elements (the poster) into an image canvas.
  - `jspdf`: For packaging the rendered canvas images into a multi-page PDF document.
  - `react-qr-code`: For generating QR codes on the footer.

## Core Components

### 1. `src/App.tsx`

This is the main container and orchestrator of the application.

- **State Management:** Manages the selected class, fetched data, loading state, and filtering options (`showPassOnly`).
- **Data Fetching:** Uses a `useEffect` hook to fetch data whenever the `selectedClass` changes. It constructs a CSV export URL from the Google Sheet ID and parses it using `Papa.parse`.
- **Responsive Scaling:** Calculates a `scale` factor based on the window width to ensure the 794px wide A4 canvas fits proportionally on the screen.
- **Export Logic:** Contains the `handleDownloadPDF` and `handleDownloadPNG` functions. Crucially, it renders a hidden, unscaled version of the poster (`exportRef`) purely for capturing high-resolution screenshots avoiding UI scaling artifacts.

### 2. `src/components/MadrassaPosterMaker.tsx`

The presentation layer responsible for rendering the actual poster content.

- **Pagination:** Splits the incoming data into chunks of 13 rows per page (`ROWS_PER_PAGE = 13`).
- **Layout:** Renders each page as a strictly styled `a4-page-container` (794px by 1123px) ensuring it matches standard A4 proportions.
- **Content:** Displays the institution's branding (logo, English and Arabic names), a dynamic table of student records mapping headers to row data, and a pinned footer containing the generation date, page number, and a QR code.

### 3. `src/config/appConfig.ts`

The central configuration file that drives the app's behavior, making it highly reusable without altering the core logic.

- **`madrassaSheet`**: Contains the `sheetId`, available classes, and specifies which columns to display (`columnsToList`).
- **`detailedColumns`**: Extremely vital section mapping sheet column indices to data fields (like `serialNo`, `uid`, `name`, `fatherName`, `status`) and specific subjects for each class.
- **`institution` & `branding`**: Holds the names, logo paths, and footer URLs.

## How to Build from Scratch (For a Newbie)

If you are a beginner looking to recreate this project, follow these steps:

1. **Initialize the Project:**

   ```bash
   npm create vite@latest madrassa-poster-app -- --template react-ts
   cd madrassa-poster-app
   npm install
   ```

2. **Install Required Dependencies:**

   ```bash
   npm install papaparse html2canvas jspdf react-qr-code
   npm install -D @types/papaparse @types/html2canvas
   ```

3. **Set Up the Configuration (`src/config/appConfig.ts`):**
   Create a central place to store your Google Sheet ID, institution details, and column mappings. This is crucial for keeping the app flexible.

4. **Create the Poster Component (`src/components/MadrassaPosterMaker.tsx`):**
   - Design a fixed-size container (e.g., width 794px, height 1123px for A4).
   - Add props to accept `data` and `headers`.
   - Implement pagination logic to slice the data into manageable chunks per page (e.g., 13 rows).
   - Map over the data chunks to render a table for each page.

5. **Build the Main App Logic (`src/App.tsx`):**
   - Add a dropdown to select the class.
   - Use `useEffect` to fetch the Google Sheet data. The URL format is `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=SHEET_NAME`.
   - Parse this CSV data using `Papa.parse`.
   - Map the parsed rows into an array of objects based on your `appConfig.ts`.
   - Display the `MadrassaPosterMaker` component with the mapped data.

6. **Implement the Export Feature (The "Hidden" Div Trick):**
   - Instead of trying to capture the scaled, responsive preview the user sees, create a secondary, visually hidden (`display: none` or absolute positioned offscreen) instance of your `MadrassaPosterMaker`.
   - When the user clicks download, use `html2canvas` to target this hidden div to capture a perfect, un-shrunk A4 image.
   - Use `jsPDF` to add these images as pages and save the PDF.

7. **Styling and Polish:**
   - Add standard CSS to make the top bar look professional.
   - Implement a responsive scaling trick in `App.tsx` (using `transform: scale()`) to shrink the large A4 preview on mobile screens without breaking the layout.

## Conclusion

This project successfully solves the problem of dynamically converting tabular spreadsheet data into aesthetically pleasing, print-ready documents directly within the browser, avoiding the need for a complex backend rendering service.
