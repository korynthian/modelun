
let title = document.title;
if (title === "Welcome") { 
  title = "Lake Braddock Secondary School <br>Model United Nations"
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

const newHead = document.createElement('head');
newHead.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Lake Braddock SS Model UN</title>
    <link rel="stylesheet" href="/template.css">
    <link rel="stylesheet" href="/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <script src="/script.js"></script>
    <link rel="icon" href="/img/logo.ico">
`;
document.head.replaceWith(newHead);