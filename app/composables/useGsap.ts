import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function useGsap() {
  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }

  return { gsap, ScrollTrigger }
}

export function useSectionAnimations(scopeRef: Ref<HTMLElement | undefined>) {
  const { gsap, ScrollTrigger } = useGsap()
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!scopeRef.value) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    ctx = gsap.context(() => {}, scopeRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })

  function add(fn: () => void) {
    ctx?.add(fn)
  }

  return { gsap, ScrollTrigger, add }
}
