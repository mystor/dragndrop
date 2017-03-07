// NOTE: This is the expected test result format. Every test entry will contain
// a `types`, `files`, and `items` entry, which will contain fields as shown
// below. A test entry can also contain a `bugs` entry which is a list of bug
// numbers which currently impact whether or not we meet the expected test
// results.
//
// You can specify that certain results or bugs are specific to specific
// platforms or e10s/non-e10s configurations by using sub-objects. the
// `windows`, `mac` and `linux` items are used as overrides for those platforms,
// and the `multi` and `single` items are used as overrides for e10s/non-e10s
// states.

let tests = [
  {
    name: "drop-txt-file",
    kind: "drop",
    description: "Drag and drop a text file from the desktop to the drop area.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "text/plain" }
    ],
  },

  {
    name: "drop-pdf-file",
    kind: "drop",
    description: "Drag and drop a pdf file from the desktop to the drop area.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "application/pdf" }
    ],
  },

  {
    name: "drop-png-file",
    kind: "drop",
    description: "Drag and drop an PNG image file from the desktop to the drop area.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "image/png" }
    ],
  },

  {
    name: "drop-jpeg-file",
    kind: "drop",
    description: "Drag and drop a JPEG image file from the desktop to the drop area.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "image/jpeg" }
    ],
  },

  {
    name: "drop-image-data",
    kind: "drop",
    description: "Drag and drop an PNG <img> tag from another tab to the drop area.",
    files: 0,

    multi: {
      mac: { bugs: [1328984], expectMatch: false },
      linux: { bugs: [1328984], expectMatch: false }
    },

    types: [
      "text/x-moz-url",
      "text/x-moz-url-data",
      "text/x-moz-url-desc",
      "text/uri-list",
      "text/_moz_htmlcontext",
      "text/_moz_htmlinfo",
      "text/html",
      "text/plain",
      "application/x-moz-file-promise-url",
      "application/x-moz-file-promise-dest-filename"
    ],
    items: [
      { kind: "string", type: "text/x-moz-url" },
      { kind: "string", type: "text/x-moz-url-data" },
      { kind: "string", type: "text/x-moz-url-desc" },
      { kind: "string", type: "text/uri-list" },
      { kind: "string", type: "text/_moz_htmlcontext" },
      { kind: "string", type: "text/_moz_htmlinfo" },
      { kind: "string", type: "text/html" },
      { kind: "string", type: "text/plain" },
      { kind: "other", type: "application/x-moz-nativeimage" },
      { kind: "other", type: "application/x-moz-file-promise" },
      { kind: "string", type: "application/x-moz-file-promise-url" },
      { kind: "string", type: "application/x-moz-file-promise-dest-filename" },
    ],
  },

  {
    name: "drop-html-data",
    kind: "drop",
    description: "Drag and drop some html text from another webpage onto this page.",
    types: [
      "text/_moz_htmlcontext",
      "text/_moz_htmlinfo",
      "text/html",
      "text/plain",
    ],
    files: 0,
    items: [
      { kind: "string", type: "text/_moz_htmlcontext" },
      { kind: "string", type: "text/_moz_htmlinfo" },
      { kind: "string", type: "text/html" },
      { kind: "string", type: "text/plain" },
    ]
  },

  {
    name: "paste-txt-file",
    kind: "paste",
    description: "Copy and paste a text file from the desktop onto this page.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    windows: { multi: { bugs: [1308007], expectMatch: false } },
    mac: { bugs: [1288773], expectMatch: false },
    linux: { bugs: [1288773], expectMatch: false },
    items: [
      { kind: "file", type: "text/plain" }
    ],
  },

  {
    name: "paste-pdf-file",
    kind: "paste",
    description: "Copy and paste a pdf file from the desktop onto this page.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    windows: { multi: { bugs: [1308007], expectMatch: false } },
    mac: { bugs: [1288773], expectMatch: false },
    linux: { bugs: [1288773], expectMatch: false },
    items: [
      { kind: "file", type: "application/pdf" }
    ],
  },

  {
    name: "paste-png-file",
    kind: "paste",
    description: "Copy and paste a PNG image file from the desktop onto this page.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    windows: { multi: { bugs: [1308007], expectMatch: false } },
    mac: { bugs: [1288773], expectMatch: false },
    linux: { bugs: [1288773], expectMatch: false },
    items: [
      { kind: "file", type: "image/png" }
    ],
  },

  {
    name: "paste-jpeg-file",
    kind: "paste",
    description: "Copy and paste a JPEG image file from the desktop onto this page.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    windows: { multi: { bugs: [1308007], expectMatch: false } },
    mac: { bugs: [1288773], expectMatch: false },
    linux: { bugs: [1288773], expectMatch: false },
    items: [
      { kind: "file", type: "image/jpeg" }
    ],
  },

  {
    name: "paste-image-data",
    kind: "paste",
    description: "Copy and paste an image (right click -> Copy Image) from another tab into this page.",
    types: [
      "text/html",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "string", type: "text/html" },
      { kind: "file", type: "image/png" }
    ],
  },

  {
    name: "paste-html-data",
    kind: "paste",
    description: "Copy and paste html from another tab onto this page.",
    types: [
      "text/html",
      "text/plain",
    ],
    files: 0,
    items: [
      { kind: "string", type: "text/html" },
      { kind: "string", type: "text/plain" },
    ]
  }
];
