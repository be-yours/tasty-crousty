'use client'

/**
 * Site effects · Tasty Crousty « Vice City Crousty » · CLIENT ZONE.
 *
 * The one shared browser script of the site, mounted once by the root layout.
 * Motion lives in CSS wherever CSS can do it (scroll-driven reveals, the LED
 * sweeps, the ribbon); this file only does what CSS cannot:
 *
 *   1. `data-tc-motion="on|off"` on <html>, following prefers-reduced-motion,
 *      so stylesheets and tests know whether motion is allowed.
 *   2. The basket « pop » when the header cart count changes (class `tc-pop`).
 *   3. Accessible names for icon-only controls of the engine that ship without
 *      one (dish card buttons, a back arrow, carousel arrows in English).
 *      Only an `aria-label` is added, never over an existing name.
 *   4. The home hero scene « Le coucher de soleil » (`.storefront-hero`):
 *      a canvas grid floor running to the horizon of the hero photograph, the
 *      pointer parallax of its layers (CSS variables --tc-px / --tc-py), two
 *      TikTok caption pills and the pink ribbon under the hero. Decor only,
 *      every injected node is aria-hidden.
 *   5. The pointer tilt of dish and category cards (6° at most, devices with a
 *      fine pointer only), as CSS variables read by home.css and shop.css.
 *
 * Rules kept from the first version of this file:
 *   - nothing moves unless `(prefers-reduced-motion: no-preference)` matches;
 *     under `reduce` the hero floor is drawn once, as a still frame;
 *   - nothing touches the administration (only `.storefront-theme` pages);
 *   - nothing touches a node React has not hydrated yet (fiber check);
 *   - everything is undone in the cleanup; nothing is added to the page flow
 *     except decor, which is absolutely positioned or aria-hidden.
 *   - one requestAnimationFrame loop, running only while the hero is on screen.
 */
import { useEffect } from 'react'

const NB = ' '
const MOTION_OK = '(prefers-reduced-motion: no-preference)'
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/** Cards that lean toward the pointer (home bento, categories, the menu). */
const TILT_SELECTOR = [
  '.storefront-hero ~ section [data-slot="carousel-item"] > div',
  '.storefront-hero ~ section a[href^="/menu?category="] > div',
  'main .storefront-menu-item',
].join(', ')

const RIBBON_WORDS = ['Générosité max', 'Ingrédients XXL', 'Prix imbattable', 'Riz fondant', 'Poulet croustillant', 'Sauce maison']
const HERO_CAPTIONS = [`POV${NB}: ta barquette déborde`, 'Riz. Poulet. Sauce. Point.']

/** Names for icon-only controls, by their lucide icon. */
const ICON_NAMES: Record<string, string> = {
  'lucide-arrow-left': 'Retour',
  'lucide-chevron-left': 'Précédent',
  'lucide-chevron-right': 'Suivant',
  'lucide-x': 'Fermer',
  'lucide-plus': 'Ajouter',
  'lucide-minus': 'Retirer',
  'lucide-heart': 'Ajouter aux favoris',
  'lucide-external-link': 'Ouvrir',
}

