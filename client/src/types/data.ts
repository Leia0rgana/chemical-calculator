export type Block = 's' | 'p' | 'd' | 'f'

export interface IElement {
  name: string
  atomic_mass: number
  boil: number
  category: string
  density: number
  discovered_by: string | null
  melt: number
  number: number
  period: number
  group: number
  phase: string
  summary: string
  symbol: string
  'cpk-hex': string
  block: Block
}

export interface IElementInfo {
  title: string
  value: string | number
}
