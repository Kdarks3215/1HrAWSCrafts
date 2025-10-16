// Utility: format date
function formatDateUTC(date){
  const opts = {year:'numeric', month:'short', day:'numeric'};
  return date.toLocaleDateString(undefined, opts);
}

// Countdown: next project every 3 days starting today (local midnight)
function getNextProjectDate(now=new Date()){
  const base = new Date();
  base.setHours(0,0,0,0);
  const periodMs = 3*24*60*60*1000;
  const n = Math.ceil((now - base)/periodMs);
  const next = new Date(base.getTime() + Math.max(0,n)*periodMs);
  return next;
}

function startCountdown(){
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  const nextEl = document.getElementById("nextProjectDate");
  if(!nextEl) return;
  function tick(){
    const now = new Date();
    const next = getNextProjectDate(now);
    nextEl.textContent = formatDateUTC(next);
    let diff = next - now;
    if(diff < 0) diff = 0;
    if(daysEl && hoursEl && minsEl && secsEl){
      const d = Math.floor(diff / (24*60*60*1000));
      const h = Math.floor((diff % (24*60*60*1000)) / (60*60*1000));
      const m = Math.floor((diff % (60*60*1000)) / (60*1000));
      const s = Math.floor((diff % (60*1000)) / 1000);
      daysEl.textContent = d;
      hoursEl.textContent = String(h).padStart(2,'0');
      minsEl.textContent = String(m).padStart(2,'0');
      secsEl.textContent = String(s).padStart(2,'0');
    }
  }
  tick();
  setInterval(tick, 1000);
}

// Mobile nav toggle
function setupNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click',()=>{
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll for same-page links
function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
      }
    });
  });
}

// Back to top
function setupBackToTop(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;
  window.addEventListener('scroll',()=>{
    if(window.scrollY > 300) btn.classList.add('show'); else btn.classList.remove('show');
  });
  btn.addEventListener('click',()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// Projects filters
function setupProjectFilters(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return; // only on projects page
  const chipButtons = Array.from(document.querySelectorAll('.service-chips .chip'));
  const levelSel = document.getElementById('levelFilter');
  const statusSel = document.getElementById('statusFilter');
  const clearBtn = document.getElementById('clearFilters');

  const activeServices = new Set();

  function apply(){
    const level = levelSel ? levelSel.value : 'all';
    const status = statusSel ? statusSel.value : 'all';
    const cards = Array.from(grid.querySelectorAll('.project'));
    cards.forEach(card=>{
      const services = (card.getAttribute('data-services')||'').split(/\s+/);
      const cardLevel = card.getAttribute('data-level');
      const cardStatus = card.getAttribute('data-status');

      const serviceOk = activeServices.size === 0 || [...activeServices].every(s => services.includes(s));
      const levelOk = level === 'all' || cardLevel === level;
      const statusOk = status === 'all' || cardStatus === status;
      const show = serviceOk && levelOk && statusOk;
      card.style.display = show ? '' : 'none';
    });
  }

  chipButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      const svc = btn.getAttribute('data-service');
      if(btn.classList.toggle('active')) activeServices.add(svc); else activeServices.delete(svc);
      apply();
    });
  });
  [levelSel, statusSel].forEach(sel=> sel && sel.addEventListener('change', apply));
  clearBtn && clearBtn.addEventListener('click',()=>{
    activeServices.clear();
    chipButtons.forEach(b=> b.classList.remove('active'));
    if(levelSel) levelSel.value='all';
    if(statusSel) statusSel.value='all';
    apply();
  });
}

// Footer year
function setYear(){
  const y = document.getElementById('year');
  if(y) y.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', ()=>{
  setupNav();
  setupSmoothScroll();
  setupBackToTop();
  startCountdown();
  setupProjectFilters();
  setYear();
});



