
let title = document.title;
if (title === "Welcome") { 
  title = "Lake Braddock Secondary School Model United Nations"
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const content = dropdown.querySelector('.dropdown-content');
    if (content) {
      dropdown.addEventListener('mouseenter', () => {
        content.style.display = 'block';
      });
      dropdown.addEventListener('mouseleave', () => {
        content.style.display = 'none';
      });
    }
  });
}

fetch("/template.txt")
  .then((res) => res.text())
  .then((text) => {
    const contentBox = document.getElementById("pageContent");
    const originalContent = contentBox ? contentBox.innerHTML : "<p>Hello! It seems the page you're attempting to visit is empty.</p>";
    document.body.innerHTML = text;
    const newContentBox = document.getElementById("pageContent");
    
    if (newContentBox) {
      let contentBoxNew = document.createElement("div");
      contentBoxNew.innerHTML = originalContent;
      contentBoxNew.id = "pageContent";
      newContentBox.replaceWith(contentBoxNew);
      document.getElementById("title").innerHTML = title;
      
      const topBar = document.getElementById('topBar');
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (topBar) topBar.classList.toggle('scrolled', window.scrollY > 100);
            if (window.location.href.includes("lb")) {
              const drops = ['drop1','drop2','drop3','drop4'];
              drops.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.toggle('scrolled', window.scrollY > 100);
              });
            }

            ticking = false;
          });
          ticking = true;
        }
      });

      let linksUrl;
      if (window.location.href.includes("conference")) {
        linksUrl = "/conference/links.txt";
      } else if (window.location.href.includes("/lb")) {
        linksUrl = "/lb/links.txt";
      } else {
        console.log("ERROR");
        linksUrl = null;
      }
      
      if (linksUrl) {
        fetch(linksUrl)
          .then((res) => res.text())
          .then((text) => {
            document.getElementById("links").innerHTML = text;
            initDropdowns();
          })
          .catch((e) => console.error(e));
      }
    }
      })
      .catch((e) => console.error(e));
      let tickingParallax = false;
      window.addEventListener('scroll', () => {
          if (!tickingParallax) {
              window.requestAnimationFrame(() => {
                  const parallaxBg = document.querySelector('.parallax-bg');
                  if (parallaxBg) {
                      let scrollPosition = window.scrollY;
                      parallaxBg.style.transform = `translate3d(0, ${scrollPosition * 0.6}px, 0)`;
                  }
                  tickingParallax = false;
              });
              tickingParallax = true;
          }
      });

const path = window.location.pathname.toLowerCase();
let metaDescription = 'Lake Braddock Secondary School Model UN — news, resources, and conference information.';
if (path.includes('/lb/') || path.endsWith('/index.html') || path === '/') {
  metaDescription = 'Lake Braddock Model UN: club resources, schedules, and event information for students at Lake Braddock Secondary School.';
} else if (path.includes('/lb/resources') || path.includes('/resources')) {
  metaDescription = 'Resources for Model UN: guides, presentations, and reference documents to help delegates prepare position papers and speeches.';
} else if (path.includes('/conference')) {
  metaDescription = 'Conference information: schedules, committees, location, and registration links for the Model UN conference.';
} else if (path.includes('/conference/delegates') || path.includes('delegates.html')) {
  metaDescription = 'Delegate information: rules, position paper guidance, and conference policies for delegates.';
} else if (path.includes('/lb/contact') || path.includes('contact.html')) {
  metaDescription = 'Contact the Lake Braddock Model UN secretariat for questions about the club or upcoming conferences.';
}

const newHead = document.createElement('head');
newHead.innerHTML = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V2K0JR4LDW"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-V2K0JR4LDW');
    </script>

    <meta name="description" content="${metaDescription}" />
    <meta name="keywords" content="education, leadership, united nations, diplomacy, public speaking, debate, position papers, conferences, model un, lake braddock secondary school, lbssmun, lbmun, lbmunc, mun conferences, model un conferences, mun conferences in northern virginia, model un conferences in northern virginia, model un conferences in va, model un conferences in virginia, model un conferences near me, model un conferences near northern virginia, model un conferences near va, model un conferences near virginia, mun is fun, model un resources, chair tools">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Lake Braddock Secondary School Model UN">
    <title>${title} - Lake Braddock SS Model UN</title>
    <link rel="stylesheet" href="/template.css">
    <link rel="stylesheet" href="/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght,wdth@6..144,1..1000,75..125&family=Oswald:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="/script.js"></script>
    <link rel="icon" href="/img/Logo.ico">
    <meta property="og:title" content="${title} - Lake Braddock Secondary School Model UN">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${window.location.href}">
    <meta property="og:image" content="https://lbssmun.com/img/logoShadow.svg">
    <meta property="og:site_name" content="Lake Braddock Secondary School Model UN">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title} - Lake Braddock Secondary School Model UN">
    <meta name="twitter:description" content="${metaDescription}">
    <meta name="twitter:image" content="https://lbssmun.com/img/logoShadow.svg">
    <meta name="twitter:site" content="FCPSLBSS">
    <link rel="canonical" href="${window.location.href}">
    <link rel="apple-touch-icon" sizes="180x180" href="/img/logo.ico">
`;
document.head.replaceWith(newHead);