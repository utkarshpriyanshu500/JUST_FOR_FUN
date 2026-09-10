// =========================================================
// ADITYA RAY'S BIRTHDAY BASH - APPLICATION LOGIC
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const data = window.ADITYA_DATA;
  if (!data) {
    console.error("ADITYA_DATA not found!");
    return;
  }

  // State
  let activeFriendId = "utkarsh";
  let candlesBlown = [false, false, false, false];
  let cakeIsCut = false;
  let currentQuizIndex = 0;
  let quizScore = 0;

  // -------------------------------------------------------
  // 1. RENDER WANTED POSTER
  // -------------------------------------------------------
  function initWantedPoster() {
    const poster = data.wanted;
    const nameEl = document.getElementById('wanted-name');
    const crimeEl = document.getElementById('wanted-crime');
    const noticeEl = document.getElementById('wanted-notice');
    const phoneCallBtn = document.getElementById('hotline-call-btn');
    const waAlertBtn = document.getElementById('hotline-wa-btn');
    const mugshotImg = document.getElementById('mugshot-img');

    if (nameEl) nameEl.textContent = poster.name;
    if (crimeEl) crimeEl.textContent = poster.crime;
    if (noticeEl) noticeEl.textContent = poster.contactNotice;

    // Contact Links
    if (phoneCallBtn) {
      phoneCallBtn.href = `tel:${poster.phone}`;
      phoneCallBtn.setAttribute('title', `Call hotline ${poster.phone}`);
    }

    if (waAlertBtn) {
      const waMsg = encodeURIComponent(`🚨 BOUNTY ALERT: I spotted ${poster.name}! Where is my Birthday Party invite?!`);
      waAlertBtn.href = `https://wa.me/91${poster.phone}?text=${waMsg}`;
      waAlertBtn.setAttribute('target', '_blank');
    }

    // 5-Second Slideshow between Mugshot 1 & Mugshot 2
    const slide1 = document.getElementById('mugshot-slide-1');
    const slide2 = document.getElementById('mugshot-slide-2');
    const dot1 = document.getElementById('slide-dot-1');
    const dot2 = document.getElementById('slide-dot-2');
    const badge = document.getElementById('mugshot-badge');

    if (slide1 && slide2) {
      let isSlideOne = true;
      setInterval(() => {
        if (isSlideOne) {
          // Switch to Slide 2 (Cat Meme)
          slide1.classList.remove('opacity-100');
          slide1.classList.add('opacity-0');
          slide2.classList.remove('opacity-0');
          slide2.classList.add('opacity-100');

          if (dot1) dot1.className = 'w-2.5 h-2.5 rounded-full bg-stone-600/80 shadow-md transition-all';
          if (dot2) dot2.className = 'w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md transition-all scale-125';
          if (badge) badge.textContent = '#DOSSIER-2 (CAT MEME)';
          isSlideOne = false;
        } else {
          // Switch to Slide 1 (Wanted Peace Sign)
          slide2.classList.remove('opacity-100');
          slide2.classList.add('opacity-0');
          slide1.classList.remove('opacity-0');
          slide1.classList.add('opacity-100');

          if (dot1) dot1.className = 'w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md transition-all scale-125';
          if (dot2) dot2.className = 'w-2.5 h-2.5 rounded-full bg-stone-600/80 shadow-md transition-all';
          if (badge) badge.textContent = '#DOSSIER-1 (WANTED)';
          isSlideOne = true;
        }
      }, 5000);
    }

    // Play bounty stinger when clicking Wanted banner
    const bountyHeader = document.getElementById('wanted-header-banner');
    if (bountyHeader) {
      bountyHeader.addEventListener('click', () => {
        if (window.birthdayAudio) window.birthdayAudio.playWesternStinger();
      });
    }
  }

  // -------------------------------------------------------
  // 2. RENDER THE 3 FRIENDS TABS (Utkarsh, Satuder, Yatika)
  // -------------------------------------------------------
  function initFriendsTabs() {
    const tabButtonsContainer = document.getElementById('friend-tab-buttons');
    const tabContentContainer = document.getElementById('friend-tab-content');
    if (!tabButtonsContainer || !tabContentContainer) return;

    tabButtonsContainer.innerHTML = '';

    data.friends.forEach(friend => {
      const btn = document.createElement('button');
      btn.className = `friend-tab-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base ${
        friend.id === activeFriendId 
          ? 'bg-amber-400 text-stone-950 shadow-lg scale-105 ring-2 ring-amber-300' 
          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
      }`;
      btn.dataset.friendId = friend.id;
      btn.innerHTML = `
        <span class="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-black/30">${friend.badge}</span>
        <span>${friend.name}</span>
      `;

      btn.addEventListener('click', () => {
        activeFriendId = friend.id;
        renderActiveFriendTab();
        updateTabButtonStyles();
        if (window.birthdayAudio) window.birthdayAudio.playTone(480, 'triangle', 0.1, 0.15);
      });

      tabButtonsContainer.appendChild(btn);
    });

    renderActiveFriendTab();
  }

  function updateTabButtonStyles() {
    const buttons = document.querySelectorAll('.friend-tab-btn');
    buttons.forEach(btn => {
      const isSelected = btn.dataset.friendId === activeFriendId;
      if (isSelected) {
        btn.className = 'friend-tab-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base bg-amber-400 text-stone-950 shadow-lg scale-105 ring-2 ring-amber-300';
      } else {
        btn.className = 'friend-tab-btn px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white';
      }
    });
  }

  function renderActiveFriendTab() {
    const friend = data.friends.find(f => f.id === activeFriendId);
    const container = document.getElementById('friend-tab-content');
    if (!friend || !container) return;

    let html = `
      <!-- Birthday Wish Card -->
      <div class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl mb-12 overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-700/60 pb-5">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${friend.themeColor} flex items-center justify-center text-white text-2xl font-bold shadow-md">
              ${friend.name.charAt(0)}
            </div>
            <div>
              <div class="text-xs uppercase tracking-widest text-amber-400 font-bold">${friend.badge} • ${friend.role}</div>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${friend.name}'s Birthday Tribute</h3>
            </div>
          </div>
          <span class="px-3 py-1 text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 rounded-full">
            VIP Squad Member
          </span>
        </div>

        <div class="space-y-4">
          <h4 class="text-xl sm:text-2xl font-bold text-amber-300">${friend.birthdayWish.headline}</h4>
          <p class="text-slate-200 text-base sm:text-lg leading-relaxed">${friend.birthdayWish.message}</p>
          <div class="p-4 bg-slate-800/60 border-l-4 border-amber-400 rounded-r-xl italic text-slate-300 font-serif">
            ${friend.birthdayWish.quote}
          </div>
        </div>
      </div>
    `;

    // Photo Gallery Section
    html += `
      <div class="mb-14">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>📸 ${friend.name} & Aditya's Memory Wall</span>
            </h3>
            <p class="text-slate-400 text-sm mt-1">
              Tap any Polaroid to flip and read the secret dossier story on the back!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${friend.photos.map((photo, pIdx) => {
            const storedPhoto = localStorage.getItem(`photo_${photo.id}`);
            const imgSrc = storedPhoto || photo.src;
            const rotations = ['-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-1'];
            const rotClass = rotations[pIdx % rotations.length];

            return `
              <div class="flip-card cursor-pointer group" onclick="toggleFlipCard(this)">
                <div class="flip-card-inner relative w-full h-[380px] transition-transform duration-500">
                  <!-- Front Side (Polaroid) -->
                  <div class="flip-card-front absolute inset-0 polaroid-card ${rotClass} flex flex-col justify-between">
                    <div class="washi-tape"></div>
                    <div class="relative w-full h-[250px] bg-slate-100 rounded overflow-hidden flex items-center justify-center border border-slate-200">
                      <img 
                        id="img-${photo.id}" 
                        src="${imgSrc}" 
                        alt="${photo.caption}" 
                        class="w-full h-full object-cover"
                        onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=80';"
                      />
                    </div>
                    <div class="pt-3 text-center">
                      <div class="font-handwritten text-2xl text-stone-800 font-bold leading-tight">${photo.caption}</div>
                      <div class="text-[11px] text-stone-400 uppercase tracking-widest mt-1">${photo.date} • Tap to Flip</div>
                    </div>
                  </div>

                  <!-- Back Side (Story / Note) -->
                  <div class="flip-card-back absolute inset-0 bg-stone-900 border-2 border-amber-400/50 rounded-2xl p-6 flex flex-col justify-between shadow-2xl text-left">
                    <div>
                      <div class="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                        <span class="text-xs uppercase font-bold text-amber-400 tracking-wider">Memory Dossier</span>
                        <span class="text-xs text-stone-400">${photo.date}</span>
                      </div>
                      <h5 class="text-lg font-bold text-amber-200 mb-2">${photo.caption}</h5>
                      <p class="text-stone-300 text-sm leading-relaxed font-serif">${photo.note}</p>
                    </div>
                    <div class="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-amber-400/80">
                      <span>Recorded by ${friend.name}</span>
                      <span>Tap to flip back</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // Flip card helper
  window.toggleFlipCard = function(el) {
    el.classList.toggle('flipped');
    if (window.birthdayAudio) window.birthdayAudio.playTone(380, 'sine', 0.08, 0.1);
  };

  // Photo upload trigger
  window.triggerPhotoUpload = function(photoId) {
    const input = document.getElementById('generic-photo-input');
    if (!input) return;
    input.dataset.targetId = photoId;
    input.click();
  };

  // Generic photo input listener
  const genericInput = document.getElementById('generic-photo-input');
  if (genericInput) {
    genericInput.addEventListener('change', (e) => {
      const targetId = genericInput.dataset.targetId;
      const file = e.target.files[0];
      if (file && targetId) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const b64 = evt.target.result;
          localStorage.setItem(`photo_${targetId}`, b64);
          const img = document.getElementById(`img-${targetId}`);
          if (img) img.src = b64;
          fireConfetti();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // -------------------------------------------------------
  // 3. INTERACTIVE BIRTHDAY CAKE & CANDLES
  // -------------------------------------------------------
  function initCakeAndCandles() {
    const candles = document.querySelectorAll('.candle-item');
    const blowAllBtn = document.getElementById('blow-all-btn');
    const cutCakeBtn = document.getElementById('cut-cake-btn');
    const cakeMessage = document.getElementById('cake-wish-message');

    candles.forEach((candle, idx) => {
      candle.addEventListener('click', () => {
        extinguishCandle(idx);
      });
    });

    if (blowAllBtn) {
      blowAllBtn.addEventListener('click', () => {
        candles.forEach((_, idx) => extinguishCandle(idx));
      });
    }

    if (cutCakeBtn) {
      cutCakeBtn.addEventListener('click', () => {
        sliceTheCake();
      });
    }
  }

  function extinguishCandle(index) {
    const flame = document.getElementById(`candle-flame-${index}`);
    const candleEl = document.getElementById(`candle-${index}`);
    if (!flame || candlesBlown[index]) return;

    candlesBlown[index] = true;
    flame.classList.add('hidden');

    // Add smoke puff animation
    if (candleEl) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-puff';
      candleEl.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1200);
    }

    if (window.birthdayAudio) window.birthdayAudio.playBlowCandle();

    // Check if all are blown out!
    if (candlesBlown.every(b => b === true)) {
      triggerWishCeremony();
    }
  }

  function triggerWishCeremony() {
    const cakeMessage = document.getElementById('cake-wish-message');
    const cutBtn = document.getElementById('cut-cake-btn');

    if (cakeMessage) {
      cakeMessage.classList.remove('hidden');
      cakeMessage.classList.add('animate-bounce');
    }
    if (cutBtn) {
      cutBtn.classList.remove('opacity-50', 'pointer-events-none');
    }

    if (window.birthdayAudio) {
      window.birthdayAudio.playCheer();
    }
    fireConfetti();
  }

  function sliceTheCake() {
    if (cakeIsCut) return;
    cakeIsCut = true;

    if (window.birthdayAudio) {
      window.birthdayAudio.playKnifeCut();
      setTimeout(() => window.birthdayAudio.playCheer(), 300);
    }

    const cakeLayer = document.getElementById('cake-top-tier');
    if (cakeLayer) {
      cakeLayer.classList.add('scale-105', 'ring-4', 'ring-amber-400');
    }

    const modal = document.getElementById('cake-celebration-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      fireConfetti();
    }
  }

  window.closeCakeModal = function() {
    const modal = document.getElementById('cake-celebration-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  // -------------------------------------------------------
  // 4. SCRATCH CARD (CLASSIFIED FACT)
  // -------------------------------------------------------
  function initScratchCards() {
    const container = document.getElementById('scratch-cards-container');
    if (!container || !data.scratchCards) return;

    container.innerHTML = '';
    data.scratchCards.forEach((card, idx) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center max-w-lg w-full';
      wrapper.innerHTML = `
        <div class="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">Classified Squad Secret</div>
        <h4 class="text-xl sm:text-2xl font-extrabold text-white mb-4">${card.title}</h4>
        <div class="relative w-full h-[140px] sm:h-[160px] rounded-2xl overflow-hidden border-2 border-amber-400/50 flex items-center justify-center bg-stone-900 p-6 shadow-inner">
          <div class="text-base sm:text-lg font-bold text-amber-300 z-0 select-none leading-relaxed">${card.hiddenText}</div>
          <canvas id="scratch-canvas-${idx}" class="scratch-canvas absolute inset-0 z-10 w-full h-full"></canvas>
        </div>
        <p class="text-xs text-amber-400/80 mt-4 flex items-center gap-1.5 font-semibold">
          <span>🪙 Use your mouse or finger to scratch off the silver coating!</span>
        </p>
      `;
      container.appendChild(wrapper);
      setTimeout(() => setupCanvasScratch(`scratch-canvas-${idx}`), 80);
    });
  }

  function setupCanvasScratch(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 340;
    canvas.height = canvas.offsetHeight || 150;

    // Fill with metallic silver-gold scratch overlay
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.3, '#cbd5e1');
    grad.addColorStop(0.6, '#f1f5f9');
    grad.addColorStop(1, '#64748b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE WITH MOUSE / FINGER ✨', canvas.width / 2, canvas.height / 2 + 5);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2, false);
      ctx.fill();

      if (Math.random() < 0.25 && window.birthdayAudio) {
        window.birthdayAudio.playTone(600, 'sine', 0.05, 0.04);
      }
    }

    canvas.addEventListener('mousedown', () => isScratching = true);
    window.addEventListener('mouseup', () => isScratching = false);
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
    window.addEventListener('touchend', () => isScratching = false);
    canvas.addEventListener('touchmove', scratch);
  }

  // -------------------------------------------------------
  // 6. GUESTBOOK / MESSAGE BOARD
  // -------------------------------------------------------
  function initMessageBoard() {
    renderMessages();

    const form = document.getElementById('new-wish-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const authorInput = document.getElementById('wish-author');
        const textInput = document.getElementById('wish-text');
        const colorSelect = document.getElementById('wish-color');

        if (!authorInput || !textInput) return;
        const author = authorInput.value.trim();
        const text = textInput.value.trim();
        const color = colorSelect ? colorSelect.value : 'bg-yellow-200 text-yellow-900 border-yellow-300';

        if (author && text) {
          const customWishes = JSON.parse(localStorage.getItem('aditya_custom_wishes') || '[]');
          customWishes.unshift({
            author,
            text,
            color,
            date: 'Just now'
          });
          localStorage.setItem('aditya_custom_wishes', JSON.stringify(customWishes));

          authorInput.value = '';
          textInput.value = '';
          renderMessages();
          fireConfetti();
          if (window.birthdayAudio) window.birthdayAudio.playTone(523.25, 'triangle', 0.2, 0.2);
        }
      });
    }
  }

  function renderMessages() {
    const container = document.getElementById('wishes-board');
    if (!container) return;

    const saved = JSON.parse(localStorage.getItem('aditya_custom_wishes') || '[]');
    const all = [...saved, ...data.presetWishes];

    container.innerHTML = all.map(w => `
      <div class="sticky-note ${w.color} border p-5 rounded-2xl flex flex-col justify-between h-48">
        <p class="font-handwritten text-xl font-bold leading-snug overflow-y-auto">${w.text}</p>
        <div class="flex items-center justify-between border-t border-black/10 pt-2 text-xs font-semibold">
          <span>— ${w.author}</span>
          <span class="opacity-70">${w.date}</span>
        </div>
      </div>
    `).join('');
  }

  // -------------------------------------------------------
  // 7. CONFETTI HELPER
  // -------------------------------------------------------
  function fireConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // -------------------------------------------------------
  // 8. AUDIO TOGGLE BUTTON
  // -------------------------------------------------------
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (window.birthdayAudio) {
        window.birthdayAudio.toggleBirthdayMusic(audioBtn);
      }
    });
  }

  // Initialize everything!
  initWantedPoster();
  initFriendsTabs();
  initCakeAndCandles();
  initScratchCards();
  initMessageBoard();
});
