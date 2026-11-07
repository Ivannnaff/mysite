export const translations = {
  en: {
    nav: {
      home: "Home",
      now: "Now",
      uses: "Uses",
      resume: "Resume",
      contact: "Contact",
    },
    home: {
      role: "Full-Stack Web Developer",
      bio: "I'm a full-stack web developer building apps with Laravel, React, and Next.js, and I'm currently an IT undergraduate at Universitas PGRI Semarang.",
      availability: "Currently open for internships, freelance work, and collaboration",
      viewCv: "View CV",
      viewProjects: "View Projects",
      experience: "EXPERIENCE",
      projects: "PROJECTS",
      nowHeader: "NOW",
      contactHeader: "CONTACT",
      learnMoreNow: "Learn more about what I'm doing now →",
      work: "FEATURED WORK",
      viewProject: "View project",
    },
    now: {
      title: "Now",
      subtitle: "A snapshot of what I'm focused on at this point in life.",
      footer: "Updated recently from Semarang, Indonesia.",
      lastUpdated: "Last updated Nov 03 2026",
      focus: "Focus",
      focusHeading: "Client web applications, end to end.",
      focusDesc: "IT undergraduate at Universitas PGRI Semarang, building full-stack web solutions with Laravel, React, and Astro. Taking on fixed-scope projects and long-term retainers. Looking for internship opportunities.",
      building: "Building",
      buildingHeading: "Active projects in production.",
      buildingDesc: "A college task manager with a drag-and-drop Kanban board and AI assistant, a collaborative hub project exploring data and community engagement, and an information portal for KKL activities built with Astro for fast performance.",
      learning: "Learning",
      learningHeading: "Currently learning.",
      learningDesc: "A few directions I'm going deeper into this year.",
      learningList: [
        {
          title: "System Architecture",
          since: "2026-09",
          desc: "How to structure applications that stay maintainable as they grow — boundaries, trade-offs, and patterns for scaling services.",
        },
        {
          title: "UI/UX Engineering",
          since: "2026-09",
          desc: "Turning design intent into interfaces that feel calm and predictable: layout systems, motion, accessibility, and the details people notice.",
        },
        {
          title: "Database Optimization",
          since: "2026-10",
          desc: "Reading query plans, shaping indexes, and modeling data so the slow parts of an application stay out of the way.",
        },
      ],
      listeningLabel: "Listening",
      listening: {
        title: "On repeat.",
        empty: "Not playing anything right now.",
      },
      openTo: "Open to",
      openToHeading: "New work and deep contributions.",
      openToList: [
        "Client work, full-time or freelance",
        "Contributing to open source",
        "Internships",
        "Collaboration on interesting projects",
      ],
      techStack: "Tech Stack",
      handwritten: "This page is written by hand and updated whenever the answer changes.",
    },
    uses: {
      title: "Uses",
      intro: "The apps I open every day.",
      sections: [
        {
          label: "Code",
          items: [
            { name: "VS Code", note: "Where nearly every project gets written, configured with One Dark Pro." },
          ]
        },
        {
          label: "API",
          items: [
            { name: "Postman", note: "Testing and documenting APIs before they ship." },
          ]
        },
        {
          label: "Browser",
          items: [
            { name: "Firefox", note: "Daily browsing and the first place I debug." },
          ]
        },
        {
          label: "Terminal",
          items: [
            { name: "Bash", note: "Git, package managers, and local servers all run from here." },
          ]
        },
        {
          label: "Daily",
          items: [
            { name: "Orca", note: "In the daily rotation alongside everything above." },
          ]
        }
      ]
    },
    resume: {
      title: "Resume",
      backButton: "← Back home",
      printButton: "Print resume",
      role: "Full-Stack Web Developer",
      location: "Semarang, Indonesia",
      email: "ivanalfa647@gmail.com",
      github: "github.com/Ivannnaff",
      summary: "Passionate full-stack developer with experience in building web applications using modern technologies like Laravel, React, and Astro.",
      experience: [
        {
          role: "Full-Stack Developer",
          company: "Freelance & Personal Projects",
          period: "2023 — Present",
          points: [
            "Developed multiple web applications focusing on clean UI and fast performance.",
            "Integrated modern authentication, databases, and responsive Tailwind styling."
          ]
        }
      ],
      skills: {
        languages: ["JavaScript", "TypeScript", "PHP", "HTML/CSS"],
        frontend: ["React", "Astro", "Tailwind CSS", "Next.js"],
        backend: ["Node.js", "Laravel", "Express", "MySQL"],
        tools: ["Git", "VS Code", "Vercel", "Vite"]
      },
      education: [
        {
          school: "Universitas PGRI Semarang",
          period: "2023 — Present",
          degree: "Bachelor of Information Technology (IT)",
          note: "Active student focusing on software engineering and web technologies."
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch or send a message directly.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sendButton: "Send Message",
      sendingButton: "Sending…",
      successMessage: "Thank you! Your message has been sent successfully.",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "What would you like to say?",
      captchaRequired: "Please complete the verification first.",
      verificationFailed: "Verification failed. Please try again.",
    },
    colophon: {
      title: "Colophon",
      desc: "A colophon is a note on how a book was made. This is that note for this site: the tools it is built with, and the people whose work lit the way. The list is honest but incomplete — many more developers shaped this site than I can name.",
      built: "How it's built",
      framework: "Framework",
      frameworkDesc: "Astro 7 with React islands. Static pages in two languages with hover prefetch.",
      styling: "Styling",
      stylingDesc: "Tailwind CSS over design tokens; Inter for UI, JetBrains Mono for code and labels.",
      language: "Language",
      languageDesc: "TypeScript throughout, checked strict.",
      backend: "Backend",
      backendDesc: "Static site hosted on Vercel.",
      content: "Content",
      contentDesc: "Markdown and Astro pages, with an RSS feed and a sitemap.",
      inspiration: "Inspiration",
      inspirationDesc: "Many people shaped this site. These are some of them — and there are many more developers whose sites I can no longer name.",
      inspirationList: [
        { name: "Rafif Hardja", url: "https://rafifhardja.xyz" },
        { name: "Lee Robinson", url: "https://leerob.io" },
        { name: "Dan Abramov", url: "https://overreacted.io" },
        { name: "Guillermo Rauch", url: "https://rauchg.com" },
        { name: "Emil Kowalski", url: "https://emilkowal.ski" },
        { name: "Anthony Fu", url: "https://antfu.me" },
        { name: "Dominik Dorfmeister", url: "https://tkdodo.eu" },
        { name: "Rizzky", url: "https://rizzky.xyz" },
        { name: "Abdul Malik", url: "https://up2dul.dev" },
        { name: "Rizki Citra", url: "https://rimzzlabs.com" },
      ],
    },
  },
  id: {
    nav: {
      home: "Beranda",
      now: "Sekarang",
      uses: "Alat",
      resume: "CV",
      contact: "Kontak",
    },
    home: {
      role: "Full-Stack Web Developer",
      bio: "Saya adalah seorang full-stack web developer yang membangun aplikasi dengan Laravel, React, dan Next.js, serta saat ini menempuh pendidikan S1 Teknik Informatika di Universitas PGRI Semarang.",
      availability: "Terbuka untuk magang, proyek freelance, dan kolaborasi",
      viewCv: "Lihat CV",
      viewProjects: "Lihat Proyek",
      experience: "PENGALAMAN",
      projects: "PROYEK",
      nowHeader: "SAAT INI",
      contactHeader: "KONTAK",
      learnMoreNow: "Pelajari lebih lanjut tentang kegiatan saya saat ini →",
      work: "PROYEK UNGGULAN",
      viewProject: "Lihat proyek",
    },
    now: {
      title: "Sekarang",
      subtitle: "Sebaran dari apa yang sedang saya fokuskan saat ini.",
      footer: "Terakhir diperbarui dari Semarang, Indonesia.",
      lastUpdated: "Terakhir diperbarui 03 Nov 2026",
      focus: "Fokus",
      focusHeading: "Aplikasi web klien, end to end.",
      focusDesc: "Aplikasi web klien, end to end. Membangun solusi web full-stack untuk klien sambil menyelesaikan pendidikan S1 di Universitas PGRI Semarang.",
      building: "Membangun",
      buildingHeading: "Proyek aktif dalam produksi.",
      buildingDesc: "Proyek aktif dalam produksi.",
      learning: "Sedang Belajar",
      learningHeading: "Sedang dipelajari.",
      learningDesc: "Beberapa arah yang sedang saya dalami tahun ini.",
      learningList: [
        {
          title: "Arsitektur Sistem",
          since: "2026-09",
          desc: "Menyusun aplikasi yang tetap mudah dirawat saat tumbuh — batasan, trade-off, dan pola untuk menskalakan layanan.",
        },
        {
          title: "UI/UX Engineering",
          since: "2026-09",
          desc: "Menerjemahkan niat desain menjadi antarmuka yang terasa tenang dan dapat diprediksi: sistem layout, motion, aksesibilitas, dan detail kecil yang terasa.",
        },
        {
          title: "Optimasi Database",
          since: "2026-10",
          desc: "Membaca query plan, menyusun indeks, dan memodelkan data agar bagian lambat dari aplikasi tidak mengganggu.",
        },
      ],
      listeningLabel: "Mendengarkan",
      listening: {
        title: "Sedang mendengarkan",
        empty: "Tidak sedang memutar apa pun.",
      },
      openTo: "Terbuka untuk",
      openToHeading: "Pekerjaan baru dan kontribusi mendalam.",
      openToList: [
        "Pekerjaan klien, full-time atau freelance",
        "Berkontribusi pada open source",
        "Magang",
        "Kolaborasi pada proyek menarik",
      ],
      techStack: "Stack Teknologi",
      handwritten: "Halaman ini ditulis secara manual dan diperbarui jika jawabannya berubah.",
    },
    uses: {
      title: "Alat",
      intro: "Aplikasi yang saya buka setiap hari.",
      sections: [
        {
          label: "Kode",
          items: [
            { name: "VS Code", note: "Tempat hampir semua proyek ditulis, dengan tema One Dark Pro." },
          ]
        },
        {
          label: "API",
          items: [
            { name: "Postman", note: "Menguji dan mendokumentasikan API sebelum dirilis." },
          ]
        },
        {
          label: "Browser",
          items: [
            { name: "Firefox", note: "Untuk browsing harian dan tempat pertama saya debugging." },
          ]
        },
        {
          label: "Terminal",
          items: [
            { name: "Bash", note: "Git, package manager, dan server lokal semuanya dijalankan dari sini." },
          ]
        },
        {
          label: "Harian",
          items: [
            { name: "Orca", note: "Dipakai setiap hari bersama semua alat di atas." },
          ]
        }
      ]
    },
    resume: {
      title: "CV",
      backButton: "← Kembali ke beranda",
      printButton: "Cetak CV",
      role: "Full-Stack Web Developer",
      location: "Semarang, Indonesia",
      email: "ivanalfa647@gmail.com",
      github: "github.com/Ivannnaff",
      summary: "Pengembang full-stack yang antusias dengan pengalaman dalam membangun aplikasi web menggunakan teknologi modern seperti Laravel, React, dan Astro.",
      experience: [
        {
          role: "Full-Stack Developer",
          company: "Freelance & Proyek Pribadi",
          period: "2023 — Sekarang",
          points: [
            "Mengembangkan berbagai aplikasi web dengan fokus pada UI bersih dan performa cepat.",
            "Mengintegrasikan autentikasi modern, database, dan styling Tailwind yang responsif."
          ]
        }
      ],
      skills: {
        languages: ["JavaScript", "TypeScript", "PHP", "HTML/CSS"],
        frontend: ["React", "Astro", "Tailwind CSS", "Next.js"],
        backend: ["Node.js", "Laravel", "Express", "MySQL"],
        tools: ["Git", "VS Code", "Vercel", "Vite"]
      },
      education: [
        {
          school: "Universitas PGRI Semarang",
          period: "2023 — Sekarang",
          degree: "S1 Teknik Informatika",
          note: "Mahasiswa aktif yang berfokus pada rekayasa perangkat lunak dan teknologi web."
        }
      ]
    },
    colophon: {
      title: "Kolofon",
      desc: "Kolofon adalah catatan tentang bagaimana sebuah buku dibuat. Ini adalah catatan itu untuk situs ini: alat yang digunakan, dan orang-orang yang menerangi jalan. Daftar ini jujur namun tidak lengkap — banyak pengembang lain yang membentuk situs ini yang tidak dapat saya sebutkan satu persatu.",
      built: "Cara Dibangun",
      framework: "Framework",
      frameworkDesc: "Astro 7 dengan React islands. Halaman statis dalam dua bahasa dengan hover prefetch.",
      styling: "Styling",
      stylingDesc: "Tailwind CSS dengan design tokens; Inter untuk UI, JetBrains Mono untuk kode dan label.",
      language: "Bahasa",
      languageDesc: "TypeScript di seluruh bagian, diperiksa secara strict.",
      backend: "Backend",
      backendDesc: "Situs statis dihosting di Vercel.",
      content: "Konten",
      contentDesc: "Halaman Markdown dan Astro, dengan RSS feed dan sitemap.",
      inspiration: "Inspirasi",
      inspirationDesc: "Banyak orang yang membentuk situs ini. Ini adalah beberapa di antaranya — serta masih banyak pengembang lain yang situsnya tidak dapat saya sebutkan lagi.",
      inspirationList: [
        { name: "Rafif Hardja", url: "https://rafifhardja.xyz" },
        { name: "Lee Robinson", url: "https://leerob.io" },
        { name: "Dan Abramov", url: "https://overreacted.io" },
        { name: "Guillermo Rauch", url: "https://rauchg.com" },
        { name: "Emil Kowalski", url: "https://emilkowal.ski" },
        { name: "Anthony Fu", url: "https://antfu.me" },
        { name: "Dominik Dorfmeister", url: "https://tkdodo.eu" },
        { name: "Rizzky", url: "https://rizzky.xyz" },
        { name: "Abdul Malik", url: "https://up2dul.dev" },
        { name: "Rizki Citra", url: "https://rimzzlabs.com" },
      ],
    },
    contact: {
      title: "Kontak",
      subtitle: "Hubungi saya atau kirim pesan secara langsung.",
      nameLabel: "Nama",
      emailLabel: "Email",
      messageLabel: "Pesan",
      sendButton: "Kirim Pesan",
      sendingButton: "Mengirim…",
      successMessage: "Terima kasih! Pesan Anda berhasil dikirim.",
      namePlaceholder: "Nama Anda",
      emailPlaceholder: "anda@email.com",
      messagePlaceholder: "Apa yang ingin Anda sampaikan?",
      captchaRequired: "Silakan selesaikan verifikasi terlebih dahulu.",
      verificationFailed: "Verifikasi gagal. Silakan coba lagi.",
    }
  }
};
