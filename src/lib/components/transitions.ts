import { TransitionDirectionalAnimations } from 'astro'

export function scroll({
  duration,
}: {
  duration?: string | number
} = {}): TransitionDirectionalAnimations {
  return {
    forwards: {
      old: [
        {
          name: 'astroSlideToTop',
          duration: duration ?? '220ms',
          easing: 'ease-in-out',
          fillMode: 'both',
        },
      ],
      new: [
        {
          name: 'astroSlideFromBottom',
          duration: duration ?? '220ms',
          easing: 'ease-in-out',
          fillMode: 'both',
        },
      ],
    },
    backwards: {
      old: [{ name: 'astroSlideToBottom' }],
      new: [{ name: 'astroSlideFromTop' }],
    },
  }
}
