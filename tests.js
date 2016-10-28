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
    name: "drop-file",
    kind: "drop",
    description: "Drag and drop a non-image file from the desktop to the drop area.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "application/x-moz-file" }
    ],
  },
  {
    name: "drop-image-file",
    kind: "drop",
    description: "Drag and drop an PNG image file from the desktop to the drop area.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "application/x-moz-file" }
    ],
  },
  {
    name: "drop-image-data",
    kind: "drop",
    description: "Drag and drop an PNG image from another tab to the drop area.",
    types: [
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "image/png" }
    ],
  },
  {
    name: "paste-file",
    kind: "paste",
    description: "Copy and paste a non-image file from the desktop into this page.",
    types: [
      "Files",
    ],
    files: 1,
    windows: { multi: { bugs: [1308007] } },
    mac: { bugs: [1288773] },
    linux: { bugs: [1288773] },
    items: [
      { kind: "file", type: "application/x-moz-file" }
    ],
  },
  {
    name: "paste-image-file",
    kind: "paste",
    description: "Copy and paste an PNG image file from the desktop into this page.",
    types: [
      "application/x-moz-file",
      "Files",
    ],
    files: 1,
    windows: { multi: { bugs: [1308007] } },
    mac: { bugs: [1288773] },
    linux: { bugs: [1288773] },
    items: [
      { kind: "file", type: "application/x-moz-file" }
    ],
  },
  {
    name: "paste-image-data",
    kind: "paste",
    description: "Copy and paste an PNG image file from another tab into this page.",
    types: [
      "Files",
    ],
    files: 1,
    items: [
      { kind: "file", type: "image/png" }
    ],
  },
];
