window.zH=function(k,v){return '#'+(!k||k==='star'?'tz-'+v:'tz-'+k+'-'+v)};
(function(){
  document.documentElement.classList.add('js');
  var hd=document.getElementById('header');var hasHero=!!document.querySelector('.hero');var sc=function(){hd.classList.toggle('solid',!hasHero||window.scrollY>window.innerHeight*0.7)};sc();window.addEventListener('scroll',sc,{passive:true});
  var mm=document.getElementById('mobileMenu'),o=document.getElementById('menuOpen'),c=document.getElementById('menuClose');
  var mmT;function set(v){clearTimeout(mmT);if(v){mm.classList.add('ready');mm.getBoundingClientRect();}else{mmT=setTimeout(function(){mm.classList.remove('ready')},800)}mm.classList.toggle('open',v);mm.setAttribute('aria-hidden',!v);o.setAttribute('aria-expanded',v);document.body.style.overflow=v?'hidden':'';setTimeout(function(){(v?c:o).focus({preventScroll:true})},v?350:0);}
  addEventListener('keydown',function(e){if(e.key==='Escape'&&mm.classList.contains('open'))set(false)});
  var mmi=document.getElementById('mmImg');if(mmi)mm.querySelectorAll('.mm__nav a').forEach(function(a){var pre=new Image();pre.src=a.dataset.img;function sw(){if(mmi.getAttribute('src')===a.dataset.img)return;mmi.classList.add('fade');setTimeout(function(){mmi.src=a.dataset.img;mmi.classList.remove('fade')},180)}a.addEventListener('mouseenter',sw);a.addEventListener('focus',sw)});
  o.addEventListener('click',function(){set(true)});c.addEventListener('click',function(){set(false)});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
  var hv=document.getElementById('heroVid');
  if(hv){var tall=window.matchMedia('(max-aspect-ratio: 4/5)').matches;
    hv.poster=hv.dataset[tall?'tallPoster':'widePoster']; hv.src=hv.dataset[tall?'tall':'wide'];
    var pp=hv.play(); if(pp&&pp.catch)pp.catch(function(){});
    var tg=document.getElementById('heroToggle');
    var ic={pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>',play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z"/></svg>'};
    tg.addEventListener('click',function(){if(hv.paused){hv.play();tg.innerHTML=ic.pause;tg.setAttribute('aria-label','Pause video')}else{hv.pause();tg.innerHTML=ic.play;tg.setAttribute('aria-label','Play video')}});
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){hv.pause();tg.innerHTML=ic.play;}
  }
  // --- Iznik tile wall
  var tw=document.getElementById('tilewall'),tg2=document.getElementById('twGrid'),rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches,twTimer=null;
  function buildWall(){
    var ts=Math.round(Math.max(52,Math.min(86,window.innerWidth/15)));
    var cols=Math.ceil(tw.clientWidth/ts)+1,rows=Math.ceil(tw.clientHeight/ts)+1,cx=(cols-1)/2,cy=(rows-1)/2,out='';
    tg2.style.setProperty('--ts',ts+'px');tg2.style.setProperty('--cols',cols);
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var d=rm?0:Math.round(Math.hypot(c-cx,(r-cy)*1.15)*60);
      var pk=tg2.dataset.p;out+='<div class="tw" style="--d:'+d+'ms"><svg class="b"><use href="'+zH(pk,'b')+'"/></svg><svg class="r"><use href="'+zH(pk,'r')+'"/></svg></div>';}
    tg2.innerHTML=out;
  }
  if(tw){
    buildWall();
    var rw;window.addEventListener('resize',function(){clearTimeout(rw);rw=setTimeout(buildWall,250)});
    function shimmer(){var t=tg2.children;if(!t.length)return;for(var k=0;k<2;k++){t[Math.floor(Math.random()*t.length)].classList.toggle('flip')}}
    tg2.addEventListener('pointerover',function(e){var t=e.target.closest('.tw');if(t)t.classList.toggle('flip')});
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){tw.classList.add('built');if(!rm&&!twTimer)twTimer=setInterval(shimmer,420)}
        else if(twTimer){clearInterval(twTimer);twTimer=null}
      })},{threshold:.22}).observe(tw);
    } else tw.classList.add('built');
  }
  // --- tile bands drift with scroll
  var bands=document.querySelectorAll('.tiles'),tick=false;
  function drift(){var y=window.scrollY;bands.forEach(function(b,i){var off=(i%2?-1:1)*y*0.35,tr=b.firstElementChild;if(tr&&tr.classList.contains('tband')){var ts=+b.dataset.ts||46;tr.style.transform='translateX('+(((off%ts)+ts)%ts-ts)+'px)'}else b.style.backgroundPosition=off+'px 0'});tick=false}
  if(!rm){window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(drift)}},{passive:true});drift()}
  document.getElementById('yr').textContent=new Date().getFullYear();
  var nf=document.getElementById('newsForm');
  nf.addEventListener('submit',function(e){e.preventDefault();location.href='mailto:reservation@zahter.co.uk?subject=Newsletter%20sign-up&body='+encodeURIComponent('Please add me to the Zahter newsletter: '+nf.email.value);});
  var rv=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
    rv.forEach(function(r){io.observe(r)});
    setTimeout(function(){rv.forEach(function(r){r.classList.add('in')})},4000);
  } else rv.forEach(function(r){r.classList.add('in')});
  var vids=document.querySelectorAll('video[data-autoplay]');
  if('IntersectionObserver' in window){
    var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause();})},{threshold:.3});
    vids.forEach(function(v){vo.observe(v)});
  }
})();

