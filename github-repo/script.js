// Behaviour, added after the pages and the stylesheet.

document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.dataset.page;
  if (page === "basic") startBasic();
  if (page === "solve") startSolve();
  if (page === "paper") startPaper();
  if (page === "toppers") startToppers();
  if (document.getElementById("streams")) startStreams();
});

function startStreams() {
  var note = document.getElementById("stream-note");
  document.getElementById("streams").addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    if (!btn) return;
    document.querySelectorAll("#streams button").forEach(function (item) {
      item.classList.toggle("is-on", item === btn);
    });
    note.textContent = btn.dataset.stream + " saved for this visit. Open Class 10 for the working set.";
  });
}

function startBasic() {
  var level = 1;
  var step = 0;
  var picks = {};
  var finished = {};
  var nav = document.getElementById("level-nav");
  var stage = document.getElementById("basic-stage");

  [1, 2, 3].forEach(function (n) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lv" + n + (n === 1 ? " is-on" : "");
    btn.textContent = "Level " + n;
    btn.addEventListener("click", function () {
      level = n;
      step = 0;
      nav.querySelectorAll("button").forEach(function (item, index) {
        item.classList.toggle("is-on", index === n - 1);
      });
      draw();
    });
    nav.appendChild(btn);
  });

  function pack() {
    return BASIC.filter(function (item) { return item.level === level; });
  }

  function draw() {
    var list = pack();
    if (finished[level]) {
      drawLectures(list);
      return;
    }
    var item = list[step];
    var letters = ["A", "B", "C", "D"];
    stage.innerHTML = "";
    var card = document.createElement("div");
    card.className = "q-card";
    card.innerHTML = "<p>Level " + level + " · " + (step + 1) + " of " + list.length + "</p><p><strong>" + item.topic + "</strong></p><p>" + item.q + "</p>";
    item.options.forEach(function (option, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "opt" + (picks[item.q] === index ? " is-on" : "");
      button.textContent = letters[index] + ") " + option;
      button.addEventListener("click", function () {
        picks[item.q] = index;
        draw();
      });
      card.appendChild(button);
    });
    stage.appendChild(card);

    var row = document.createElement("div");
    row.className = "row-btns";
    var prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "Previous";
    prev.disabled = step === 0;
    prev.addEventListener("click", function () { step -= 1; draw(); });
    var next = document.createElement("button");
    next.type = "button";
    next.className = "solid";
    next.textContent = "Next";
    next.addEventListener("click", function () {
      if (step < list.length - 1) step += 1;
      else finished[level] = true;
      draw();
    });
    row.appendChild(prev);
    row.appendChild(next);
    stage.appendChild(row);
  }

  function drawLectures(list) {
    var weak = [];
    list.forEach(function (item) {
      if (picks[item.q] !== item.answer && !weak.some(function (saved) { return saved.video === item.video; })) weak.push(item);
    });
    stage.innerHTML = "";
    var note = document.createElement("p");
    note.textContent = weak.length ? "Lectures for this level only. A blank answer counts as not known." : "This level is clear.";
    stage.appendChild(note);
    weak.forEach(function (item) {
      var block = document.createElement("div");
      block.className = "video-note";
      block.innerHTML = "<strong>" + item.topic + "</strong>";
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube.com/embed/" + item.video + "?start=" + item.start + "&end=" + item.end + "&rel=0";
      frame.allowFullscreen = true;
      block.appendChild(frame);
      stage.appendChild(block);
    });
    var back = document.createElement("button");
    back.type = "button";
    back.textContent = "Back to questions";
    back.addEventListener("click", function () { finished[level] = false; draw(); });
    stage.appendChild(back);
  }

  draw();
}

function startSolve() {
  var index = 0;
  var open = {};
  var stage = document.getElementById("solve-stage");
  var meta = document.getElementById("solve-meta");

  function draw() {
    var item = SOLVE[index];
    meta.textContent = "Question " + (index + 1) + " of " + SOLVE.length;
    stage.innerHTML = "";
    var card = document.createElement("div");
    card.className = "q-card";
    card.innerHTML = "<p>" + item.q + "</p>";
    item.options.forEach(function (option, optionIndex) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "opt";
      button.textContent = "ABCD"[optionIndex] + ") " + option;
      card.appendChild(button);
    });
    var help = document.createElement("div");
    help.className = "help";
    ["Hint", "Step 1", "Step 2", "Step 3", "Final answer"].forEach(function (label, part) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", function () {
        open[index + "-" + part] = !open[index + "-" + part];
        draw();
      });
      help.appendChild(button);
    });
    card.appendChild(help);
    ["hint", "steps", "steps", "steps", "final"].forEach(function (key, part) {
      if (!open[index + "-" + part]) return;
      var body = document.createElement("div");
      body.className = "help-body";
      if (key === "steps") body.textContent = item.steps[part - 1];
      else body.textContent = item[key];
      card.appendChild(body);
    });
    stage.appendChild(card);
  }

  document.getElementById("solve-prev").addEventListener("click", function () {
    if (index > 0) index -= 1;
    draw();
  });
  document.getElementById("solve-next").addEventListener("click", function () {
    if (index < SOLVE.length - 1) index += 1;
    draw();
  });
  draw();
}

