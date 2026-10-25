# Padhaai Neev

Class 10 board workspace. The base comes first, then question solving, then a sample paper.

## Features

- Class 10 and a Class 12 stream picker
- Basic Neev: three levels, one question at a time, blank means not known
- Question solving with hint and steps kept closed until opened
- Sample paper 2026–27 with a 3 hour timer, end check, video solution, and topper answers

## Run

No install step. From this folder:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

You can also open `index.html` in a browser. YouTube clips are more reliable through the local server.

## Files

`index.html` was the first page. `style.css` is the look. `script.js` is the behaviour. `data.js` holds the questions.