/** React has hydrated (or created) this node: it carries a fiber key. */
function hydrated(el: Element | null): el is HTMLElement {
  return !!el && Object.keys(el).some((key) => key.startsWith('__reactFiber$'))
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

/** Reads a unitless number from a custom property (CSS sets the scene geometry). */
function cssNumber(style: CSSStyleDeclaration, name: string, fallback: number) {
  const value = Number.parseFloat(style.getPropertyValue(name))
  return Number.isFinite(value) ? value : fallback
}

type Scene = {
  hero: HTMLElement
  destroy: () => void
}

/**
 * The hero scene. The geometry of the photograph (aspect, horizon, vanishing
 * point, the barquette to keep clear of lines) comes from CSS variables set on
 * `.storefront-hero-media > div` per breakpoint, so the canvas follows the
 * crop the stylesheet chose:
 *   --tc-iar  image aspect (w / h)          --tc-hr  horizon (0..1 of the image height)
 *   --tc-vx   vanishing point (0..1 of the image width)
 *   --tc-ox / --tc-oy  object-position of the image (0..1)
 *   --tc-bx / --tc-by / --tc-br  barquette centre and radius (0..1 of the image)
 */
function mountHero(hero: HTMLElement, motion: boolean, finePointer: boolean): Scene {
  const media = hero.querySelector<HTMLElement>('.storefront-hero-media')
  const stage = media?.firstElementChild as HTMLElement | null
  const added: Element[] = []
  hero.dataset.tcScene = motion ? 'live' : 'still'

  // Ribbon: a sibling right after the hero, scroll-linked (no loop, so no pause
  // button is needed), decorative: the words are already on the page.
  const ribbonWrap = document.createElement('div')
  ribbonWrap.className = 'tc-home-ribbon'
  ribbonWrap.setAttribute('aria-hidden', 'true')
  const ribbon = document.createElement('div')
  ribbon.className = 'tc-ribbon tc-ribbon--scroll'
  const track = document.createElement('div')
  track.className = 'tc-ribbon__track'
  for (let i = 0; i < 2; i += 1) {
    for (const word of RIBBON_WORDS) {
      const span = document.createElement('span')
      span.textContent = word
      track.append(span)
    }
  }
  ribbon.append(track)
  ribbonWrap.append(ribbon)
  hero.after(ribbonWrap)
  added.push(ribbonWrap)

  if (!media || !stage) {
    return {
      hero,
      destroy: () => {
        added.forEach((node) => node.remove())
        delete hero.dataset.tcScene
      },
    }
  }

  // TikTok caption pills floating by the barquette. Each pill is its own
  // small absolute box: a full-size transparent wrapper over the photograph
  // made Chromium drop the photograph from the paint.
  HERO_CAPTIONS.forEach((text, index) => {
    const pill = document.createElement('span')
    pill.className = `tc-caption ${index === 1 ? 'tc-caption--cyan' : ''} tc-hero-caption tc-hero-caption--${index + 1}`
    pill.setAttribute('aria-hidden', 'true')
    pill.textContent = text
    media.append(pill)
    added.push(pill)
  })

  // The floor.
  const canvas = document.createElement('canvas')
  canvas.className = 'tc-hero-floor'
  canvas.setAttribute('aria-hidden', 'true')
  stage.append(canvas)
  added.push(canvas)
  const ctx = canvas.getContext('2d')

  let width = 0
  let height = 0
  let dpr = 1
  let horizon = 0
  let vx = 0
  let bx = 0
  let by = 0
  let br = 0
  let stroke: CanvasGradient | null = null
  let phase = 0
  let last = 0
  let frame = 0
  let visible = true
  let px = 0
  let py = 0
  let tx = 0
  let ty = 0

  const measure = () => {
    const rect = stage.getBoundingClientRect()
    width = Math.max(1, Math.round(rect.width))
    height = Math.max(1, Math.round(rect.height))
    dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const style = getComputedStyle(stage)
    const iar = cssNumber(style, '--tc-iar', 16 / 9)
    const hr = cssNumber(style, '--tc-hr', 0.574)
    const ox = cssNumber(style, '--tc-ox', 0.5)
    const oy = cssNumber(style, '--tc-oy', 0.5)
    // object-fit: cover geometry
    const scale = Math.max(width / iar, height)
    const drawnW = scale * iar
    const drawnH = scale
    const offX = (width - drawnW) * ox
    const offY = (height - drawnH) * oy
    horizon = offY + hr * drawnH
    vx = offX + cssNumber(style, '--tc-vx', 0.4) * drawnW
    bx = offX + cssNumber(style, '--tc-bx', 0.63) * drawnW
    by = offY + cssNumber(style, '--tc-by', 0.66) * drawnH
    br = cssNumber(style, '--tc-br', 0.2) * drawnW
    if (ctx) {
      stroke = ctx.createLinearGradient(0, horizon * dpr, 0, height * dpr)
      stroke.addColorStop(0, 'rgba(255, 46, 154, 0)')
      stroke.addColorStop(0.18, 'rgba(255, 46, 154, 0.55)')
      stroke.addColorStop(0.55, 'rgba(245, 120, 176, 0.75)')
      stroke.addColorStop(1, 'rgba(93, 209, 227, 0.85)')
    }
  }

  const draw = () => {
    if (!ctx || !stroke) return
    const W = width * dpr
    const H = height * dpr
    const top = horizon * dpr
    const floor = H - top
    ctx.clearRect(0, 0, W, H)
    if (floor <= 4) return
    const cx = vx * dpr
    ctx.save()
    ctx.beginPath()
    // verticals: converge on the vanishing point
    const spread = W * 2.4
    const count = width < 768 ? 22 : 34
    for (let i = 0; i <= count; i += 1) {
      const xb = cx + (i / count - 0.5) * spread
      ctx.moveTo(cx + (xb - cx) * 0.02, top)
      ctx.lineTo(xb, H)
    }
    // horizontals: perspective rows running toward the viewer
    for (let k = 1; k < 34; k += 1) {
      const z = k - phase
      if (z < 0.55) continue
      const y = top + floor / (z * 0.9)
      if (y > H + 4) continue
      if (y - top < 1.5) break
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
    }
    ctx.strokeStyle = stroke
    ctx.lineCap = 'round'
    ctx.globalAlpha = 0.28
    ctx.lineWidth = 4.5 * dpr
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.lineWidth = 1.4 * dpr
    ctx.stroke()
    // keep the barquette clear of lines
    ctx.globalCompositeOperation = 'destination-out'
    const hole = ctx.createRadialGradient(bx * dpr, by * dpr, br * dpr * 0.35, bx * dpr, by * dpr, br * dpr)
    hole.addColorStop(0, 'rgba(0,0,0,1)')
    hole.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = hole
    ctx.fillRect(0, 0, W, H)
    // fade the far rows into the horizon haze
    const haze = ctx.createLinearGradient(0, top, 0, top + floor * 0.22)
    haze.addColorStop(0, 'rgba(0,0,0,1)')
    haze.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = haze
    ctx.fillRect(0, top - 2, W, floor * 0.22 + 2)
    ctx.restore()
  }

  const tick = (now: number) => {
    frame = 0
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
    last = now
    // the floor runs faster as the hero scrolls away
    const rect = hero.getBoundingClientRect()
    const progress = clamp(-rect.top / Math.max(1, rect.height), 0, 1)
    phase = (phase + dt * (0.45 + progress * 2.6)) % 1
    draw()
    // pointer parallax, eased
    px += (tx - px) * 0.08
    py += (ty - py) * 0.08
    hero.style.setProperty('--tc-px', px.toFixed(4))
    hero.style.setProperty('--tc-py', py.toFixed(4))
    if (visible && !document.hidden) frame = requestAnimationFrame(tick)
  }

  const start = () => {
    if (!motion || frame || !visible || document.hidden) return
    last = 0
    frame = requestAnimationFrame(tick)
  }
  const stop = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  measure()
  draw()

  const resize = new ResizeObserver(() => {
    measure()
    draw()
  })
  resize.observe(stage)
  // the photograph may decode after mount: its box does not change, the crop may
  const img = stage.querySelector('img')
  const onImg = () => {
    measure()
    draw()
  }
  img?.addEventListener('load', onImg)

  const io = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting)
    if (visible) start()
    else stop()
  })
  io.observe(hero)

  const onVisibility = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVisibility)

  const onMove = (event: PointerEvent) => {
    const rect = hero.getBoundingClientRect()
    tx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
    ty = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
  }
  const onLeave = () => {
    tx = 0
    ty = 0
  }
  if (motion && finePointer) {
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
  }
  start()

  return {
    hero,
    destroy: () => {
      stop()
      io.disconnect()
      resize.disconnect()
      img?.removeEventListener('load', onImg)
      document.removeEventListener('visibilitychange', onVisibility)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      hero.style.removeProperty('--tc-px')
      hero.style.removeProperty('--tc-py')
      delete hero.dataset.tcScene
      added.forEach((node) => node.remove())
    },
  }
}

