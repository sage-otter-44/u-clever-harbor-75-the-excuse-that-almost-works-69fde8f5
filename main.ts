import { mkdirSync, writeFileSync } from "node:fs";

// The excuse: a boring, specific, almost-believable detail (dead router,
// engineer not till Thursday) whose own logic is the joke — "offline all
// day" is exactly what a gamer wants on GTA 6 launch week, and the
// manager hears a connectivity problem. Reads like a hurried text.
const ENTRY =
  "My router died at midnight and the engineer can't come till Thursday, so I'm offline all day, sorry.";

// Gate self-check (competition.yaml): /output/entry.txt must be UTF-8
// text of 1 to 140 characters, one line, at most 20 words. Fail loudly
// instead of writing an entry the sealed scorer would refuse.
const words = ENTRY.trim().split(/\s+/);
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, gate needs 1-140`);
}
if (words.length > 20) {
  throw new Error(`entry is ${words.length} words, gate needs at most 20`);
}
if (ENTRY.trim() !== ENTRY || ENTRY.includes("\n")) {
  throw new Error("entry must be a single unpadded line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars, ${words.length} words`);
console.log(ENTRY);
