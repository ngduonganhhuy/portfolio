import Layout from "@/components/Layout";
import { loadCVData, useBuildCV } from "@/hooks/useBuildCV";
import Head from "next/head";
import { useState } from "react";

// ─── tiny reusable input primitives ────────────────────────────────────────

function Field({ label, value, onChange, textarea = false, className = "" }) {
  const base =
    "w-full rounded-md border border-dark/20 dark:border-light/20 bg-light dark:bg-dark/60 px-3 py-2 text-sm text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark";
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wide text-dark/50 dark:text-light/50">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          rows={3}
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="mt-10 mb-4 text-lg font-bold text-primary dark:text-primaryDark border-b border-primary/30 dark:border-primaryDark/30 pb-1">
      {children}
    </h2>
  );
}

function AddBtn({ onClick, label = "Thêm" }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 text-xs px-3 py-1 rounded border border-primary dark:border-primaryDark text-primary dark:text-primaryDark hover:bg-primary/10 dark:hover:bg-primaryDark/10 transition-colors"
    >
      + {label}
    </button>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-2 py-0.5 rounded border border-red-400 text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
    >
      Xóa
    </button>
  );
}

// ─── main page ──────────────────────────────────────────────────────────────

export default function CVBuilder() {
  const [form, setForm] = useState(() =>
    JSON.parse(JSON.stringify(loadCVData())),
  );
  const { downloadCV, isLoading } = useBuildCV();

  // ── header ──
  const setHeader = (field, val) =>
    setForm((f) => ({ ...f, header: { ...f.header, [field]: val } }));
  const setHeaderNested = (field, sub, val) =>
    setForm((f) => ({
      ...f,
      header: { ...f.header, [field]: { ...f.header[field], [sub]: val } },
    }));

  // ── summary ──
  const setSummary = (val) => setForm((f) => ({ ...f, summary: val }));

  // ── experience ──
  const setExpField = (i, field, val) =>
    setForm((f) => {
      const exp = f.experience.map((e, idx) =>
        idx === i ? { ...e, [field]: val } : e,
      );
      return { ...f, experience: exp };
    });
  const setExpBullet = (i, bi, val) =>
    setForm((f) => {
      const exp = f.experience.map((e, idx) => {
        if (idx !== i) return e;
        const bullets = e.bullets.map((b, bidx) => (bidx === bi ? val : b));
        return { ...e, bullets };
      });
      return { ...f, experience: exp };
    });
  const addExpBullet = (i) =>
    setForm((f) => {
      const exp = f.experience.map((e, idx) =>
        idx === i ? { ...e, bullets: [...e.bullets, ""] } : e,
      );
      return { ...f, experience: exp };
    });
  const removeExpBullet = (i, bi) =>
    setForm((f) => {
      const exp = f.experience.map((e, idx) =>
        idx === i
          ? { ...e, bullets: e.bullets.filter((_, bidx) => bidx !== bi) }
          : e,
      );
      return { ...f, experience: exp };
    });
  const addExp = () =>
    setForm((f) => ({
      ...f,
      experience: [
        ...f.experience,
        { company: "", role: "", dates: "", bullets: [""] },
      ],
    }));
  const removeExp = (i) =>
    setForm((f) => ({
      ...f,
      experience: f.experience.filter((_, idx) => idx !== i),
    }));

  // ── skills ──
  const setSkill = (i, val) =>
    setForm((f) => ({
      ...f,
      skills: f.skills.map((s, idx) => (idx === i ? val : s)),
    }));
  const addSkill = () => setForm((f) => ({ ...f, skills: [...f.skills, ""] }));
  const removeSkill = (i) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }));

  // ── projects ──
  const setProjField = (i, field, val) =>
    setForm((f) => {
      const projects = f.projects.map((p, idx) =>
        idx === i ? { ...p, [field]: val } : p,
      );
      return { ...f, projects };
    });
  const setProjLink = (i, li, sub, val) =>
    setForm((f) => {
      const projects = f.projects.map((p, idx) => {
        if (idx !== i) return p;
        const links = p.links.map((lnk, lidx) => {
          if (lidx !== li) return lnk;
          const updated = [...lnk];
          updated[sub === "label" ? 0 : 1] = val;
          return updated;
        });
        return { ...p, links };
      });
      return { ...f, projects };
    });
  const addProjLink = (i) =>
    setForm((f) => {
      const projects = f.projects.map((p, idx) =>
        idx === i ? { ...p, links: [...p.links, ["", ""]] } : p,
      );
      return { ...f, projects };
    });
  const removeProjLink = (i, li) =>
    setForm((f) => {
      const projects = f.projects.map((p, idx) =>
        idx === i
          ? { ...p, links: p.links.filter((_, lidx) => lidx !== li) }
          : p,
      );
      return { ...f, projects };
    });
  const addProj = () =>
    setForm((f) => ({
      ...f,
      projects: [
        ...f.projects,
        { name: "", dates: "", role: "", tech: "", work: "", links: [] },
      ],
    }));
  const removeProj = (i) =>
    setForm((f) => ({
      ...f,
      projects: f.projects.filter((_, idx) => idx !== i),
    }));

  // ── education ──
  const setEdu = (field, val) =>
    setForm((f) => ({ ...f, education: { ...f.education, [field]: val } }));

  // ── articles ──
  const setArticle = (i, field, val) =>
    setForm((f) => {
      const articles = f.articles.map((a, idx) =>
        idx === i ? { ...a, [field]: val } : a,
      );
      return { ...f, articles };
    });
  const addArticle = () =>
    setForm((f) => ({
      ...f,
      articles: [...f.articles, { title: "", url: "", source: "" }],
    }));
  const removeArticle = (i) =>
    setForm((f) => ({
      ...f,
      articles: f.articles.filter((_, idx) => idx !== i),
    }));

  // ── languages ──
  const setLang = (i, val) =>
    setForm((f) => ({
      ...f,
      languages: f.languages.map((l, idx) => (idx === i ? val : l)),
    }));
  const addLang = () =>
    setForm((f) => ({ ...f, languages: [...f.languages, ""] }));
  const removeLang = (i) =>
    setForm((f) => ({
      ...f,
      languages: f.languages.filter((_, idx) => idx !== i),
    }));

  // ── reset ──
  const reset = () => setForm(JSON.parse(JSON.stringify(loadCVData())));

  return (
    <main className="w-full min-h-screen bg-light dark:bg-dark">
      <Head>
        <title>CV Builder</title>
      </Head>
      <Layout>
        <div className="max-w-3xl mx-auto">
          {/* top bar */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-dark dark:text-light">
              CV Builder
            </h1>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 text-sm rounded-lg border border-dark/30 dark:border-light/30 text-dark dark:text-light hover:bg-dark/5 dark:hover:bg-light/5 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => downloadCV(form)}
                disabled={isLoading}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-primary dark:bg-primaryDark text-light dark:text-dark hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? "Đang tạo..." : "Download .docx"}
              </button>
            </div>
          </div>
          <p className="text-xs text-dark/40 dark:text-light/40 mb-6">
            Chỉnh sửa nội dung bên dưới rồi nhấn Download để tạo file CV.
          </p>

          {/* ── HEADER ── */}
          <SectionTitle>Header</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            <Field
              label="Họ tên"
              value={form.header.name}
              onChange={(v) => setHeader("name", v)}
            />
            <Field
              label="Title"
              value={form.header.title}
              onChange={(v) => setHeader("title", v)}
            />
            <Field
              label="Điện thoại"
              value={form.header.phone}
              onChange={(v) => setHeader("phone", v)}
            />
            <Field
              label="Email"
              value={form.header.email}
              onChange={(v) => setHeader("email", v)}
            />
            <Field
              label="Địa điểm"
              value={form.header.location}
              onChange={(v) => setHeader("location", v)}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-1">
            <Field
              label="LinkedIn URL"
              value={form.header.linkedin.url}
              onChange={(v) => setHeaderNested("linkedin", "url", v)}
            />
            <Field
              label="LinkedIn label"
              value={form.header.linkedin.label}
              onChange={(v) => setHeaderNested("linkedin", "label", v)}
            />
            <Field
              label="Portfolio URL"
              value={form.header.portfolio.url}
              onChange={(v) => setHeaderNested("portfolio", "url", v)}
            />
            <Field
              label="Portfolio label"
              value={form.header.portfolio.label}
              onChange={(v) => setHeaderNested("portfolio", "label", v)}
            />
          </div>

          {/* ── SUMMARY ── */}
          <SectionTitle>Summary</SectionTitle>
          <Field value={form.summary} onChange={setSummary} textarea />

          {/* ── EXPERIENCE ── */}
          <SectionTitle>Work Experience</SectionTitle>
          {form.experience.map((job, i) => (
            <div
              key={i}
              className="mb-6 rounded-lg border border-dark/10 dark:border-light/10 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-dark/70 dark:text-light/70">
                  Job #{i + 1}
                </span>
                <RemoveBtn onClick={() => removeExp(i)} />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3 sm:grid-cols-1">
                <Field
                  label="Công ty"
                  value={job.company}
                  onChange={(v) => setExpField(i, "company", v)}
                />
                <Field
                  label="Vị trí"
                  value={job.role}
                  onChange={(v) => setExpField(i, "role", v)}
                />
                <Field
                  label="Thời gian"
                  value={job.dates}
                  onChange={(v) => setExpField(i, "dates", v)}
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-dark/50 dark:text-light/50 mb-2">
                Bullets
              </p>
              {job.bullets.map((b, bi) => (
                <div key={bi} className="flex gap-2 mb-2">
                  <input
                    className="flex-1 rounded-md border border-dark/20 dark:border-light/20 bg-light dark:bg-dark/60 px-3 py-2 text-sm text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark"
                    value={b}
                    onChange={(e) => setExpBullet(i, bi, e.target.value)}
                  />
                  <RemoveBtn onClick={() => removeExpBullet(i, bi)} />
                </div>
              ))}
              <AddBtn onClick={() => addExpBullet(i)} label="Thêm bullet" />
            </div>
          ))}
          <AddBtn onClick={addExp} label="Thêm job" />

          {/* ── SKILLS ── */}
          <SectionTitle>Technical Skills</SectionTitle>
          {form.skills.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 rounded-md border border-dark/20 dark:border-light/20 bg-light dark:bg-dark/60 px-3 py-2 text-sm text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark"
                value={s}
                onChange={(e) => setSkill(i, e.target.value)}
              />
              <RemoveBtn onClick={() => removeSkill(i)} />
            </div>
          ))}
          <AddBtn onClick={addSkill} label="Thêm skill" />

          {/* ── PROJECTS ── */}
          <SectionTitle>Selected Projects</SectionTitle>
          {form.projects.map((proj, i) => (
            <div
              key={i}
              className="mb-6 rounded-lg border border-dark/10 dark:border-light/10 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-dark/70 dark:text-light/70">
                  Project #{i + 1}
                </span>
                <RemoveBtn onClick={() => removeProj(i)} />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3 sm:grid-cols-1">
                <Field
                  label="Tên"
                  value={proj.name}
                  onChange={(v) => setProjField(i, "name", v)}
                />
                <Field
                  label="Thời gian"
                  value={proj.dates}
                  onChange={(v) => setProjField(i, "dates", v)}
                />
                <Field
                  label="Role"
                  value={proj.role}
                  onChange={(v) => setProjField(i, "role", v)}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 mb-3">
                <Field
                  label="Tech"
                  value={proj.tech}
                  onChange={(v) => setProjField(i, "tech", v)}
                />
                <Field
                  label="Work"
                  value={proj.work}
                  onChange={(v) => setProjField(i, "work", v)}
                  textarea
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-dark/50 dark:text-light/50 mb-2">
                Links
              </p>
              {proj.links.map((lnk, li) => (
                <div key={li} className="flex gap-2 mb-2">
                  <input
                    placeholder="Label"
                    className="w-32 rounded-md border border-dark/20 dark:border-light/20 bg-light dark:bg-dark/60 px-3 py-2 text-sm text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark"
                    value={lnk[0]}
                    onChange={(e) =>
                      setProjLink(i, li, "label", e.target.value)
                    }
                  />
                  <input
                    placeholder="URL"
                    className="flex-1 rounded-md border border-dark/20 dark:border-light/20 bg-light dark:bg-dark/60 px-3 py-2 text-sm text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark"
                    value={lnk[1]}
                    onChange={(e) => setProjLink(i, li, "url", e.target.value)}
                  />
                  <RemoveBtn onClick={() => removeProjLink(i, li)} />
                </div>
              ))}
              <AddBtn onClick={() => addProjLink(i)} label="Thêm link" />
            </div>
          ))}
          <AddBtn onClick={addProj} label="Thêm project" />

          {/* ── EDUCATION ── */}
          <SectionTitle>Education</SectionTitle>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
            <Field
              label="Trường"
              value={form.education.school}
              onChange={(v) => setEdu("school", v)}
            />
            <Field
              label="Thời gian"
              value={form.education.dates}
              onChange={(v) => setEdu("dates", v)}
            />
            <Field
              label="GPA"
              value={form.education.gpa}
              onChange={(v) => setEdu("gpa", v)}
            />
          </div>

          {/* ── ARTICLES ── */}
          <SectionTitle>Articles</SectionTitle>
          {form.articles.map((a, i) => (
            <div
              key={i}
              className="mb-4 rounded-lg border border-dark/10 dark:border-light/10 p-4"
            >
              <div className="flex justify-end mb-2">
                <RemoveBtn onClick={() => removeArticle(i)} />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
                <Field
                  label="Tiêu đề"
                  value={a.title}
                  onChange={(v) => setArticle(i, "title", v)}
                  className="col-span-2 sm:col-span-1"
                />
                <Field
                  label="Source"
                  value={a.source}
                  onChange={(v) => setArticle(i, "source", v)}
                />
                <Field
                  label="URL"
                  value={a.url}
                  onChange={(v) => setArticle(i, "url", v)}
                  className="col-span-3 sm:col-span-1"
                />
              </div>
            </div>
          ))}
          <AddBtn onClick={addArticle} label="Thêm bài viết" />

          {/* ── LANGUAGES ── */}
          <SectionTitle>Languages</SectionTitle>
          {form.languages.map((l, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 rounded-md border border-dark/20 dark:border-light/20 bg-light dark:bg-dark/60 px-3 py-2 text-sm text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark"
                value={l}
                onChange={(e) => setLang(i, e.target.value)}
              />
              <RemoveBtn onClick={() => removeLang(i)} />
            </div>
          ))}
          <AddBtn onClick={addLang} label="Thêm ngôn ngữ" />

          {/* ── bottom download ── */}
          <div className="mt-12 flex justify-end">
            <button
              onClick={() => downloadCV(form)}
              disabled={isLoading}
              className="px-8 py-3 font-semibold rounded-lg bg-primary dark:bg-primaryDark text-light dark:text-dark hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Đang tạo..." : "Download CV (.docx)"}
            </button>
          </div>
        </div>
      </Layout>
    </main>
  );
}
