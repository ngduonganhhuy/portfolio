import AnimatedText from "@/components/AnimatedText";
import Section from "@/components/Section";
import { SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER, SITE_URL } from "@/data/site";
import { getAllEbooks } from "@/lib/ebooks";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const PAGE_URL = `${SITE_URL}/ebooks`;
const PAGE_TITLE = `Ebooks | ${SITE_NAME}`;
const PAGE_DESCRIPTION = "Read curated software engineering ebooks directly on Holmes portfolio.";

const getBookStorageKey = (book) => `ebooks:${book.fileName}:page`;

const normalizePage = (value) => {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const BookIcon = ({ className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M5.5 4.5h8.25A2.75 2.75 0 0 1 16.5 7.25v12.25H7.25A2.25 2.25 0 0 1 5 17.25V6a1.5 1.5 0 0 1 1.5-1.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 7.25h1.25A1.75 1.75 0 0 1 19.5 9v10.5h-3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M8 8h5M8 11h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BookListItem = ({ book, isActive, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(book)}
    className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition ${
      isActive
        ? "border-primary bg-primary/10 text-dark dark:border-primaryDark dark:bg-primaryDark/10 dark:text-light"
        : "border-dark/15 bg-light text-dark hover:border-primary dark:border-light/15 dark:bg-dark dark:text-light dark:hover:border-primaryDark"
    }`}
  >
    <span
      className={`mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-md ${
        isActive ? "bg-primary text-light dark:bg-primaryDark dark:text-dark" : "bg-dark text-light dark:bg-light dark:text-dark"
      }`}
    >
      <BookIcon className="h-5 w-5" />
    </span>
    <span className="min-w-0">
      <span className="block text-sm font-bold leading-snug">{book.title}</span>
      <span className="mt-1 block text-xs text-dark/55 dark:text-light/55">PDF ebook</span>
    </span>
  </button>
);

const PdfViewer = ({ book, page, onPageChange }) => {
  const viewerSrc = useMemo(
    () => `${book.href}#page=${page}&toolbar=1&navpanes=0&view=FitH`,
    [book.href, page]
  );

  return (
    <section className="flex min-h-[72vh] flex-col overflow-hidden rounded-lg border border-dark bg-light shadow-[8px_8px_0px_0px_#333333] dark:border-light dark:bg-dark dark:shadow-[8px_8px_0px_0px_#F2E7D5]">
      <div className="flex items-center justify-between gap-3 border-b border-dark/15 px-4 py-3 dark:border-light/15 sm:flex-col sm:items-start">
        <div className="min-w-0 flex-[0.75] sm:w-full">
          <h2 className="truncate text-base font-bold text-dark dark:text-light">{book.title}</h2>
          <p className="truncate text-xs text-dark/60 dark:text-light/60">Saved at page {page}</p>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:w-full sm:justify-start">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="rounded-lg border border-dark/20 px-3 py-2 text-sm font-semibold text-dark transition hover:border-primary disabled:opacity-40 dark:border-light/20 dark:text-light dark:hover:border-primaryDark"
          >
            Prev
          </button>
          <label className="flex items-center gap-2 rounded-lg border border-dark/20 px-3 py-2 text-sm font-semibold text-dark dark:border-light/20 dark:text-light">
            Page
            <input
              type="number"
              min="1"
              value={page}
              onChange={(event) => onPageChange(event.target.value)}
              className="w-16 bg-transparent text-center outline-none"
              aria-label="Current PDF page"
            />
          </label>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            className="rounded-lg border border-dark/20 px-3 py-2 text-sm font-semibold text-dark transition hover:border-primary dark:border-light/20 dark:text-light dark:hover:border-primaryDark"
          >
            Next
          </button>
          <Link
            href={book.href}
            target="_blank"
            className="rounded-lg bg-dark px-4 py-2 text-sm font-semibold text-light transition hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primaryDark"
          >
            Open PDF
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-dark/5 p-3 dark:bg-light/5">
        <iframe
          key={viewerSrc}
          src={viewerSrc}
          title={book.title}
          className="h-[72vh] w-full rounded-md border border-dark/15 bg-light dark:border-light/15"
        />
      </div>
    </section>
  );
};

export default function Ebooks({ ebooks }) {
  const [selectedBook, setSelectedBook] = useState(ebooks[0] || null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!selectedBook) return;

    const storedPage = window.localStorage.getItem(getBookStorageKey(selectedBook));
    setCurrentPage(normalizePage(storedPage));
  }, [selectedBook]);

  const updateCurrentPage = (value) => {
    if (!selectedBook) return;

    const nextPage = normalizePage(value);
    setCurrentPage(nextPage);
    window.localStorage.setItem(getBookStorageKey(selectedBook), String(nextPage));
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_TWITTER} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Head>

      <Section className="!min-h-0">
        <AnimatedText text="Ebooks" className="mb-6 lg:!text-7xl sm:!text-6xl xs:!text-4xl" />
        <div className="grid grid-cols-12 gap-8 xl:gap-6 lg:grid-cols-1">
          <aside className="col-span-4 lg:col-span-1">
            <div className="sticky top-6 space-y-3 rounded-lg border border-dark bg-light p-4 shadow-[6px_6px_0px_0px_#333333] dark:border-light dark:bg-dark dark:shadow-[6px_6px_0px_0px_#F2E7D5] lg:static">
              <div>
                <h2 className="text-lg font-bold text-dark dark:text-light">Library</h2>
                <p className="text-sm text-dark/60 dark:text-light/60">{ebooks.length} PDF files</p>
              </div>
              <div className="max-h-[68vh] space-y-2 overflow-y-auto pr-1 lg:max-h-none">
                {ebooks.map((book) => (
                  <BookListItem
                    key={book.href}
                    book={book}
                    isActive={selectedBook?.href === book.href}
                    onSelect={setSelectedBook}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="col-span-8 lg:col-span-1">
            {selectedBook ? (
              <PdfViewer book={selectedBook} page={currentPage} onPageChange={updateCurrentPage} />
            ) : (
              <div className="rounded-lg border border-dark bg-light p-8 text-center font-semibold text-dark dark:border-light dark:bg-dark dark:text-light">
                No ebooks found in public/images/books.
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      ebooks: getAllEbooks(),
    },
  };
}
