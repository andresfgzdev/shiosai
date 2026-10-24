import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SUBSET = "しすら出子小廃椀水海港潮発目網老膳菓車金騒鮑鮪鯛鰭鰻";
const KANA_OR_KANJI = /[぀-ヿ一-鿿]/g;

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.tsx?$/.test(name) && !name.endsWith(".test.ts") ? [path] : [];
  });
}

describe("Noto Serif JP subset", () => {
  it("covers every Japanese character the site renders", () => {
    const used = new Set(
      sources("src").flatMap((file) => readFileSync(file, "utf8").match(KANA_OR_KANJI) ?? []),
    );
    const missing = [...used].filter((char) => !SUBSET.includes(char));
    expect(missing).toEqual([]);
  });
});