(function(){
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MAIL='reservation@zahter.co.uk';
  function mailto(subject,lines){location.href='mailto:'+MAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));}

  // ---- tile intro (homepage, once per visit)
  var hero=document.querySelector('.hero'),seen=false;
  try{seen=sessionStorage.getItem('zIntro')==='1'}catch(e){}
  if(hero&&!seen&&!rm){
    try{sessionStorage.setItem('zIntro','1')}catch(e){}
    var ov=document.createElement('div');ov.className='intro';ov.setAttribute('aria-hidden','true');
    var ts=Math.round(Math.max(52,Math.min(92,innerWidth/13))),cols=Math.ceil(innerWidth/ts)+1,rows=Math.ceil(innerHeight/ts)+1,cx=(cols-1)/2,cy=(rows-1)/2,g='',mx=0;
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var d=Math.round(Math.hypot(c-cx,(r-cy)*1.15)*42);mx=Math.max(mx,d);g+='<div class="it" style="--d:'+d+'ms"><svg><use href="#'+((r+c)%5?'tz-b':'tz-r')+'"/></svg></div>';}
    ov.innerHTML='<div class="intro__grid" style="--ts:'+ts+'px;--cols:'+cols+'">'+g+'</div><div class="intro__seal"><svg><use href="#seal"/></svg></div>';
    document.body.appendChild(ov);
    setTimeout(function(){ov.classList.add('go')},650);
    setTimeout(function(){ov.remove()},650+mx+900);
  }

  // ---- sticky mobile book bar
  var bb=document.getElementById('bookbar');
  if(bb){bb.classList.add('show');}

  // ---- hover dish photos
  var items=document.querySelectorAll('.mi[data-img]');
  if(items.length){
    var hi=document.createElement('div');hi.className='hoverimg';hi.setAttribute('aria-hidden','true');document.body.appendChild(hi);
    var fine=window.matchMedia('(hover: hover) and (pointer: fine)').matches,hideT;
    items.forEach(function(it){
      var pre=new Image();pre.src=it.dataset.img;
      if(fine){
        it.addEventListener('mouseenter',function(){hi.style.backgroundImage='url('+it.dataset.img+')';hi.classList.add('on')});
        it.addEventListener('mousemove',function(e){hi.classList.toggle('left',e.clientX>innerWidth-300);hi.style.left=e.clientX+'px';hi.style.top=Math.max(160,Math.min(innerHeight-160,e.clientY))+'px'});
        it.addEventListener('mouseleave',function(){hi.classList.remove('on')});
      } else {
        it.addEventListener('click',function(e){var b=it.getBoundingClientRect();hi.style.backgroundImage='url('+it.dataset.img+')';hi.classList.remove('left');hi.style.left=Math.min(b.left+40,innerWidth-270)+'px';hi.style.top=Math.max(160,b.top)+'px';hi.classList.add('on');clearTimeout(hideT);hideT=setTimeout(function(){hi.classList.remove('on')},1800)});
        addEventListener('scroll',function(){hi.classList.remove('on')},{passive:true});
      }
    });
  }

  // ---- menu tabs
  var panels=[].slice.call(document.querySelectorAll('.mpanel'));
  if(panels.length){
    var tabs=[].slice.call(document.querySelectorAll('.mtab')),bar=document.querySelector('.mtabs');
    var alias={'sharing-55':'sharing','sharing-60':'sharing','drinks':'wine','bar':'wine','pretheatre':'pre-theatre','set':'sharing'};
    function pick(id,scroll){
      id=alias[id]||id; if(!panels.some(function(p){return p.id===id}))id=panels[0].id;
      panels.forEach(function(p){p.classList.toggle('on',p.id===id)});
      tabs.forEach(function(t){var on=t.dataset.tab===id;t.classList.toggle('on',on);t.setAttribute('aria-selected',on);if(on&&t.scrollIntoView&&t.parentNode.scrollWidth>t.parentNode.clientWidth)t.parentNode.scrollTo({left:t.offsetLeft-24,behavior:'smooth'})});
      if(scroll){var y=document.querySelector('.mpanels').getBoundingClientRect().top+scrollY-document.getElementById('header').offsetHeight-4-bar.offsetHeight;if(Math.abs(scrollY-y)>4&&scrollY>y-1||scroll==='force')scrollTo({top:y,behavior:rm?'auto':'smooth'})}
      panels.forEach(function(p){if(p.id===id)p.querySelectorAll('.reveal').forEach(function(r){r.classList.add('in')})});
    }
    document.addEventListener('click',function(ev){var a=ev.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href').slice(1);
      var tgt=alias[id]||id;if(!panels.some(function(p){return p.id===tgt}))return;ev.preventDefault();
      pick(tgt,a.classList.contains('mtab')?true:'force');try{history.replaceState(null,'','#'+tgt)}catch(e){}});
    pick(location.hash.slice(1),false);
    if(location.hash&&location.hash.length>1)setTimeout(function(){pick(location.hash.slice(1),'force')},60);
    addEventListener('hashchange',function(){pick(location.hash.slice(1),'force')});
  }

  // ---- gallery filters + lightbox
  var gal=document.getElementById('gal');
  if(gal){
    var figs=[].slice.call(gal.querySelectorAll('figure'));
    document.querySelectorAll('[data-filter]').forEach(function(b){b.addEventListener('click',function(){
      document.querySelectorAll('[data-filter]').forEach(function(x){x.classList.toggle('on',x===b)});
      var f=b.dataset.filter;figs.forEach(function(fg){fg.classList.toggle('hide',f!=='all'&&fg.dataset.cat!==f)});
    })});
    var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
    lb.innerHTML='<button class="x" aria-label="Close">✕</button><button class="pv" aria-label="Previous">←</button><img alt=""><p></p><button class="nx" aria-label="Next">→</button>';
    document.body.appendChild(lb);var cur=0,lim=lb.querySelector('img'),lcap=lb.querySelector('p');
    function vis(){return figs.filter(function(f){return !f.classList.contains('hide')})}
    function show(i){var v=vis();cur=(i+v.length)%v.length;var f=v[cur],im=f.querySelector('img');lim.src=im.dataset.full||im.src;lim.alt=im.alt;lcap.textContent=f.querySelector('figcaption')?f.querySelector('figcaption').textContent:'';}
    figs.forEach(function(f){f.tabIndex=0;f.addEventListener('click',function(){show(vis().indexOf(f));lb.classList.add('open');document.body.style.overflow='hidden'});f.addEventListener('keydown',function(e){if(e.key==='Enter')f.click()})});
    function close(){lb.classList.remove('open');document.body.style.overflow=''}
    lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){show(cur-1)};lb.querySelector('.nx').onclick=function(){show(cur+1)};
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
  }

  // ---- private dining enquiry
  var pd=document.getElementById('pdForm');
  if(pd)pd.addEventListener('submit',function(e){e.preventDefault();var f=pd.elements;
    mailto('Private dining enquiry — '+(f.date.value||'date TBC'),['Name: '+f.name.value,'Email: '+f.email.value,'Phone: '+f.phone.value,'Date: '+f.date.value,'Guests: '+f.guests.value,'Occasion: '+f.occasion.value,'Time of day: '+f.slot.value,'','Notes:',f.notes.value]);});

  // ---- gift cards
  var gA=document.getElementById('giftAmt'),gC=document.getElementById('giftCustom'),amt='£100';
  document.querySelectorAll('.amounts button').forEach(function(b){b.addEventListener('click',function(){
    document.querySelectorAll('.amounts button').forEach(function(x){x.classList.toggle('on',x===b)});
    amt=b.dataset.amt;if(gA)gA.textContent=amt;if(gC){gC.value='';}
  })});
  if(gC)gC.addEventListener('input',function(){var v=gC.value.replace(/[^0-9]/g,'');if(v){amt='£'+v;gA.textContent=amt;document.querySelectorAll('.amounts button').forEach(function(x){x.classList.remove('on')})}});
  var gf=document.getElementById('giftForm');
  if(gf)gf.addEventListener('submit',function(e){e.preventDefault();var f=gf.elements;
    mailto('Gift card order — '+amt,['Gift card value: '+amt,'For: '+f.to.value,'From: '+f.from.value,'Your email: '+f.email.value,'Message for the card: '+f.msg.value]);});
  var nf2=document.getElementById('notifyForm');
  if(nf2)nf2.addEventListener('submit',function(e){e.preventDefault();mailto('Zahter pantry — notify me',['Please let me know when the Zahter pantry launches.','Email: '+nf2.elements.email.value]);});
})();
(function(){
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // parallax full-bleed photos
  var bl=[].slice.call(document.querySelectorAll('.bleed img'));
  if(bl.length&&!rm){var tk=false;function px(){bl.forEach(function(im){var r=im.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;var p=(r.top+r.height/2-innerHeight/2)/innerHeight;im.style.transform='translateY('+(p*-9)+'%)'});tk=false}
    addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(px)}},{passive:true});px();}
  // rotating press quotes
  var st=document.querySelector('.quotes__stage');
  if(st){var qs=st.querySelectorAll('.qt'),dots=document.querySelectorAll('.quotes__dots button'),i=0,t;
    function go(n){i=(n+qs.length)%qs.length;qs.forEach(function(q,k){q.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('on',k===i)})}
    function auto(){clearInterval(t);if(!rm)t=setInterval(function(){go(i+1)},5500)}
    dots.forEach(function(d,k){d.addEventListener('click',function(){go(k);auto()})});
    st.addEventListener('mouseenter',function(){clearInterval(t)});st.addEventListener('mouseleave',auto);auto();}
})();

