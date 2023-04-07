const data = "https://script.google.com/macros/s/AKfycbzA65vZuGo4EnyNE_5bfwCkHVjhNeKmCzaeX18zB2Rcmu2W3r5nMQHqgUG3tzw4aGHZ/exec";
const socials = document.querySelector("#socials");
const svgs = document.querySelectorAll("svg");
const ul = document.querySelector("#boxes");
const pfp = document.querySelector("#pfp");
const titleName = document.querySelector("#name");
const bioText = document.querySelector("#bio");
const footer = document.querySelector("#footer");

fetch(data)
    .then((response) => response.json())
    .then((json) => {

        json.colors.forEach((color) => {
            document.documentElement.style.setProperty('--bg', color.background);
            document.documentElement.style.setProperty('--text', color['text-color']);
            document.documentElement.style.setProperty('--picBorder', color['pfp-border']);
            document.documentElement.style.setProperty('--nameColor', color['name-color']);
            document.documentElement.style.setProperty('--stroke', color['name-border']);
            document.documentElement.style.setProperty('--shadow', color['name-shadow']);
            document.documentElement.style.setProperty('--boxes', color['box-color']);
            document.documentElement.style.setProperty('--footer', color['footer-color']);
        })

        /* -------------- PFP/Title/Bio information --------------------------------------- */
        json.bio.forEach((bio) => {
            //image
            pfp.src = bio.imageURL;
            //title name
            const h = document.createElement("h1");
            h.classList.add("name");
            h.textContent = bio.title;
            titleName.appendChild(h);
            //bio text
            const p = document.createElement("p");
            p.textContent = bio.bio;
            bioText.appendChild(p);
            //footer
            footer.innerHTML = bio.footer
        })
        
        /* -------------- Social Bar --------------------------------------- */
        json.socials.forEach((social) => {
            if (social == "") {
                return;
            }
            let a = document.createElement("a");
            a.classList.add("icon1");
            a.href = social.link;
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");

            a.innerHTML = social.HTML
                ? social.HTML
                : `<img src="./icons/${social.social}.svg" alt="${social.social}" width="20" />`;
            socials.appendChild(a);
        });


        svgs.forEach((svg) => {
            svg.setAttribute("alt", social.icon);
        });

        /* -------------- Content Boxes --------------------------------------- */
        json.content.forEach((content) => {
            if (content.icon === "") {
                return;
            }
            let li = document.createElement("li");
            li.classList.add("box");

            let a = document.createElement("a");
            a.href = content.URL;
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");

            let div = document.createElement("div");
            div.classList.add("info");

            const icon = document.createElement("img");
            icon.classList.add("icon");
            icon.src = `./icons/${content.icon}.svg`;
            icon.alt = "inprnt";
            icon.width = "20";

            const title = document.createElement("h3");
            title.classList.add("title");
            title.textContent = content.title;

            const p = document.createElement("p");
            p.classList.add("p");
            p.textContent = content.description;

            div.appendChild(icon);
            div.appendChild(title);
            a.appendChild(div);
            a.appendChild(p);
            li.appendChild(a);

            ul.appendChild(li);
        });


    })
    .catch(error => { console.error('Error fetching data:', error); });