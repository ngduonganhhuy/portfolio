import { cvData as defaultCVData } from "@/data/cv";
import { useState } from "react";

// ─── localStorage helpers ────────────────────────────────────────────────────

const CV_LS_KEY = "cv_builder_data";

export function loadCVData() {
  if (typeof window === "undefined") return defaultCVData;
  try {
    const raw = localStorage.getItem(CV_LS_KEY);
    return raw ? JSON.parse(raw) : defaultCVData;
  } catch {
    return defaultCVData;
  }
}

function saveCVData(data) {
  try {
    localStorage.setItem(CV_LS_KEY, JSON.stringify(data));
  } catch {}
}

// ─── DOCX builder ────────────────────────────────────────────────────────────

const ACCENT_HEX = "1F4E79";
const GRAY_HEX = "595959";

async function buildDocx(data) {
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    BorderStyle,
    LevelFormat,
    ExternalHyperlink,
    TabStopType,
    PositionalTab,
    PositionalTabAlignment,
    PositionalTabLeader,
  } = await import("docx");

  const bullet = { reference: "bul", level: 0 };

  function h2(text) {
    return new Paragraph({
      spacing: { before: 260, after: 100 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_HEX },
      },
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 24,
          color: ACCENT_HEX,
          font: "Calibri",
        }),
      ],
    });
  }

  function jobHeader(company, role, dates) {
    return new Paragraph({
      spacing: { before: 160, after: 40 },
      tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
      children: [
        new TextRun({ text: company, bold: true, size: 22 }),
        new TextRun({ text: "  |  " + role, size: 22, color: GRAY_HEX }),
        new TextRun({
          children: [
            new PositionalTab({
              alignment: PositionalTabAlignment.RIGHT,
              relativeTo: "margin",
              leader: PositionalTabLeader.NONE,
            }),
          ],
          text: "",
        }),
        new TextRun({ text: dates, italics: true, size: 20, color: GRAY_HEX }),
      ],
    });
  }

  function bl(text) {
    return new Paragraph({
      numbering: bullet,
      spacing: { after: 30 },
      children: [new TextRun({ text, size: 21 })],
    });
  }

  function projHeader(name, dates, role) {
    return new Paragraph({
      spacing: { before: 140, after: 30 },
      tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
      children: [
        new TextRun({ text: name, bold: true, size: 22 }),
        new TextRun({ text: "  —  " + role, size: 20, color: GRAY_HEX }),
        new TextRun({
          children: [
            new PositionalTab({
              alignment: PositionalTabAlignment.RIGHT,
              relativeTo: "margin",
              leader: PositionalTabLeader.NONE,
            }),
          ],
          text: "",
        }),
        new TextRun({ text: dates, italics: true, size: 20, color: GRAY_HEX }),
      ],
    });
  }

  function projLine(label, text) {
    return new Paragraph({
      spacing: { after: 20 },
      indent: { left: 200 },
      children: [
        new TextRun({ text: label + ": ", bold: true, size: 21 }),
        new TextRun({ text, size: 21 }),
      ],
    });
  }

  function projLinks(pairs) {
    const children = [new TextRun({ text: "Links: ", bold: true, size: 20 })];
    pairs.forEach(([label, url], i) => {
      if (i > 0)
        children.push(
          new TextRun({ text: "  ·  ", size: 20, color: GRAY_HEX }),
        );
      children.push(
        new ExternalHyperlink({
          link: url,
          children: [
            new TextRun({ text: label, size: 20, style: "Hyperlink" }),
          ],
        }),
      );
    });
    return new Paragraph({
      spacing: { after: 20 },
      indent: { left: 200 },
      children,
    });
  }

  const {
    header,
    summary,
    experience,
    skills,
    projects,
    education,
    articles,
    languages,
  } = data;
  const children = [];

  // Header
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: header.name,
          bold: true,
          size: 44,
          color: ACCENT_HEX,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: header.title, size: 24, color: GRAY_HEX }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: header.phone + "   ·   ", size: 20 }),
        new ExternalHyperlink({
          link: "mailto:" + header.email,
          children: [
            new TextRun({ text: header.email, size: 20, style: "Hyperlink" }),
          ],
        }),
        new TextRun({ text: "   ·   " + header.location, size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new ExternalHyperlink({
          link: header.linkedin.url,
          children: [
            new TextRun({
              text: header.linkedin.label,
              size: 20,
              style: "Hyperlink",
            }),
          ],
        }),
        new TextRun({ text: "   ·   Portfolio: ", size: 20 }),
        new ExternalHyperlink({
          link: header.portfolio.url,
          children: [
            new TextRun({
              text: header.portfolio.label,
              size: 20,
              style: "Hyperlink",
            }),
          ],
        }),
      ],
    }),
  );

  // Summary
  children.push(
    h2("Summary"),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ size: 21, text: summary })],
    }),
  );

  // Experience
  children.push(h2("Work Experience"));
  for (const job of experience) {
    children.push(jobHeader(job.company, job.role, job.dates));
    for (const b of job.bullets) children.push(bl(b));
  }

  // Skills
  children.push(h2("Technical Skills"));
  for (const s of skills) children.push(bl(s));

  // Projects
  children.push(h2("Selected Projects"));
  for (const proj of projects) {
    children.push(projHeader(proj.name, proj.dates, proj.role));
    children.push(projLine("Tech", proj.tech));
    children.push(projLine("Work", proj.work));
    if (proj.links?.length) children.push(projLinks(proj.links));
  }

  // Education
  children.push(
    h2("Education"),
    new Paragraph({
      spacing: { after: 30 },
      tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
      children: [
        new TextRun({ text: education.school, bold: true, size: 22 }),
        new TextRun({
          children: [
            new PositionalTab({
              alignment: PositionalTabAlignment.RIGHT,
              relativeTo: "margin",
              leader: PositionalTabLeader.NONE,
            }),
          ],
          text: "",
        }),
        new TextRun({
          text: education.dates,
          italics: true,
          size: 20,
          color: GRAY_HEX,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: education.gpa, size: 21 })],
    }),
  );

  // Articles & Languages
  children.push(h2("Articles & Languages"));
  for (const article of articles) {
    children.push(
      new Paragraph({
        numbering: bullet,
        spacing: { after: 30 },
        children: [
          new ExternalHyperlink({
            link: article.url,
            children: [
              new TextRun({
                text: article.title,
                size: 21,
                style: "Hyperlink",
              }),
            ],
          }),
          new TextRun({
            text: " — " + article.source,
            size: 21,
            color: GRAY_HEX,
          }),
        ],
      }),
    );
  }
  for (const lang of languages) children.push(bl(lang));

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "bul",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 440, hanging: 220 } } },
            },
          ],
        },
      ],
    },
    styles: { default: { document: { run: { font: "Calibri", size: 21 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

// ─── PDF builder ─────────────────────────────────────────────────────────────

const ACCENT_PDF = "#1F4E79";
const GRAY_PDF = "#595959";

function buildPDFDefinition(data) {
  const {
    header,
    summary,
    experience,
    skills,
    projects,
    education,
    articles,
    languages,
  } = data;

  const content = [];

  // Roboto rộng hơn Calibri ~5-8%, dùng 10pt thay 10.5pt để bù lại và fit 2 trang
  function sectionHeader(title) {
    return [
      {
        text: title.toUpperCase(),
        fontSize: 11,
        bold: true,
        color: ACCENT_PDF,
        margin: [0, 9, 0, 0],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.5,
            lineColor: ACCENT_PDF,
          },
        ],
        margin: [0, 1, 0, 4],
      },
    ];
  }

  // Header
  content.push({
    text: header.name,
    fontSize: 22,
    bold: true,
    color: ACCENT_PDF,
    margin: [0, 0, 0, 2],
  });
  content.push({
    text: header.title,
    fontSize: 11,
    color: GRAY_PDF,
    margin: [0, 0, 0, 2],
  });
  content.push({
    text: [
      { text: header.phone + "   ·   " },
      {
        text: header.email,
        link: "mailto:" + header.email,
        decoration: "underline",
        color: ACCENT_PDF,
      },
      { text: "   ·   " + header.location },
    ],
    fontSize: 9.5,
    margin: [0, 0, 0, 1],
  });
  content.push({
    text: [
      {
        text: header.linkedin.label,
        link: header.linkedin.url,
        decoration: "underline",
        color: ACCENT_PDF,
      },
      { text: "   ·   Portfolio: " },
      {
        text: header.portfolio.label,
        link: header.portfolio.url,
        decoration: "underline",
        color: ACCENT_PDF,
      },
    ],
    fontSize: 9.5,
    margin: [0, 0, 0, 2],
  });

  // Summary
  content.push(...sectionHeader("Summary"));
  content.push({ text: summary, fontSize: 10, margin: [0, 0, 0, 2] });

  // Experience
  content.push(...sectionHeader("Work Experience"));
  for (const job of experience) {
    content.push({
      columns: [
        {
          text: [
            { text: job.company, bold: true, fontSize: 10.5 },
            { text: "  |  " + job.role, color: GRAY_PDF, fontSize: 10 },
          ],
          width: "*",
        },
        {
          text: job.dates,
          fontSize: 9.5,
          color: GRAY_PDF,
          italics: true,
          alignment: "right",
          width: "auto",
        },
      ],
      margin: [0, 5, 0, 1],
    });
    content.push({
      ul: job.bullets.map((b) => ({ text: b, fontSize: 10 })),
      margin: [0, 0, 0, 1],
    });
  }

  // Skills
  content.push(...sectionHeader("Technical Skills"));
  content.push({
    ul: skills.map((s) => ({ text: s, fontSize: 10 })),
    margin: [0, 0, 0, 1],
  });

  // Projects
  content.push(...sectionHeader("Selected Projects"));
  for (const proj of projects) {
    content.push({
      columns: [
        {
          text: [
            { text: proj.name, bold: true, fontSize: 10.5 },
            { text: "  —  " + proj.role, color: GRAY_PDF, fontSize: 9.5 },
          ],
          width: "*",
        },
        {
          text: proj.dates,
          fontSize: 9.5,
          color: GRAY_PDF,
          italics: true,
          alignment: "right",
          width: "auto",
        },
      ],
      margin: [0, 5, 0, 1],
    });
    content.push({
      text: [{ text: "Tech: ", bold: true }, proj.tech],
      fontSize: 10,
      margin: [8, 0, 0, 0.5],
    });
    content.push({
      text: [{ text: "Work: ", bold: true }, proj.work],
      fontSize: 10,
      margin: [8, 0, 0, 0.5],
    });
    if (proj.links?.length) {
      const linkParts = [{ text: "Links: ", bold: true, fontSize: 9.5 }];
      proj.links.forEach(([label, url], i) => {
        if (i > 0)
          linkParts.push({ text: "  ·  ", color: GRAY_PDF, fontSize: 9.5 });
        linkParts.push({
          text: label,
          link: url,
          decoration: "underline",
          color: ACCENT_PDF,
          fontSize: 9.5,
        });
      });
      content.push({ text: linkParts, margin: [8, 0, 0, 1] });
    }
  }

  // Education
  content.push(...sectionHeader("Education"));
  content.push({
    columns: [
      { text: education.school, bold: true, fontSize: 10.5, width: "*" },
      {
        text: education.dates,
        fontSize: 9.5,
        color: GRAY_PDF,
        italics: true,
        alignment: "right",
        width: "auto",
      },
    ],
    margin: [0, 0, 0, 1],
  });
  content.push({ text: education.gpa, fontSize: 10, margin: [0, 0, 0, 2] });

  // Articles & Languages
  content.push(...sectionHeader("Articles & Languages"));
  const listItems = [
    ...articles.map((a) => ({
      text: [
        {
          text: a.title,
          link: a.url,
          decoration: "underline",
          color: ACCENT_PDF,
        },
        { text: " — " + a.source, color: GRAY_PDF },
      ],
      fontSize: 10,
    })),
    ...languages.map((l) => ({ text: l, fontSize: 10 })),
  ];
  content.push({ ul: listItems });

  return {
    pageSize: "A4",
    pageMargins: [40, 36, 40, 36],
    content,
    defaultStyle: { font: "Calibri", fontSize: 10, lineHeight: 1.2 },
  };
}

// ─── hook ────────────────────────────────────────────────────────────────────

export function useBuildCV() {
  const [isLoading, setIsLoading] = useState(false);

  async function downloadCV(data) {
    setIsLoading(true);
    try {
      const blob = await buildDocx(data);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.header.name.replace(/\s+/g, "_")}_CV.docx`;
      a.click();
      URL.revokeObjectURL(url);
      saveCVData(data); // persist to localStorage
    } finally {
      setIsLoading(false);
    }
  }

  async function downloadPDF(data) {
    setIsLoading(true);
    try {
      const pdfMake = (await import("pdfmake/build/pdfmake")).default;
      // Load Calibri fonts from /public/fonts/ and pass directly to createPdf
      const toBase64 = async (path) => {
        const res = await fetch(path);
        const buf = new Uint8Array(await res.arrayBuffer());
        let binary = "";
        const chunk = 8192;
        for (let i = 0; i < buf.length; i += chunk) {
          binary += String.fromCharCode(...buf.subarray(i, i + chunk));
        }
        return btoa(binary);
      };
      const [normal, bold, italics, bolditalics] = await Promise.all([
        toBase64("/fonts/calibri-regular.ttf"),
        toBase64("/fonts/calibri-bold.ttf"),
        toBase64("/fonts/calibri-italic.ttf"),
        toBase64("/fonts/calibri-bold-italic.ttf"),
      ]);

      pdfMake.addVirtualFileSystem({
        "calibri-regular.ttf": normal,
        "calibri-bold.ttf": bold,
        "calibri-italic.ttf": italics,
        "calibri-bold-italic.ttf": bolditalics,
      });
      // setFonts thay addFonts để override Roboto và chỉ dùng Calibri
      pdfMake.setFonts({
        Calibri: {
          normal: "calibri-regular.ttf",
          bold: "calibri-bold.ttf",
          italics: "calibri-italic.ttf",
          bolditalics: "calibri-bold-italic.ttf",
        },
      });
      console.log("[pdfmake] fonts registered:", Object.keys(pdfMake.fonts));
      console.log("[pdfmake] calibri-regular length:", normal.length, "| starts with:", normal.slice(0, 12));

      const docDefinition = buildPDFDefinition(data);
      const filename = `${data.header.name.replace(/\s+/g, "_")}_CV.pdf`;
      pdfMake.createPdf(docDefinition).download(filename);
    } finally {
      setIsLoading(false);
    }
  }

  return { downloadCV, downloadPDF, isLoading };
}
