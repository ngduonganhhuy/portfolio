// ============================================================
//  CV DATA — chỉnh sửa file này để cập nhật nội dung CV
// ============================================================

export const cvData = {
  // ----------------------------------------------------------
  // HEADER
  // ----------------------------------------------------------
  header: {
    name: "NGUYEN DUONG ANH HUY",
    title: "Mobile Software Engineer (Flutter · Swift · React Native)",
    phone: "0348 098 023",
    email: "ngduonganhhuy@gmail.com",
    location: "Ho Chi Minh City",
    linkedin: {
      label: "linkedin.com/in/ngduonganhhuy",
      url: "https://linkedin.com/in/ngduonganhhuy/",
    },
    portfolio: {
      label: "holmes.id.vn",
      url: "https://holmes.id.vn",
    },
  },

  // ----------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------
  summary:
    "Mobile engineer with nearly 5 years of experience building and shipping iOS/Android apps with Flutter, Swift, and React Native. Owned products end-to-end — from Figma design and API integration to store release — with measurable impact (cut app startup time by 60%, features driving 20K+ new sign-ups). Experienced in mentoring junior developers; seeking a Senior/Lead role with larger technical ownership.",

  // ----------------------------------------------------------
  // WORK EXPERIENCE
  // ----------------------------------------------------------
  experience: [
    {
      company: "FPT Software",
      role: "Software Engineer",
      dates: "Mar 2026 – Present",
      bullets: [
        "Maintain and develop new features for Long Chau Pharmacy app (Flutter, Golang backend).",
        "Built Family Account feature powering a co-marketing event with VnExpress, driving ~20,000 new family sign-ups.",
        "Adopted AI-assisted development via MCP integrations (Jira/Atlassian, Figma, GitLab): AI agents read tickets and Figma specs to accelerate implementation.",
        "Automated the delivery workflow: on task completion, ticket status is updated on Jira and commits/MRs are created through glab CLI — reducing manual overhead per task.",
        "Work with Marketing/PO to implement tracking events, in-app games, and promotion features.",
      ],
    },
    {
      company: "BHD (BHDStar.vn)",
      role: "Mobile Developer",
      dates: "Apr 2024 – Mar 2026",
      bullets: [
        "Danet (movie streaming, Flutter): optimized app startup time from 5s to 2s (-60%); improved UX and shipped new features to both stores.",
        "DShorts (short-video app, Flutter): built new product from scratch, reaching 2,000+ downloads in the first month; set up Firebase, AdMob, and ads services.",
        "Danet TV (Android TV, Kotlin): proposed the Android TV platform to management, then built the app from scratch — gained 1,000+ users within the first 3 weeks of launch.",
        "Mentored 2 interns: reviewed their code, provided technical guidance, and reported progress to management.",
      ],
    },
    {
      company: "GMO Runsystem",
      role: "Mobile Developer",
      dates: "Sep 2022 – Apr 2024",
      bullets: [
        "Defined user stories with BA; designed and developed apps from Adobe XD / Figma designs.",
        "Provided technical solutions and supported other team members.",
        "Configured Android/iOS builds for testing via TestFlight and Diawi; deployed to Google Play and App Store.",
      ],
    },
    {
      company: "Exnodes",
      role: "Mobile Developer",
      dates: "Sep 2021 – Sep 2022",
      bullets: [
        "Built app UI/UX from Figma mockups; integrated REST APIs with Flutter (GetX, Bloc) and JWT auth.",
        "Managed source code with AWS CodeCommit; handled image storage with S3.",
        "Configured build pipelines for Android and iOS; managed tasks on Jira.",
      ],
    },
  ],

  // ----------------------------------------------------------
  // TECHNICAL SKILLS  (mỗi item là một dòng bullet)
  // ----------------------------------------------------------
  skills: [
    "Languages: Dart, Swift, Kotlin, JavaScript/TypeScript, HTML/CSS",
    "Mobile: Flutter (GetX, Bloc, Riverpod), SwiftUI, UIKit, React Native (Redux, RTK Query)",
    "Backend & DB: Golang, Node.js, MongoDB, MySQL",
    "Tools: Git (GitLab, CodeCommit), Firebase (FCM, AdMob), Jira, Figma, Adobe XD, TestFlight",
    "AI-assisted development: MCP integrations (Jira/Atlassian, Figma, GitLab), workflow automation with glab CLI",
  ],

  // ----------------------------------------------------------
  // SELECTED PROJECTS
  // ----------------------------------------------------------
  projects: [
    {
      name: "Long Chau Pharmacy",
      dates: "Mar 2026 – Present",
      role: "Software Engineer",
      tech: "Flutter, Golang",
      work: "Maintenance and new features for a large-scale pharmacy app; Family Account feature drove ~20,000 new sign-ups via VnExpress event.",
      links: [
        ["Google Play", "https://play.google.com/store/apps/details?id=vn.frt.longchau.app&hl=vi"],
        ["App Store", "https://apps.apple.com/vn/app/long-ch%C3%A2u-chuy%C3%AAn-gia-thu%E1%BB%91c/id1586071844?l=vi"],
      ],
    },
    {
      name: "Danet / Danet TV / DShorts",
      dates: "Apr 2024 – Mar 2026",
      role: "Mobile Developer",
      tech: "Flutter, Kotlin (Android TV), Node.js, MongoDB",
      work: "Streaming ecosystem: cut Danet startup time from 5s to 2s; built DShorts (2,000+ downloads in first month); proposed & built Danet TV for Android TV (1,000+ users in first 3 weeks); integrated Firebase/AdMob.",
      links: [
        ["Danet (Play)", "https://play.google.com/store/apps/details?id=com.movideo.whitelabel&hl=vi"],
        ["Danet (iOS)", "https://apps.apple.com/vn/app/danet/id1099577795?l=vi"],
        ["DShorts (Play)", "https://play.google.com/store/apps/details?id=com.bhd.danet_shorts&hl=vi"],
        ["DShorts (iOS)", "https://apps.apple.com/vn/app/dshorts-drama-shorts/id6503342186?l=vi"],
      ],
    },
    {
      name: "LendMe & LendMe Wiki",
      dates: "Apr 2024 – Mar 2026",
      role: "Frontend / Fullstack Developer",
      tech: "Flutter, Next.js, Node.js (Mongoose)",
      work: "Pawn-shop management app: built UI from Figma, integrated PayOS payment, deployed to market. Built the LendMe Wiki website from scratch.",
      links: [
        ["Google Play", "https://play.google.com/store/apps/details?id=com.thio.lendme&hl=vi"],
        ["App Store", "https://apps.apple.com/vn/app/lendme/id6737429438?l=vi"],
        ["Web App", "https://app.lendme.vn/"],
        ["Wiki", "https://wiki.lendme.vn/"],
        ["Website", "https://lendme.vn/"],
      ],
    },
    {
      name: "Direct Sales",
      dates: "Oct 2023",
      role: "Mobile Developer",
      tech: "React Native, RTK Query, Node.js, MongoDB",
      work: "Replaced paper-based direct-sales process; built app boilerplate, offline mode, FCM, and multi-platform build setup.",
      links: [],
    },
    {
      name: "Smart Staff",
      dates: "Apr 2023",
      role: "Mobile Developer",
      tech: "Swift, UIKit (macOS)",
      work: "Device and staff management app for macOS: attendance, working-hours tracking, and offline mode with automatic sync once back online.",
      links: [],
    },
    {
      name: "Gonsa – Pharmaceutical E-commerce",
      dates: "Sep 2022",
      role: "Mobile Developer",
      tech: "Flutter (Bloc), WordPress, MySQL",
      work: "B2B/B2C e-commerce app: REST API with DIO + JWT, NeoPay payment integration, released to both stores.",
      links: [],
    },
    {
      name: "Yakult Khai Thác",
      dates: "Sep 2022",
      role: "Mobile Developer",
      tech: "Flutter (Bloc), Laravel, MySQL",
      work: "Digitized paper workflows for staff; designed user flows on Adobe XD, built app, deployed via TestFlight/APK for QC.",
      links: [],
    },
    {
      name: "Salonbookly (Customer & Staff apps)",
      dates: "2021 – Sep 2022",
      role: "Mobile Developer",
      tech: "Flutter (GetX), Python, MySQL",
      work: "Salon booking platform: built both customer and staff apps from scratch, REST API + JWT auth, FCM, multi-platform builds, released to both stores.",
      links: [
        ["Customer (Play)", "https://play.google.com/store/apps/details?id=com.bizbookly.customer&hl=vi"],
        ["Customer (iOS)", "https://apps.apple.com/vn/app/salonbookly/id1630656771?l=vi"],
        ["Staff (Play)", "https://play.google.com/store/apps/details?id=com.bizbookly.staff&hl=vi"],
        ["Staff (iOS)", "https://apps.apple.com/vn/app/salonbookly-staff/id1630657030?l=vi"],
      ],
    },
  ],

  // ----------------------------------------------------------
  // EDUCATION
  // ----------------------------------------------------------
  education: {
    school: "Saigon Technology University",
    dates: "08/2018 – 05/2022",
    gpa: "GPA: 3.44 / 4.0",
  },

  // ----------------------------------------------------------
  // ARTICLES & LANGUAGES
  // ----------------------------------------------------------
  articles: [
    {
      title: "Best Practices: Writing Clean Code with Flutter",
      url: "https://dev.to/glopgeek/best-practices-writing-clean-code-with-flutter-501m",
      source: "dev.to",
    },
    {
      title: "Holmes AdBlock DNS: Chặn quảng cáo và tracker bằng DoH",
      url: "https://holmes.id.vn/articles/holmes-adblock-dns",
      source: "holmes.id.vn",
    },
  ],

  languages: ["English: reading, listening, speaking"],
};
