const MIME = "text/plain";

let failed = false;
const ok = (c, r) => {
  let text = c ? "TEST PASSED - " : "TEST FAILED - ";
  text += r;
  let tn = document.createTextNode(text);
  let dv = document.createElement("div");
  dv.appendChild(tn);
  document.querySelector('.results').appendChild(dv);
  if (!c) {
    failed = true;
  }

  if (failed) {
    document.body.style.backgroundColor = "#fcc";
  }
};
const eq = (a, b, r) => {
  if (a == b) {
    ok(true, a + " = " + b + " - " + r);
  } else {
    ok(false, a + " != " + b + " - " + r);
  }
};

const STATUS_PROTECTED = "protected";
const STATUS_READONLY = "readonly";
const STATUS_READWRITE = "readwrite";
const STATUS_DISCONNECTED = "disconnected";
const status = (dt) => {
  // Check if we can write to it.
  try {
    dt.setData("text/html", "_test");

    if (dt.getData("text/html") == "_test") {
      dt.clearData("text/html");
      ok(!dt.getData("text/html"), "ClearData should work...");
      return STATUS_READWRITE;
    }
  } catch(e) {}

  // If we can read the data then we're readonly
  if (dt.getData(MIME)) {
    return STATUS_READONLY;
  }

  // If we can see that items exist (and read types) then we're protected
  if (dt.items.length > 0) {
    return STATUS_PROTECTED;
  }

  // Otherwise we've been disconnected.
  return STATUS_DISCONNECTED;
};

const done = () => {
    ok(!failed, "Test Complete");
    if (!failed) {
        document.body.style.backgroundColor = "#cfc";
    }
};
