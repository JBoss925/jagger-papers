import { useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { docsUrl, portfolioUrl } from "@jagger-ui/urls";

type PapersHeaderProps = {
  projectSlug?: string;
  query?: string;
  onQueryChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  theme: "dark" | "light";
  onThemeToggle: () => void;
};

export default function PapersHeader({
  projectSlug,
  query,
  onQueryChange,
  onSearchSubmit,
  theme,
  onThemeToggle,
}: PapersHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controlsId = useId();
  const location = useLocation();

  if (new URLSearchParams(location.search).get("embed") === "1") {
    return null;
  }

  const topTarget = window.self !== window.top ? "_top" : undefined;

  return (
    <header className={`papers-header${isExpanded ? " papers-header--expanded" : ""}`}>
      <Link className="papers-header__brand" to="/" aria-label="Jagger Papers home">
        <span className="papers-header__mark" aria-hidden="true" />
        <span>
          <strong>Jagger Papers</strong>
          <small>Technical notes & papers</small>
        </span>
      </Link>

      <button
        type="button"
        className="papers-header__menu"
        aria-expanded={isExpanded}
        aria-controls={controlsId}
        aria-label={isExpanded ? "Collapse papers controls" : "Expand papers controls"}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div className="papers-header__tools" id={controlsId}>
        <nav className="library-reader-nav" aria-label="Library navigation">
          <a href={portfolioUrl()} target={topTarget}>Home</a>
          <a href={portfolioUrl("/library")} target={topTarget}>Library</a>
          <a href={projectSlug ? docsUrl(`/${projectSlug}`) : docsUrl()} target={topTarget}>Docs</a>
        </nav>
        {onQueryChange ? (
          <form
            className="papers-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              onSearchSubmit?.(query ?? "");
            }}
          >
            <label htmlFor="papers-search-input">Search papers</label>
            <input
              id="papers-search-input"
              type="search"
              value={query ?? ""}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search by title, tag, or category"
            />
          </form>
        ) : null}
        <button
          type="button"
          className="papers-theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span aria-hidden="true" />
          {theme === "dark" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
