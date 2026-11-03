/**
 * Small browser helpers for the page scenes (CLIENT ZONE). No dependency.
 *
 * Every scene starts only when the visitor allows motion
 * (`prefers-reduced-motion: no-preference`), runs only while it is on screen,
 * and undoes everything it set in its cleanup (React StrictMode runs effects
 * twice in development).
 */

export const motionAllowed = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: no-preference)").matches

/** A real pointer that can hover (no tilt on touch screens). */
export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Calls `onFrame` on every animation frame while `element` is on screen,
 * and stops when it leaves. Returns the cleanup.
 */
export function whileVisible(element: Element, onFrame: () => void): () => void {
  let frame = 0
  let running = false
  const loop = () => {
    onFrame()
    frame = window.requestAnimationFrame(loop)
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && !running) {
      running = true
      frame = window.requestAnimationFrame(loop)
    } else if (!entry?.isIntersecting && running) {
      running = false
      window.cancelAnimationFrame(frame)
    }
  })
  observer.observe(element)
  return () => {
    observer.disconnect()
    window.cancelAnimationFrame(frame)
  }
}

/**
 * Tracks the pointer over `element` as two numbers between -1 and 1, eased,
 * written to `--tc-px` / `--tc-py` on the element. Hover devices only.
 */
export function pointerVars(element: HTMLElement): () => void {
  let targetX = 0
  let targetY = 0
  let x = 0
  let y = 0
  const onMove = (event: PointerEvent) => {
    const box = element.getBoundingClientRect()
    targetX = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1)
    targetY = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1)
  }
  const onLeave = () => {
    targetX = 0
    targetY = 0
  }
  element.addEventListener("pointermove", onMove)
  element.addEventListener("pointerleave", onLeave)
  const stop = whileVisible(element, () => {
    x += (targetX - x) * 0.12
    y += (targetY - y) * 0.12
    element.style.setProperty("--tc-px", x.toFixed(3))
    element.style.setProperty("--tc-py", y.toFixed(3))
  })
  return () => {
    stop()
    element.removeEventListener("pointermove", onMove)
    element.removeEventListener("pointerleave", onLeave)
    element.style.removeProperty("--tc-px")
    element.style.removeProperty("--tc-py")
  }
}
