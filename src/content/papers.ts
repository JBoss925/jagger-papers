import { sourceDocuments } from "@jagger-ui/content/sourceDocuments";
import { makeEssay } from "./editorial";

export { sourceDocuments };
export const papers = sourceDocuments.map(makeEssay);

export function getPaperBySlug(slug: string | undefined) {
  return papers.find((paper) => paper.slug === slug);
}
