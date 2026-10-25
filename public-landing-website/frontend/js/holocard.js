/**
 * OD AI HUB — Interactive HoloCard System
 * Adapted from React Bits <HoloCard /> with custom presets, 3D spring physics,
 * holographic foil sheen, specular glare, dynamic sparkling facets, and 3D parallax depth.
 */

(function () {
  'use strict';

  const PERSPECTIVE = 1100;
  const TILT_MAX = 13;
  const HOVER_SCALE = 1.035;
  const TAU = Math.PI * 2;

  // Spring physics solver (from React Bits specification)
  function spring(value, velocity, target, stiffness, damping, dt) {
    const next = velocity + ((target - value) * stiffness - velocity * damping) * dt;
    return [value + next * dt, next];
  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function hexToRgb(hex) {
    if (!hex) return '201, 168, 76';
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return '201, 168, 76';
    const num = parseInt(hex, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  }

  // Pre-generate pseudo-random sparkle facets for each card
  function createSparkles(count) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.18 + Math.random() * 0.32,
        spin: Math.random() * TAU,
        spinSpeed: (Math.random() - 0.5) * 1.5,
        flashPower: 3 + Math.random() * 5,
        facet: [Math.random() - 0.5, Math.random() - 0.5, 0.8 + Math.random() * 0.4]
      });
    }
    return items;
  }

  class HoloCardInstance {
    constructor(card, preset = 'bursts') {
      this.card = card;
      this.preset = preset;
      this.card.classList.add('holo-card-active', `holo-preset-${preset}`);

      // Extract custom color for tailored reflections
      const customColor = getComputedStyle(card).getPropertyValue('--c').trim();
      const rgb = hexToRgb(customColor);
      this.card.style.setProperty('--c-rgb', rgb);

      // Create internal structure if not already built
      this.setupDOM();

      // Physics state
      this.state = {
        tiltX: 0,
        tiltY: 0,
        tiltVX: 0,
        tiltVY: 0,
        lightX: 0.38,
        lightY: 0.28,
        lightVX: 0,
        lightVY: 0,
        lift: 1,
        liftV: 0,
        clock: Math.random() * 50
      };

      this.pointer = { x: 0.5, y: 0.5, inside: false };
      this.raf = 0;
      this.last = performance.now();
      this.alive = true;
      this.calm = 0;
      this.sparkles = createSparkles(28);

      this.reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

      this.bindEvents();
      this.resize();
      this.wake();
    }

    setupDOM() {
      if (this.card.querySelector('.holo-foil-layer')) return;

      // Wrap existing content in a 3D parallax content stage
      const existingNodes = Array.from(this.card.childNodes);
      const stage = document.createElement('div');
      stage.className = 'holo-content-stage';
      existingNodes.forEach(node => stage.appendChild(node));

      // Foil layer (prismatic diffraction sheen + preset pattern)
      const foil = document.createElement('div');
      foil.className = 'holo-foil-layer';
      foil.setAttribute('aria-hidden', 'true');

      // Specular Glare spotlight
      const glare = document.createElement('div');
      glare.className = 'holo-glare-spot';
      glare.setAttribute('aria-hidden', 'true');

      // Sparkling border frame
      const border = document.createElement('div');
      border.className = 'holo-sparkle-border';
      border.setAttribute('aria-hidden', 'true');

      // Sparkle facets canvas
      const canvas = document.createElement('canvas');
      canvas.className = 'holo-sparkle-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      // Reactive soft shadow
      const shadow = document.createElement('div');
      shadow.className = 'holo-reactive-shadow';
      shadow.setAttribute('aria-hidden', 'true');
      this.shadowEl = shadow;

      this.card.appendChild(shadow);
      this.card.appendChild(foil);
      this.card.appendChild(canvas);
      this.card.appendChild(glare);
      this.card.appendChild(border);
      this.card.appendChild(stage);
    }

    bindEvents() {
      const onPointerMove = e => {
        if (e.pointerType === 'touch' && !e.buttons && e.type === 'pointermove') return;
        const rect = this.card.getBoundingClientRect();
        this.pointer.x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
        this.pointer.y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
        this.pointer.inside = true;
        this.wake();
      };

      const onPointerLeave = () => {
        this.pointer.inside = false;
        this.wake();
      };

      this.card.addEventListener('pointerenter', onPointerMove);
      this.card.addEventListener('pointermove', onPointerMove);
      this.card.addEventListener('pointerdown', onPointerMove);
      this.card.addEventListener('pointerleave', onPointerLeave);
      this.card.addEventListener('pointercancel', onPointerLeave);

      // Resize observer
      if (window.ResizeObserver && this.canvas) {
        this.ro = new ResizeObserver(() => this.resize());
        this.ro.observe(this.card);
      }
    }

    resize() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(this.card.clientWidth * dpr);
      const h = Math.round(this.card.clientHeight * dpr);
      if (w > 0 && h > 0 && (this.canvas.width !== w || this.canvas.height !== h)) {
        this.canvas.width = w;
        this.canvas.height = h;
      }
    }

    wake() {
      if (this.raf || !this.alive) return;
      this.calm = 0;
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick.bind(this));
    }

    drawSparkles(lightX, lightY, tiltX, tiltY, lift) {
      if (!this.ctx || !this.canvas || this.canvas.width === 0) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Only draw sparkles when hovering or lifting
      const awake = clamp((lift - 1) * 20 + Math.abs(tiltX) + Math.abs(tiltY), 0.15, 1);
      const sweepX = (lightX - 0.5) * 2;
      const sweepY = (lightY - 0.5) * 2;

      for (let i = 0; i < this.sparkles.length; i++) {
        const sp = this.sparkles[i];
        const px = sp.x * w;
        const py = sp.y * h;

        // Vector alignment with light sweep
        const dx = (sp.x - lightX);
        const dy = (sp.y - lightY);
        const distToLight = Math.sqrt(dx * dx + dy * dy);
        const glint = Math.pow(Math.max(0, 1 - distToLight * 1.6), sp.flashPower) * awake;

        if (glint > 0.04) {
          const size = (sp.size * 14 + glint * 10) * (w / 320);
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(sp.spin + tiltX * 0.05);

          // Hue shift based on coordinate and tilt angle
          const hueVal = Math.round((sp.x * 240 + sp.y * 120 + sp.spin * 50 + tiltX * 5) % 360);
          ctx.fillStyle = `hsla(${hueVal}, 90%, 75%, ${glint * 0.75})`;
          ctx.shadowColor = `hsla(${hueVal}, 95%, 65%, 0.8)`;
          ctx.shadowBlur = 8;

          // Draw 4-point sparkle star
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.quadraticCurveTo(0, 0, size * 0.35, 0);
          ctx.quadraticCurveTo(0, 0, 0, size);
          ctx.quadraticCurveTo(0, 0, -size * 0.35, 0);
          ctx.quadraticCurveTo(0, 0, 0, -size);
          ctx.fill();

          // Central white hotspot
          ctx.fillStyle = `rgba(255, 255, 255, ${glint * 0.9})`;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.22, 0, TAU);
          ctx.fill();

          ctx.restore();
        }
      }
    }

    tick(now) {
      this.raf = 0;
      if (!this.alive) return;

      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - this.last) / 1000));
      this.last = now;

      let targetX = 0;
      let targetY = 0;
      let targetLightX = 0.38;
      let targetLightY = 0.28;
      let targetLift = 1;

      if (this.pointer.inside && !this.reduceMotion) {
        targetX = (0.5 - this.pointer.y) * 2 * TILT_MAX;
        targetY = (this.pointer.x - 0.5) * 2 * TILT_MAX;
        targetLightX = this.pointer.x;
        targetLightY = this.pointer.y;
        targetLift = HOVER_SCALE;
      } else if (!this.reduceMotion) {
        // Subtle idle drifting physics
        this.state.clock += dt;
        const t = this.state.clock;
        targetX = Math.sin(t * 0.65) * TILT_MAX * 0.22;
        targetY = Math.sin(t * 0.52 + 1.2) * TILT_MAX * 0.32;
        targetLightX = 0.5 + Math.sin(t * 0.4) * 0.38;
        targetLightY = 0.38 + Math.sin(t * 0.32 + 0.6) * 0.28;
      }

      // Spring step resolution
      const steps = Math.ceil(dt / (1 / 240));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        [this.state.tiltX, this.state.tiltVX] = spring(this.state.tiltX, this.state.tiltVX, targetX, 150, 16, h);
        [this.state.tiltY, this.state.tiltVY] = spring(this.state.tiltY, this.state.tiltVY, targetY, 150, 16, h);
        [this.state.lightX, this.state.lightVX] = spring(this.state.lightX, this.state.lightVX, targetLightX, 200, 26, h);
        [this.state.lightY, this.state.lightVY] = spring(this.state.lightY, this.state.lightVY, targetLightY, 200, 26, h);
        [this.state.lift, this.state.liftV] = spring(this.state.lift, this.state.liftV, targetLift, 280, 28, h);
      }

      // Apply 3D tilt transform
      const { tiltX, tiltY, lightX, lightY, lift } = this.state;
      this.card.style.transform = `perspective(${PERSPECTIVE}px) scale3d(${lift}, ${lift}, ${lift}) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;

      // Dynamic variables for foil and glare
      const foilAngle = Math.round(115 + tiltY * 3.5 + tiltX * 2.5);
      const glareX = Math.round(lightX * 100);
      const glareY = Math.round(lightY * 100);
      const foilAlpha = (0.28 + (lift - 1) * 8 + Math.abs(tiltX + tiltY) * 0.02).toFixed(3);

      this.card.style.setProperty('--light-x', `${glareX}%`);
      this.card.style.setProperty('--light-y', `${glareY}%`);
      this.card.style.setProperty('--foil-angle', `${foilAngle}deg`);
      this.card.style.setProperty('--foil-alpha', `${foilAlpha}`);
      this.card.style.setProperty('--tilt-x', tiltX.toFixed(2));
      this.card.style.setProperty('--tilt-y', tiltY.toFixed(2));

      // Dynamic reactive shadow
      if (this.shadowEl) {
        const shadowX = (-tiltY * 0.75).toFixed(1);
        const shadowY = (tiltX * 0.75 + 8).toFixed(1);
        const shadowScale = (0.92 + (lift - 1) * 1.6).toFixed(3);
        this.shadowEl.style.transform = `translate(${shadowX}px, ${shadowY}px) scale(${shadowScale})`;
      }

      // Draw canvas sparkles
      this.drawSparkles(lightX, lightY, tiltX, tiltY, lift);

      // Check if motion has settled
      const motion =
        Math.abs(this.state.tiltVX) +
        Math.abs(this.state.tiltVY) +
        Math.abs(this.state.liftV) * 30 +
        Math.abs(this.state.lightVX) +
        Math.abs(this.state.lightVY) +
        Math.abs(tiltX - targetX) +
        Math.abs(tiltY - targetY);

      this.calm = motion > 0.02 ? 0 : this.calm + dt;
      if (!this.pointer.inside && this.calm > 0.5) return;

      this.raf = requestAnimationFrame(this.tick.bind(this));
    }

    destroy() {
      this.alive = false;
      cancelAnimationFrame(this.raf);
      if (this.ro) this.ro.disconnect();
    }
  }

  // Global registry and initializer
  const activeCards = new Map();

  function initHoloCards() {
    const presetMap = {
      'grid-technologies': 'gold',
      'grid-innovation-lab': 'cosmos',
      'grid-startups': 'bursts',
      'grid-for-business': 'swirl',
      'grid-inst-colleges': 'shards',
      'grid-inst-schools': 'shards',
      'grid-events': 'rainbow',
      'grid-success-stories': 'glitter'
    };

    const UNIFIED_GRIDS = [
      '#grid-technologies',
      '#grid-innovation-lab',
      '#grid-startups',
      '#grid-for-business',
      '#grid-inst-colleges',
      '#grid-inst-schools',
      '#grid-events',
      '#grid-success-stories'
    ];

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
      if (activeCards.has(card)) return;
      if (card.closest(UNIFIED_GRIDS.join(','))) return; // Unified pages use refined dark translucent glass cards

      // Determine preset from parent container ID
      let preset = 'bursts';
      const parentGrid = card.closest('.grid');
      if (parentGrid && parentGrid.id && presetMap[parentGrid.id]) {
        preset = presetMap[parentGrid.id];
      }

      const instance = new HoloCardInstance(card, preset);
      activeCards.set(card, instance);
    });
  }

  // Run on DOMContentLoaded and watch for dynamic route or grid changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoloCards);
  } else {
    setTimeout(initHoloCards, 50);
  }

  // Re-run whenever hash/route changes or user switches views
  window.addEventListener('hashchange', () => {
    setTimeout(initHoloCards, 60);
  });

  // MutationObserver to catch any new cards appended dynamically
  const observer = new MutationObserver(() => {
    initHoloCards();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.initHoloCards = initHoloCards;
})();