/* ===== More tile magic ===== */
(function(){
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T=function(k){return '<svg class="b"><use href="'+zH(k,'b')+'"/></svg><svg class="r"><use href="'+zH(k,'r')+'"/></svg>'};
  var PATS=['q','t','o','l','s'];
  var io=('IntersectionObserver' in window);

  // 1. Living tile bands: real tiles that flip on hover and ripple along the band
  var bands=[].slice.call(document.querySelectorAll('.tiles'));
  bands.forEach(function(b){
    if(rm)return;
    function build(){
      var ts=b.clientHeight||46;b.dataset.ts=ts;var n=Math.ceil(b.clientWidth/ts)+2,h='';
      var pk=b.dataset.p||'star';for(var i=0;i<n;i++)h+='<i class="tb" style="--i:'+i+'">'+T(pk)+'</i>';
      b.innerHTML='<div class="tband" style="--ts:'+ts+'px">'+h+'</div>';b.classList.add('live');
    }
    build();var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(build,250)});
    b.addEventListener('pointerover',function(e){var t=e.target.closest('.tb');if(!t||t._busy)return;t._busy=1;t.classList.add('flip');setTimeout(function(){t.classList.remove('flip');t._busy=0},1400)});
    var vis=false,timer;
    function wave(){if(!vis)return;var ts=[].slice.call(b.querySelectorAll('.tb')),dir=Math.random()<.5;
      ts.forEach(function(t,i){var k=dir?i:ts.length-1-i;setTimeout(function(){t.classList.add('flip');setTimeout(function(){t.classList.remove('flip')},700)},k*45)});
      timer=setTimeout(wave,5200+ts.length*45)}
    if(io)new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;clearTimeout(timer);if(vis)timer=setTimeout(wave,500)})}).observe(b);
    // nudge the drift once built
    window.dispatchEvent(new Event('scroll'));
  });

  // 1b. Tile panels: an arched Iznik wall panel made of live tiles
  [].slice.call(document.querySelectorAll('.tilepanel')).forEach(function(tp){
    var pk=tp.dataset.p||'star';
    function build(){var w=tp.clientWidth,ts=Math.max(40,Math.round(w/7)),cols=Math.ceil(w/ts),rows=Math.ceil(tp.clientHeight/ts),h='';
      for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var red=(r+c)%2===1;
        h+='<i class="tp" style="--d:'+((r+c)*60)+'ms"><svg class="b"><use href="'+zH(pk,red?'r':'b')+'"/></svg><svg class="r"><use href="'+zH(pk,red?'b':'r')+'"/></svg></i>';}
      tp.style.setProperty('--ts',ts+'px');tp.style.setProperty('--cols',cols);tp.innerHTML='<div class="tp__grid">'+h+'</div>';}
    build();var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(build,250)});
    if(rm)return;
    tp.addEventListener('pointerover',function(e){var t=e.target.closest('.tp');if(t)t.classList.toggle('flip')});
    var tmr=null;
    if(io)new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){tp.classList.add('in');if(!tmr)tmr=setInterval(function(){var ts=tp.querySelectorAll('.tp');if(ts.length)ts[Math.floor(Math.random()*ts.length)].classList.toggle('flip')},650)}
      else if(tmr){clearInterval(tmr);tmr=null}})},{threshold:.2}).observe(tp);
    else tp.classList.add('in');
  });

  // 2. Mosaic photo reveals: photos arrive under a sheet of tiles that flip away
  if(!rm&&io){
    var pics=[].slice.call(document.querySelectorAll('.photoarch figure,.sb__img,.tribute__photo,.bleed'));
    var mo=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;mo.unobserve(e.target);var m=e.target.querySelector('.mosaic');if(!m)return;
      requestAnimationFrame(function(){m.classList.add('go')});setTimeout(function(){m.remove()},+m.dataset.dur+900)})},{threshold:.28});
    var pageOff=(location.pathname.length)%PATS.length;
    pics.forEach(function(el,pi){var pk=PATS[(pi+pageOff)%PATS.length];
      var r=el.getBoundingClientRect();if(!r.width||!r.height)return;
      var ts=Math.max(44,Math.min(90,r.width/6)),cols=Math.ceil(r.width/ts),rows=Math.ceil(r.height/ts),h='',mx=0,red=Math.random()<.5;
      var ox=Math.random()<.5?0:cols-1;
      for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){var d=Math.round((Math.abs(x-ox)+y)*55+Math.random()*60);mx=Math.max(mx,d);
        h+='<i style="--d:'+d+'ms"><svg><use href="'+zH(pk,((x+y)%4===0)!==red?'r':'b')+'"/></svg></i>';}
      var m=document.createElement('div');m.className='mosaic';m.setAttribute('aria-hidden','true');m.dataset.dur=mx;
      m.style.cssText='--cols:'+cols+';--ts:'+ts+'px';m.innerHTML=h;el.appendChild(m);mo.observe(el);
    });
  }

  // 3. Tile wall: tap or click to send a ripple of colour across the wall
  var wall=document.getElementById('tilewall'),grid=document.getElementById('twGrid');
  var WALL=['star','o','t','q','l','s'],wallP=0;
  if(wall&&grid&&!rm){
    wall.addEventListener('click',function(e){if(e.target.closest('.tw-card'))return;
      var ts=[].slice.call(grid.children);if(!ts.length)return;
      wallP=(wallP+1)%WALL.length;var pk=WALL[wallP];
      ts.forEach(function(t){var r=t.getBoundingClientRect(),dx=r.left+r.width/2-e.clientX,dy=r.top+r.height/2-e.clientY,d=Math.sqrt(dx*dx+dy*dy);
        setTimeout(function(){t.classList.add('turn');setTimeout(function(){var u=t.querySelectorAll('use');u[0].setAttribute('href',zH(pk,'b'));u[1].setAttribute('href',zH(pk,'r'));t.classList.remove('turn')},230)},d*1.1)});
      grid.dataset.p=pk;
    });
    wall.classList.add('tappable');
  }

  // 4. Tile page transitions: tiles sweep in from where you click, and flip away on the next page
  document.documentElement.classList.remove('wiping');
  if(rm)return;
  var DEST={'index':'star','menu':'t','story':'l','private-dining':'o','gallery':'s','gift-cards':'q'};
  function pageKey(h){h=h.split('#')[0].replace(/^(\.\.?\/)+/,'').replace(/\.html$/,'').replace(/\/$/,'');return h===''?'index':h}
  function grid2(cls,ox,oy,pk){
    var ts=Math.round(Math.max(64,Math.min(120,innerWidth/9))),cols=Math.ceil(innerWidth/ts),rows=Math.ceil(innerHeight/ts),h='',mx=0;
    for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var d=Math.round(Math.hypot(c*ts+ts/2-ox,r*ts+ts/2-oy)/ts*38);mx=Math.max(mx,d);
      h+='<i style="--d:'+d+'ms"><svg><use href="'+zH(pk,(r+c)%5?'b':'r')+'"/></svg></i>';}
    var w=document.createElement('div');w.className='wipe '+cls;w.setAttribute('aria-hidden','true');
    w.innerHTML='<div class="wipe__grid" style="--ts:'+ts+'px;--cols:'+cols+'">'+h+'</div>';document.body.appendChild(w);return {el:w,dur:mx};
  }
  var arrive=null;try{arrive=sessionStorage.getItem('zWipe');sessionStorage.removeItem('zWipe')}catch(e){}
  if(arrive){
    var pt=arrive.split(','),g=grid2('out',+pt[0]*innerWidth,+pt[1]*innerHeight,pt[2]);
    document.documentElement.classList.remove('wiping');
    requestAnimationFrame(function(){requestAnimationFrame(function(){g.el.classList.add('go')})});
    setTimeout(function(){g.el.remove()},g.dur+800);
  }
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
    var href=a.getAttribute('href');if(!href||/^(#|[a-z]+:|\/\/)/i.test(href))return;
    var key=pageKey(href);if(!(key in DEST))return;
    var me=document.querySelector('meta[name=zpage]'),here=me?me.content:'';if(key===here||href.split('#')[0]==='./'||href.split('#')[0]==='')return;
    e.preventDefault();
    var pk=DEST[key]||'star';var g=grid2('in',e.clientX||innerWidth/2,e.clientY||innerHeight/2,pk);
    try{sessionStorage.setItem('zWipe',(1-(e.clientX||0)/innerWidth).toFixed(3)+','+(1-(e.clientY||0)/innerHeight).toFixed(3)+','+pk);sessionStorage.setItem('zIntro','1')}catch(x){}
    requestAnimationFrame(function(){requestAnimationFrame(function(){g.el.classList.add('go')})});
    setTimeout(function(){location.href=href},Math.min(g.dur+420,1100));
  });
  addEventListener('pageshow',function(e){if(e.persisted)document.querySelectorAll('.wipe').forEach(function(w){w.remove()})});
})();
