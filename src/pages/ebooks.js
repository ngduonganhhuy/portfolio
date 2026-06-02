import AnimatedText from "@/components/AnimatedText";
import Section from "@/components/Section";
import { SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER, SITE_URL } from "@/data/site";
import { getAllEbooks } from "@/lib/ebooks";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_URL = `${SITE_URL}/ebooks`;
const PAGE_TITLE = `Ebooks | ${SITE_NAME}`;
const PAGE_DESCRIPTION = "Read curated software engineering ebooks directly on Holmes portfolio.";

const getBookStorageKey = (book) => `ebooks:${book.fileName}:page`;
const PDFJS_VERSION = "3.11.174";
const PDFJS_SCRIPT_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
const PDFJS_WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

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

let pdfJsLoader;

const loadPdfJs = () => {
  if (typeof window === "undefined") return Promise.reject(new Error("PDF.js can only load in the browser."));
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);

  if (!pdfJsLoader) {
    pdfJsLoader = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${PDFJS_SCRIPT_SRC}"]`);

      const handleLoad = () => {
        if (!window.pdfjsLib) {
          reject(new Error("PDF.js loaded without exposing pdfjsLib."));
          return;
        }

        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
        resolve(window.pdfjsLib);
      };

      if (existingScript) {
        existingScript.addEventListener("load", handleLoad, { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Failed to load PDF.js.")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = PDFJS_SCRIPT_SRC;
      script.async = true;
      script.onload = handleLoad;
      script.onerror = () => reject(new Error("Failed to load PDF.js."));
      document.head.appendChild(script);
    });
  }

  return pdfJsLoader;
};