/** Pointer tilt for cards: CSS reads --tc-rx / --tc-ry / --tc-gx / --tc-gy. */
function mountTilt() {
  let card: HTMLElement | null = null
  let rect: DOMRect | null = null
  let frame = 0
  let nx = 0
  let ny = 0

  const write = () => {
    frame = 0
    if (!card) return
    card.style.setProperty('--tc-rx', `${(-ny * 5).toFixed(2)}deg`)
    card.style.setProperty('--tc-ry', `${(nx * 6).toFixed(2)}deg`)
    card.style.setProperty('--tc-gx', `${((nx + 1) * 50).toFixed(1)}%`)
    card.style.setProperty('--tc-gy', `${((ny + 1) * 50).toFixed(1)}%`)
  }
  const release = () => {
    if (!card) return
    const old = card
    old.removeAttribute('data-tc-tilting')
    ;['--tc-rx', '--tc-ry', '--tc-gx', '--tc-gy'].forEach((name) => old.style.removeProperty(name))
    card = null
    rect = null
  }
  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>(TILT_SELECTOR) : null
    if (target !== card) {
      release()
      if (!target || !target.closest('.storefront-theme')) return
      card = target
      rect = target.getBoundingClientRect()
      card.setAttribute('data-tc-tilting', '')
    }
    if (!card || !rect) return
    nx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
    ny = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
    if (!frame) frame = requestAnimationFrame(write)
  }
  const onScroll = () => {
    // the card moved under a still pointer: measure again on the next move
    if (card) rect = card.getBoundingClientRect()
  }
  document.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', release)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('blur', release)
  return () => {
    if (frame) cancelAnimationFrame(frame)
    release()
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', release)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('blur', release)
  }
}

