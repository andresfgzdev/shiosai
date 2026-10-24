import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const file = process.argv[2];
const message = readFileSync(file, "utf8");
const forbiddenTrailer =
  /^(co-authored-by:.*(claude|anthropic|noreply@anthropic\.com)|claude-session:.*)$/im;
const author = execFileSync("git", ["var", "GIT_AUTHOR_IDENT"], { encoding: "utf8" });

if (forbiddenTrailer.test(message) || /claude\.ai\/code\/session_/i.test(message)) {
  console.error("Commit rejected: remove the Claude/Anthropic co-author or session trailer.");
  process.exit(1);
}

if (/anthropic\.com|^claude\s*</i.test(author)) {
  console.error("Commit rejected: the author must be a person, not Claude.");
  process.exit(1);
}