const PdfDocumentScroller = ({ book, page, onPageCountChange }) => {
  const containerRef = useRef(null);
  const pageRefs = useRef([]);
  const canvasRefs = useRef([]);
  const renderTasksRef = useRef(new Map());
  const renderedPagesRef = useRef(new Set());
  const renderedWidthRef = useRef(0);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [pageSizes, setPageSizes] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    let loadingTask;
    const renderTasks = renderTasksRef.current;
    const renderedPages = renderedPagesRef.current;

    setIsLoading(true);
    setLoadError("");
    setPdfDocument(null);
    setPageSizes([]);
    renderedPages.clear();
    renderedWidthRef.current = 0;
    renderTasks.forEach((task) => task.cancel());
    renderTasks.clear();
    onPageCountChange(null);

    loadPdfJs()
      .then((pdfjsLib) => {
        loadingTask = pdfjsLib.getDocument(book.href);
        return loadingTask.promise;
      })
      .then((documentProxy) => {
        if (!isMounted) return;
        setPdfDocument(documentProxy);
        onPageCountChange(documentProxy.numPages);

        return Promise.all(
          Array.from({ length: documentProxy.numPages }, (_, index) =>
            documentProxy.getPage(index + 1).then((pdfPage) => {
              const viewport = pdfPage.getViewport({ scale: 1 });
              return {
                height: viewport.height,
                page: index + 1,
                width: viewport.width,
              };
            })
          )
        );
      })
      .then((sizes) => {
        if (!isMounted || !sizes) return;
        setPageSizes(sizes);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        setLoadError(error.message || "Failed to load this PDF.");
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
      if (loadingTask) loadingTask.destroy();
      renderTasks.forEach((task) => task.cancel());
      renderTasks.clear();
      renderedPages.clear();
    };
  }, [book.href, onPageCountChange]);

  const renderPage = useCallback(
    (pageNumber) => {
      if (!pdfDocument || !containerWidth || renderedPagesRef.current.has(pageNumber)) return;

      const canvas = canvasRefs.current[pageNumber - 1];
      if (!canvas) return;

      renderedPagesRef.current.add(pageNumber);

      pdfDocument
        .getPage(pageNumber)
        .then((pdfPage) => {
          const context = canvas.getContext("2d");
          const baseViewport = pdfPage.getViewport({ scale: 1 });
          const pixelRatio = window.devicePixelRatio || 1;
          const scale = Math.max((containerWidth - 2) / baseViewport.width, 0.25);
          const viewport = pdfPage.getViewport({ scale });

          canvas.width = Math.floor(viewport.width * pixelRatio);
          canvas.height = Math.floor(viewport.height * pixelRatio);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          context.clearRect(0, 0, viewport.width, viewport.height);

          const renderTask = pdfPage.render({ canvasContext: context, viewport });
          renderTasksRef.current.set(pageNumber, renderTask);
          return renderTask.promise;
        })
        .then(() => {
          renderTasksRef.current.delete(pageNumber);
        })
        .catch((error) => {
          renderTasksRef.current.delete(pageNumber);
          if (error?.name === "RenderingCancelledException") return;
          renderedPagesRef.current.delete(pageNumber);
          setLoadError(error.message || "Failed to render this page.");
        });
    },
    [containerWidth, pdfDocument]
  );

  useEffect(() => {
    if (!pdfDocument || !containerWidth || renderedWidthRef.current === containerWidth) return;

    renderedWidthRef.current = containerWidth;
    renderedPagesRef.current.clear();
    renderTasksRef.current.forEach((task) => task.cancel());
    renderTasksRef.current.clear();
  }, [containerWidth, pdfDocument]);

  useEffect(() => {
    if (!pdfDocument || !containerWidth || !pageSizes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const pageNumber = Number(entry.target.getAttribute("data-page"));
          if (pageNumber) renderPage(pageNumber);
        });
      },
      {
        root: containerRef.current,
        rootMargin: "600px 0px",
        threshold: 0.01,
      }
    );

    pageRefs.current.forEach((pageElement) => {
      if (pageElement) observer.observe(pageElement);
    });

    renderPage(page);

    return () => observer.disconnect();
  }, [containerWidth, page, pageSizes.length, pdfDocument, renderPage]);

  useEffect(() => {
    if (!pageSizes.length) return;

    pageRefs.current[page - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page, pageSizes.length]);

  return (
    <div ref={containerRef} className="relative h-[72vh] overflow-y-auto rounded-md border border-dark/15 bg-neutral-200 p-2 dark:border-light/15 dark:bg-neutral-900">
      {isLoading && (
        <div className="absolute left-3 top-3 z-10 rounded-md bg-dark px-3 py-2 text-xs font-semibold text-light shadow dark:bg-light dark:text-dark">
          Loading PDF...
        </div>
      )}
      {loadError ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-sm font-semibold text-dark dark:text-light">
          <p>{loadError}</p>
          <Link
            href={book.href}
            target="_blank"
            className="rounded-lg bg-dark px-4 py-2 text-sm font-semibold text-light transition hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primaryDark"
          >
            Open PDF
          </Link>
        </div>
      ) : (
        <div className="mx-auto flex w-full flex-col gap-3">
          {pageSizes.map((pageSize, index) => {
            const scale = containerWidth ? Math.max((containerWidth - 2) / pageSize.width, 0.25) : 1;
            const pageWidth = Math.floor(pageSize.width * scale);
            const pageHeight = Math.floor(pageSize.height * scale);

            return (
              <div
                key={`${book.href}:${pageSize.page}`}
                ref={(element) => {
                  pageRefs.current[index] = element;
                }}
                data-page={pageSize.page}
                className="mx-auto bg-white shadow-sm"
                style={{
                  height: pageHeight,
                  width: pageWidth,
                }}
              >
                <canvas
                  ref={(element) => {
                    canvasRefs.current[index] = element;
                  }}
                  className="block h-full w-full"
                  aria-label={`Page ${pageSize.page}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PdfViewer = ({ book, page, onPageChange }) => {
  const [pageCount, setPageCount] = useState(null);

  const handlePageCountChange = useCallback(
    (nextPageCount) => {
      setPageCount(nextPageCount);
      if (nextPageCount && page > nextPageCount) onPageChange(nextPageCount);
    },
    [onPageChange, page]
  );

  const goToPage = (value) => {
    const nextPage = normalizePage(value);
    onPageChange(pageCount ? Math.min(nextPage, pageCount) : nextPage);
  };

  return (
    <section className="flex min-h-[72vh] flex-col overflow-hidden rounded-lg border border-dark bg-light shadow-[8px_8px_0px_0px_#333333] dark:border-light dark:bg-dark dark:shadow-[8px_8px_0px_0px_#F2E7D5]">
      <div className="flex items-center justify-between gap-3 border-b border-dark/15 px-4 py-3 dark:border-light/15 sm:flex-col sm:items-start">
        <div className="min-w-0 flex-[0.75] sm:w-full">
          <h2 className="truncate text-base font-bold text-dark dark:text-light">{book.title}</h2>
          <p className="truncate text-xs text-dark/60 dark:text-light/60">
            Page {page}
            {pageCount ? ` of ${pageCount}` : ""}
          </p>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:w-full sm:justify-start">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
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
              max={pageCount || undefined}
              value={page}
              onChange={(event) => goToPage(event.target.value)}
              className="w-16 bg-transparent text-center outline-none"
              aria-label="Current PDF page"
            />
          </label>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={Boolean(pageCount && page >= pageCount)}
            className="rounded-lg border border-dark/20 px-3 py-2 text-sm font-semibold text-dark transition hover:border-primary disabled:opacity-40 dark:border-light/20 dark:text-light dark:hover:border-primaryDark"
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
        <PdfDocumentScroller book={book} page={page} onPageCountChange={handlePageCountChange} />
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

  const updateCurrentPage = useCallback((value) => {
    if (!selectedBook) return;

    const nextPage = normalizePage(value);
    setCurrentPage(nextPage);
    window.localStorage.setItem(getBookStorageKey(selectedBook), String(nextPage));
  }, [selectedBook]);

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
