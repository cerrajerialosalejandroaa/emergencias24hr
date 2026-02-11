(function(){
  const qs = (s, el=document)=>el.querySelector(s);
  const qsa = (s, el=document)=>Array.from(el.querySelectorAll(s));

  // Mobile menu (simple)
  const btnMenu = qs('#btnMenu');
  const menu = qs('#mobileMenu');
  if(btnMenu && menu){
    btnMenu.addEventListener('click', ()=>{
      const open = menu.getAttribute('data-open') === '1';
      menu.setAttribute('data-open', open ? '0' : '1');
      menu.style.display = open ? 'none' : 'block';
    });
  }

  // Gallery modal
  const modal = qs('#modal');
  const modalImg = qs('#modalImg');
  const close = qs('#modalClose');
  const openModal = (src, alt)=>{
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = ()=>{
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  if(close) close.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  qsa('[data-gallery="1"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      openModal(a.getAttribute('href'), a.getAttribute('data-alt') || '');
    });
  });

  // UTM passthrough for WhatsApp (optional)
  // Keeps landing tracking in the WhatsApp prefilled message.
  const params = new URLSearchParams(location.search);
  const utm = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content']
    .map(k=>params.get(k)?`${k}=${params.get(k)}`:null).filter(Boolean).join('&');
  if(utm){
    qsa('a[data-wa="1"]').forEach(a=>{
      const url = new URL(a.href);
      const text = url.searchParams.get('text') || '';
      url.searchParams.set('text', text + `\n\n(Referencia: ${utm})`);
      a.href = url.toString();
    });
  }
})();
