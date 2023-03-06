import type { InjectionKey, Ref } from 'vue'

const ik = () => {
  return Symbol() as InjectionKey<Ref<number>>
}

export const gridContentWidth = ik()
