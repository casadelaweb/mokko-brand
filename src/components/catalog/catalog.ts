import { card, catalogElements, selectors } from 'src/components/catalog/catalog.types'

export class Catalog {
  public elements: catalogElements | undefined
  private isDesktop: boolean
  private readonly selectors: selectors
  // eslint-disable-next-line no-unused-vars
  private readonly onClick: (event) => void
  // eslint-disable-next-line no-unused-vars
  private readonly onMouseEnter: (event) => void
  // eslint-disable-next-line no-unused-vars
  private readonly onMouseLeave: (event) => void

  constructor() {
    this.selectors = {
      card: '[data-catalog=card]',
      slider: '[data-slider=catalog-card]',
      controls: '[data-catalog-card=controls]',
      buttons: {
        prev: '.swiper-button-prev',
        next: '.swiper-button-next',
      },
    }
    this.isDesktop = false

    // cоздаем обертку для методов чтобы привязать контекст вызова
    // так эта хрень нормально работает с removeEventListener
    this.onClick = this.handleClick.bind(this)
    this.onMouseEnter = this.handleMouseEnter.bind(this)
    this.onMouseLeave = this.handleMouseLeave.bind(this)
  }

  public init(): void {
    this.update()
  }

  public update(): void {
    this.isDesktop = window.matchMedia('(min-width: 1280px)').matches
    this.elements = this.updateElements()
    this.listen()
  }

  private updateMouseListeners(): void {
    const { body, } = document

    const cards: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.card))

    cards.forEach((card: HTMLElement) => {
      card.removeEventListener('mouseenter', this.onMouseEnter)
      card.removeEventListener('mouseleave', this.onMouseLeave)

      card.addEventListener('mouseenter', this.onMouseEnter)
      card.addEventListener('mouseleave', this.onMouseLeave)
    })
  }

  private listen(): void {
    this.updateClickListeners()
    this.updateMouseListeners()
  }

  private updateClickListeners(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }

  private handleClick(event): void {
    const target = event.target as HTMLElement

    if (target.closest('[data-catalog-layout]')) {
      const button = target.closest('[data-catalog-layout]')
      const mode = button.getAttribute('data-catalog-layout')

      this.changeLayoutMode(mode)
    }

    if (target.closest(this.selectors.slider) && !this.isDesktop) {
      const card = target.closest(this.selectors.card)
      const controls = card.querySelector(this.selectors.controls)
      controls.classList.toggle('active')
    }
  }

  private handleMouseEnter(event): void {
    const card = event.target as HTMLElement

    if (this.isDesktop) {
      const sizes: HTMLElement = card.querySelector(this.selectors.controls)
      const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
      const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

      sizes.classList.add('active')
      buttonPrev.classList.add('active')
      buttonNext.classList.add('active')
    }
  }

  private handleMouseLeave(event): void {
    const card = event.target as HTMLElement

    if (this.isDesktop) {
      const sizes: HTMLElement = card.querySelector(this.selectors.controls)
      const buttonPrev: HTMLElement = card.querySelector(this.selectors.buttons.prev)
      const buttonNext: HTMLElement = card.querySelector(this.selectors.buttons.next)

      sizes.classList.remove('active')
      buttonPrev.classList.remove('active')
      buttonNext.classList.remove('active')
    }
  }

  private changeLayoutMode(mode: string): void {
    switch (mode) {
    case 'row':
      this.elements.layout.classList.add('mode-row')
      break
    default:
      this.elements.layout.classList.remove('mode-row')
      break
    }
  }

  private updateElements(): catalogElements {
    const { body, } = document

    const layout: HTMLElement = body.querySelector('[data-catalog=layout]')
    const cardsArray: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.card))
    const cards = cardsArray.map((card: HTMLElement): card => {
      const slider: HTMLElement = card.querySelector(this.selectors.slider)
      const controls: HTMLElement = card.querySelector(this.selectors.controls)
      const buttons: { prev: HTMLElement, next: HTMLElement } = {
        prev: card.querySelector(this.selectors.buttons.prev),
        next: card.querySelector(this.selectors.buttons.next),
      }
      return {
        card,
        slider,
        controls,
        buttons,
      }
    })

    return {
      layout,
      cards,
    }
  }
}