export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motionQuery = window.matchMedia(MOTION_OK)
    const pointerQuery = window.matchMedia(FINE_POINTER)
    const sync = () => {
      root.dataset.tcMotion = reduce.matches ? 'off' : 'on'
    }
    sync()
    reduce.addEventListener('change', sync)

    // ── 2. basket pop ──────────────────────────────────────────────────────
    let timer: number | undefined
    let popped: Element | null = null
    const headerObserver = new MutationObserver((mutations) => {
      if (!motionQuery.matches) return
      for (const mutation of mutations) {
        const node = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement
        const button = node?.closest('.storefront-theme > header button')
        // only the cart button carries a count badge (a span with `-top-1`)
        if (!button || !button.querySelector('span[class*="-top-1"]')) continue
        popped?.classList.remove('tc-pop')
        popped = button
        void (button as HTMLElement).offsetWidth // restart the animation
        button.classList.add('tc-pop')
        window.clearTimeout(timer)
        timer = window.setTimeout(() => button.classList.remove('tc-pop'), 650)
        break
      }
    })
    let observedHeader: Element | null = null

    // ── 3. accessible names ───────────────────────────────────────────────
    const nameControls = () => {
      document
        .querySelectorAll<HTMLElement>('.storefront-theme main :is(button, a[href]), .storefront-theme[role="dialog"] button')
        .forEach((control) => {
          if (!hydrated(control)) return
          if (control.getAttribute('aria-label') || control.getAttribute('aria-labelledby')) return
          // carousel arrows ship with an English sr-only text
          const slot = control.dataset.slot
          if (slot === 'carousel-previous' || slot === 'carousel-next') {
            control.setAttribute('aria-label', slot === 'carousel-next' ? 'Plats suivants' : 'Plats précédents')
            control.dataset.tcNamed = 'true'
            return
          }
          // the dialog close button ships with an English sr-only « Close »
          if (control.textContent?.trim() === 'Close' && control.closest('[role="dialog"]')) {
            control.setAttribute('aria-label', 'Fermer')
            control.dataset.tcNamed = 'true'
            return
          }
          if (control.textContent?.trim()) return
          const card = control.closest('.group.bg-card, .storefront-menu-item')
          const title = card?.querySelector('h3')?.textContent?.trim()
          const icon = control.querySelector('svg[class*="lucide-"]')
          const iconClass = icon ? [...icon.classList].find((name) => name in ICON_NAMES) : undefined
          let label = ''
          if (title && icon?.classList.contains('lucide-heart')) label = `Ajouter ${title} aux favoris`
          else if (title && icon?.classList.contains('lucide-plus')) label = `Ajouter ${title} au panier`
          else if (control.matches('a[href="/menu"]')) label = 'Retour à la carte'
          else if (iconClass) label = ICON_NAMES[iconClass] ?? ''
          if (!label) return
          control.setAttribute('aria-label', label)
          control.dataset.tcNamed = 'true'
        })
    }

    // ── 4. hero scene ─────────────────────────────────────────────────────
    let scene: Scene | null = null
    const syncHero = () => {
      const hero = document.querySelector<HTMLElement>('.storefront-theme main .storefront-hero')
      if (scene && (scene.hero !== hero || !scene.hero.isConnected)) {
        scene.destroy()
        scene = null
      }
      if (!scene && hero && hydrated(hero) && hydrated(hero.querySelector('.storefront-hero-media'))) {
        scene = mountHero(hero, motionQuery.matches, pointerQuery.matches)
      }
    }

    // ── 5. card tilt ──────────────────────────────────────────────────────
    let untilt: (() => void) | null = null
    const syncTilt = () => {
      const want = motionQuery.matches && pointerQuery.matches
      if (want && !untilt) untilt = mountTilt()
      if (!want && untilt) {
        untilt()
        untilt = null
      }
    }

    let frame = 0
    const run = () => {
      frame = 0
      if (!document.querySelector('.storefront-theme')) return // administration: hands off
      const header = document.querySelector('.storefront-theme > header')
      if (header !== observedHeader) {
        headerObserver.disconnect()
        observedHeader = header
        if (header) headerObserver.observe(header, { childList: true, subtree: true, characterData: true })
      }
      nameControls()
      syncHero()
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run)
    }
    const bodyObserver = new MutationObserver(schedule)
    bodyObserver.observe(document.body, { childList: true, subtree: true })
    schedule()
    syncTilt()

    // a change of preference rebuilds the scene in the right mode
    const onMotionChange = () => {
      scene?.destroy()
      scene = null
      syncTilt()
      schedule()
    }
    motionQuery.addEventListener('change', onMotionChange)
    pointerQuery.addEventListener('change', onMotionChange)

    return () => {
      reduce.removeEventListener('change', sync)
      motionQuery.removeEventListener('change', onMotionChange)
      pointerQuery.removeEventListener('change', onMotionChange)
      headerObserver.disconnect()
      bodyObserver.disconnect()
      if (frame) cancelAnimationFrame(frame)
      scene?.destroy()
      untilt?.()
      document.querySelectorAll('[data-tc-named]').forEach((el) => {
        el.removeAttribute('aria-label')
        el.removeAttribute('data-tc-named')
      })
      window.clearTimeout(timer)
      delete root.dataset.tcMotion
      popped?.classList.remove('tc-pop')
    }
  }, [])

  return null
}
