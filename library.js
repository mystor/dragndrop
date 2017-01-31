let droparea = document.querySelector("#droparea");

// Make the drop area show pretty hover highlights
droparea.addEventListener('dragenter', evt => {
  droparea.classList.add('hover');
  evt.preventDefault();
});
droparea.addEventListener('dragover', evt => {
  evt.preventDefault();
});
droparea.addEventListener('dragleave', evt => {
  droparea.classList.remove('hover');
  evt.preventDefault();
});

let recentResult = new Data(null);

// Capture the data and transform the dataTransfer into a result object
droparea.addEventListener('drop', e => {
  droparea.classList.remove('hover');
  recentResult.set(dataTransferToResult(e.dataTransfer, "drop"));
  e.preventDefault();
});

document.addEventListener('paste', e => {
  recentResult.set(dataTransferToResult(e.clipboardData, "paste"));
});


let e10s = new Data(true);
let os = new Data("windows");
if (/Linux/.test(navigator.userAgent)) {
  os.set("linux");
} else if (/Macintosh/.test(navigator.userAgent)) {
  os.set("mac");
}

let currentTest = new Data(null);

react(document.querySelector("#testlist"), () => {
  return tests.map(test => {
    let attrs = {
      onclick: () => currentTest.set(test),
      href: "#",
    };
    let ct = currentTest.get();
    if (ct && ct.name == test.name) {
      attrs.style = "color: red; font-weight: bold; text-decoration: none;";
    }
    return N("li", N("a", attrs, test.name));
  });
});

react(document.querySelector("#description"), () =>
      currentTest.get() ? currentTest.get().description : "NO TEST SELECTED");

const merge = (a, b) => {
  console.log(b);
  Object.keys(b).forEach(k => {
    // We want to concat the bugs lists together
    if (k == "bugs") {
      a[k] = a[k].concat(b[k]);
      return;
    }
    a[k] = b[k];
  });
};

const getResult = (test, os, multi) => {
  console.log("test = " + test);
  let result = { bugs: [] };
  merge(result, test);

  if (os in test) {
    merge(result, getResult(test[os], os, multi));
  }
  let multiStr = multi ? 'multi' : 'single';
  if (multiStr in test) {
    merge(result, getResult(test[multiStr], os, multi));
  }
  console.log("result = ", result);
  return result;
};


const dataTransferToResult = (dt, kind) => {
  let types = [];
  for (let i = 0; i < dt.types.length; ++i) {
    types.push(dt.types[i]);
  }

  let items = [];
  if (dt.items) {
    for (let i = 0; i < dt.items.length; ++i) {
      ((i) => {
        let item = {
          kind: dt.items[i].kind,
          type: dt.items[i].type,
          data: new Data(null),
        };
        if (item.kind == "file") {
          item.data.set(dt.items[i].getAsFile());
          try {
            let entry = dt.items[i].webkitGetAsEntry();
            console.log("entry = ", entry);
            if (entry.isDirectory) {
              entry.createReader().readEntries(entries => {
                let files = [];
                entries.forEach(entry => {
                  console.log("entry = ", entry);
                  if (entry.isFile) {
                    entry.file(file => {
                      files = files.concat([file]);
                      item.data.set(files);
                    });
                  }
                });
                item.data.set(files);
              });
            }
          } catch (e) { console.error(e); }
        } else {
          dt.items[i].getAsString(s => item.data.set(s));
        }
        items.push(item);
      })(i);
    }
  }

  return {
    types: types,
    files: dt.files.length,
    items: items,
    kind: kind,
  };
};

const displayResult = result => {
  if (!result) {
    return "No results...";
  }
  result = getResult(result, os.get(), e10s.get());

  return "kind: " + result.kind + "\n\n" +
    "types:\n" + result.types.map((item, i) => "  [" + i + "] " + item).join('\n') + "\n\n" +
    "file count: " + result.files + "\n\n" +
    "items:\n" +
    (result.items || []).map((item, i) => "  [" + i + "] " + item.kind + " - " + item.type).join('\n');
};

react(document.querySelector("#matching"), () => {
  // Check if we are expecting a match or not.
  let expectMatch = true;
  let reason = [];
  if (currentTest.get()) {
    let current = getResult(currentTest.get(), os.get(), e10s.get());
    if ("expectMatch" in current) {
      expectMatch = current.expectMatch;
    }
    if (current.bugs) {
      reason = current.bugs.map(bugzillaLink);
    }
  }
  let match = displayResult(currentTest.get()) == displayResult(recentResult.get());
  if (match && expectMatch) {
    return N("div", {style: "color: green;"}, "MATCHING");
  } else if (!match && expectMatch) {
    return N("div", {style: "color: red;"}, "NOT MATCHING");
  } else if (match && !expectMatch) {
    return N("div", {style: "color: red;"}, "MATCHING");
  } else if (!match && !expectMatch) {
    return N("div", {style: "color: orange;"},
             ["NOT MATCHING ("].concat(reason).concat([")"]));
  }
});

// Display a textual representation of the different results
react(document.querySelector("#expected"), () => displayResult(currentTest.get()));
react(document.querySelector("#got"), () => displayResult(recentResult.get()));

// Display the data which was found in each of the DataTransferItems
react(document.querySelector("#data"), () => {
  let rr = recentResult.get();
  if (!rr) {
    return "pending..";
  }
  return (recentResult.get().items || []).map((item, i) => {
    let data = item.data.get();

    let result = ["items[" + i + "] = "];
    if (!data) {
      result.push("null");
    } else if (typeof data == "string") {
      result.push(N("pre", data));
    } else if (Array.isArray(data)) {
      data.forEach(data => {
        result.push(N("img", {src: URL.createObjectURL(data)}, []));
      });
    } else {
      result.push(N("img", {src: URL.createObjectURL(data)}, []));
    }
    return N("li", result);
  });
});

const bugzillaLink = number => {
  return N("a", { href: "https://bugzil.la/" + number }, "" + number);
};

react(document.querySelector("#bugs"), () => {
  let combos = [
    ["linux", true],
    ["linux", false],
    ["windows", true],
    ["windows", false],
    ["mac", true],
    ["mac", false],
  ];

  let ct = currentTest.get();
  return N("tr", combos.map(combo => {
    let result = { bugs: [] };
    if (ct) {
      result = getResult(ct, combo[0], combo[1]);
    }
    let attrs = {};
    if (combo[0] == os.get() && combo[1] == e10s.get()) {
      attrs['class'] = "active";
    }
    return N("td", attrs, [
      N("button", {
        onclick: () => {
          os.set(combo[0]);
          e10s.set(combo[1]);
        }
      }, combo[0] + " - " + (combo[1] ? "e10s" : "non-e10s")),
      N("p", ["Bugs"].concat(result.bugs.map(bugzillaLink).map(x => N("p", x)))),
      // N("div", result.bugs.map(bugzillaLink)),
    ]);
  }));
});
