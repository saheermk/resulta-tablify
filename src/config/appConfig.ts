import Logo from '../assets/logo.svg'


export const APP_CONFIG = {
  madrassaSheet: {
    sheetId: "1EyQw67ZHjxl0gTKdFCtWKXlIsewUmAoPoxO54D5nOJg",  // Example public sheet for testing
    sheetName: "Class Data",
    displayEnabled: true,
    selectedClass: 'Class 1' as const, // Used to determine which column mapping to use from detailedColumns
    availableClasses: [
      'Class 1',
      'Class 2',
      'Class 3',
      'Class 4',
      // 'Class 5',
      'Class 6',
      'Class 8',
      'Class 9',
      'Class 11'
    ], // Explicit dropdown list
    simpleResult: {
      enabled: false,
      classes: [
        'Class 5',
        'Class 6'
      ], // Treat these as strict 5-column sheets (A=Sl No, B=UID, C=Name, D=Father, E=Status)
    },
    columnsToList: [
      'serialNo',
      'uid',
      'name',
      'fatherName',
      'status'
    ] // Explicitly configure which columns to display in the table
  },
  branding: {
    logo: {
      src: Logo
    },
    printFooterUrl: "https://resulta.pages.dev/",
    fullPortalName: "Resulta"
  },
  institution: {
    nameEnglish: 'KUVVATHUL ISLAM MADRASA KOTEBAGILU',
    nameArabic: 'مدرسة قوة الإسلام',
  },
  examination: {
    name: "Annual Examination",
    academicSession: "2025-2026"
  },
  detailedColumns: {
    'Class 1': {
      serialNo: 0,        // Column A: Serial Number
      uid: 1,             // Column B: Student UID/ID
      name: 2,            // Column C: Student Name
      fatherName: 3,      // Column D: Father's Name

      // Subject columns (Column E onwards)
      // Adjust these based on your subjects
      subjects: {
        start: 4,         // First subject column (Column E)
        end: 9,           // Last subject column (Column J)
        names: undefined as readonly string[] | undefined,
      },

      marks: 10,          // Column K: Total Marks
      rank: 11,           // Column L: Rank
      attendance: 12,     // Column N: Attendance - if available
      status: 13,         // Column M: Status (Pass/Fail) - if available
    },
    'Class 2': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 9,           // Last subject column (Column J)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 10,           // Column K
      rank: 11,           // Column L
      attendance: 12,     // Column M
      status: 13,         // Column N
    },
    'Class 3': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 10,           // Last subject column (Column K)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 11,           // Column L
      rank: 12,           // Column M
      attendance: 13,     // Column N
      status: 14,         // Column O
    },
    'Class 4': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 10,           // Last subject column (Column K)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 11,           // Column L
      rank: 12,           // Column M
      attendance: 13,     // Column N
      status: 14,         // Column O
    },
    'Class 6': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 9,           // Last subject column (Column J)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 10,           // Column K
      rank: 11,           // Column L
      attendance: 12,     // Column M
      status: 13,         // Column N
    },
    'Class 8': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 7,           // Last subject column (Column H)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 8,           // Column I
      rank: 9,           // Column J
      attendance: 10,     // Column K
      status: 11,         // Column L
    },
    'Class 9': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 7,           // Last subject column (Column H)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 8,           // Column I
      rank: 9,           // Column J
      attendance: 10,     // Column K
      status: 11,         // Column L
    },
    'Class 11': {
      serialNo: 0,        // Column A
      uid: 1,             // Column B
      name: 2,            // Column C
      fatherName: 3,      // Column D

      // Example subjects for Class 2
      subjects: {
        start: 4,           // First subject column (Column E)
        end: 7,           // Last subject column (Column H)
        // Names omitted to fetch automatically from the sheet header row
        // names: [ ... ]
        names: undefined as readonly string[] | undefined,
      },

      marks: 8,           // Column I
      rank: 9,           // Column J
      attendance: 10,     // Column K
      status: 11,         // Column L
    },
  }
};
