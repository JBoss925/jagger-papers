import { describe, expect, it } from "vitest";
import { getPaperBySlug, papers } from "./papers";
import { docHref } from "./editorial";

describe("jagger-papers catalog", () => {
  it("builds all 8 project essays with sections", () => {
    expect(papers.length).toBe(8);
    for (const paper of papers) {
      expect(getPaperBySlug(paper.slug)).toBe(paper);
      expect(paper.sections.length).toBeGreaterThan(0);
    }
  });

  it("links every documentation reference to docs.jaggerbrulato.com", () => {
    expect(docHref("ojaml", "thesis")).toBe(
      "https://docs.jaggerbrulato.com/ojaml/explanation/thesis",
    );
    expect(docHref("ojaml", "runtime-layout")).toBe(
      "https://docs.jaggerbrulato.com/ojaml/reference/runtime-layout",
    );
    for (const paper of papers) {
      for (const section of paper.sections) {
        for (const block of section.blocks) {
          if (block.kind === "doc-link") {
            expect(block.href.startsWith("https://docs.jaggerbrulato.com/")).toBe(
              true,
            );
          }
        }
      }
    }
  });

  it("keeps detailed grammars and catalogs out of the narrative", () => {
    for (const paper of papers) {
      expect(
        paper.sections
          .flatMap((s) => s.blocks)
          .some((b) => b.kind === "bullets"),
      ).toBe(false);
      expect(
        paper.sections
          .flatMap((s) => s.blocks)
          .some((b) => b.kind === "equation" && /grammar/i.test(b.label)),
      ).toBe(false);
      expect(
        paper.sections.flatMap((s) => s.blocks).some((b) => b.kind === "flow"),
      ).toBe(true);
    }
  });
});
