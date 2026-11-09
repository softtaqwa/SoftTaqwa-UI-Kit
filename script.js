const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const header = document.getElementById("header");
const backTop = document.getElementById("backTop");
const progress = document.getElementById("scrollProgress");

function setTheme(theme){
  root.setAttribute("data-theme", theme);
  localStorage.setItem("soft-taqwa-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}
const savedTheme = localStorage.getItem("soft-taqwa-theme");
setTheme(savedTheme || "dark");

themeToggle.addEventListener("click",()=>{
  setTheme(root.getAttribute("data-theme")==="dark" ? "light" : "dark");
});

menuBtn.addEventListener("click",()=>mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));

function onScroll(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY/max)*100 : 0}%`;
  header.classList.toggle("scrolled", window.scrollY > 20);
  backTop.classList.toggle("show", window.scrollY > 600);
}
window.addEventListener("scroll",onScroll,{passive:true});
backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a[href^='#']")];
const navObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href") === "#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>navObserver.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();
onScroll();