function startPaper() {
  var picks = {};
  var marks = {};
  var checked = false;
  var panel = "";
  var openN = 0;
  var list = document.getElementById("paper-list");
  var startBtn = document.getElementById("start-paper");
  var note = document.getElementById("timer-note");
  var key = "neev-paper-start";
  var started = sessionStorage.getItem(key);

  function leftLabel(ms) {
    var h = Math.floor(ms / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    return pad(h) + ":" + pad(m) + ":" + pad(s);
  }

  function tick() {
    if (!started) return;
    var left = Math.max(0, Number(started) + 3 * 60 * 60 * 1000 - Date.now());
    document.getElementById("timer").textContent = leftLabel(left);
    note.textContent = left === 0 ? "Time is up." : "Exam started. 3 hours, counting down.";
    startBtn.hidden = true;
  }

  if (started) tick();
  setInterval(tick, 1000);
  startBtn.addEventListener("click", function () {
    started = String(Date.now());
    sessionStorage.setItem(key, started);
    tick();
  });

  document.getElementById("check-paper").addEventListener("click", function () {
    checked = true;
    draw();
  });

  function draw() {
    var done = 0;
    list.innerHTML = "";
    PAPER.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "paper-card";
      card.innerHTML = "<p><strong>Q" + item.n + ".</strong> " + item.q + "</p>";
      if (item.kind === "mcq") {
        item.options.forEach(function (option, index) {
          var button = document.createElement("button");
          button.type = "button";
          button.className = "opt" + (picks[item.n] === index ? " is-on" : "");
          button.textContent = "ABCD"[index] + ") " + option;
          button.addEventListener("click", function () {
            picks[item.n] = index;
            draw();
          });
          card.appendChild(button);
        });
        if (picks[item.n] !== undefined) done += 1;
      } else {
        var self = document.createElement("button");
        self.type = "button";
        self.className = "opt";
        self.textContent = "I'll find it myself";
        var doneBtn = document.createElement("button");
        doneBtn.type = "button";
        doneBtn.className = "opt" + (marks[item.n] ? " is-on" : "");
        doneBtn.textContent = marks[item.n] ? "Done" : "Mark as done";
        doneBtn.addEventListener("click", function () {
          marks[item.n] = !marks[item.n];
          draw();
        });
        card.appendChild(self);
        card.appendChild(doneBtn);
        if (marks[item.n]) done += 1;
      }
      list.appendChild(card);
    });
    document.getElementById("done-count").textContent = done + " / " + PAPER.length;

    if (checked) {
      var result = document.createElement("div");
      result.className = "paper-card";
      var right = 0;
      var wrong = 0;
      var nums = document.createElement("div");
      nums.className = "nums";
      PAPER.forEach(function (item) {
        var chip = document.createElement("span");
        chip.textContent = item.n;
        if (item.kind === "long") chip.className = "";
        else if (picks[item.n] === undefined) { chip.className = "skip"; }
        else if (picks[item.n] === item.answer) { chip.className = "ok"; right += 1; }
        else { chip.className = "bad"; wrong += 1; }
        nums.appendChild(chip);
      });
      result.innerHTML = "<p>" + right + " right, " + wrong + " wrong</p>";
      result.appendChild(nums);
      list.appendChild(result);
    }

    var tools = document.createElement("div");
    tools.className = "tool";
    tools.innerHTML = "<button type='button' id='show-video'>Video solution</button><button type='button' id='show-topper'>Topper's answer</button>";
    list.appendChild(tools);
    document.getElementById("show-video").addEventListener("click", function () {
      panel = panel === "video" ? "" : "video";
      openN = 0;
      draw();
    });
    document.getElementById("show-topper").addEventListener("click", function () {
      panel = panel === "topper" ? "" : "topper";
      openN = 0;
      draw();
    });
    if (!panel) return;

    var box = document.createElement("div");
    box.className = "nums";
    var source = panel === "video" ? PAPER : PAPER.filter(function (item) { return item.kind === "long"; });
    source.forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = item.n;
      button.addEventListener("click", function () {
        openN = openN === item.n ? 0 : item.n;
        draw();
      });
      box.appendChild(button);
    });
    list.appendChild(box);
    if (!openN) return;
    var chosen = PAPER.filter(function (item) { return item.n === openN; })[0];
    var view = document.createElement("div");
    view.className = "topper-card";
    if (panel === "video") {
      view.innerHTML = "<h2>Video solution · Q" + chosen.n + "</h2>";
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube.com/embed/" + chosen.video + "?rel=0";
      frame.allowFullscreen = true;
      view.appendChild(frame);
    } else {
      view.innerHTML = "<h2>This is the topper's answer · Q" + chosen.n + "</h2><p>" + chosen.topper + "</p>";
    }
    list.appendChild(view);
  }

  draw();
}

function startToppers() {
  var root = document.getElementById("topper-list");
  PAPER.filter(function (item) { return item.kind === "long"; }).forEach(function (item) {
    var card = document.createElement("article");
    card.className = "topper-card";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "opt";
    btn.textContent = "Question " + item.n;
    var body = document.createElement("div");
    body.hidden = true;
    body.innerHTML = "<h2>This is the topper's answer</h2><p>" + item.topper + "</p>";
    btn.addEventListener("click", function () { body.hidden = !body.hidden; });
    card.appendChild(btn);
    card.appendChild(body);
    root.appendChild(card);
  });
}
