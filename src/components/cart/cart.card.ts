import { throwEvent } from 'src/scripts/helpers'

interface iSelectors {
  card: string,
  quantity: string,
  minus: string,
  plus: string,
  input: string,
  priceCurrent: string,
  priceOld: string,
}

export interface iElement {
  card: HTMLElement,
  priceCurrent: HTMLElement,
  priceOld: HTMLElement,
  quantity: HTMLElement,
  minus: HTMLElement,
  plus: HTMLElement,
  input: HTMLInputElement,
}

export class CartCard {
  public elements: iElement[]
  private selectors: iSelectors
  private options: {
    min: number,
    max: number,
  }
  // eslint-disable-next-line no-unused-vars
  private readonly onClick: (event) => any
  // eslint-disable-next-line no-unused-vars
  private readonly stop: (event) => any
  // eslint-disable-next-line no-unused-vars
  private readonly onResize: () => any
  private interval: null | NodeJS.Timer
  private timeout: null | NodeJS.Timeout
  private readonly timeoutDuration: number
  private readonly intervalDuration: number

  constructor(options?) {
    this.selectors = {
      card: '[data-cart-card=card]',
      quantity: '[data-cart-card=quantity]',
      minus: '[data-cart-card=quantity-minus]',
      plus: '[data-cart-card=quantity-plus]',
      input: '[data-cart-card=quantity-input]',
      priceCurrent: '[data-cart-card=price-current]',
      priceOld: '[data-cart-card=price-old]',
    }
    this.options = {
      min: 1,
      max: 99,
      ...options,
    }
    this.timeout = null
    this.timeoutDuration = 600
    this.interval = null
    this.intervalDuration = 150
    this.onClick = this.handleStart.bind(this)
    this.onResize = this.updateListeners.bind(this)
    this.stop = this.handleStop.bind(this)
  }

  public init(): void {
    this.elements = this.updateElements()
    this.onResize()
    window.addEventListener('resize', this.onResize)

    console.log(this)
  }

  private updateListeners(): void {
    document.removeEventListener('touchstart', this.onClick)
    document.removeEventListener('touchend', this.stop)
    document.removeEventListener('mousedown', this.onClick)
    document.removeEventListener('mouseup', this.stop)
    document.removeEventListener('mouseleave', this.stop)

    if (this.isMobile()) {
      document.addEventListener('touchstart', this.onClick)
      document.addEventListener('touchend', this.stop)
    } else {
      document.addEventListener('mousedown', this.onClick)
      document.addEventListener('mouseup', this.stop)
      document.addEventListener('mouseleave', this.stop)
    }
  }

  private updateElements(): iElement[] {
    const { body, } = document
    const cards: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.card))
    return cards.map((card) => this.updateElement(card))
  }

  private updateElement(card: HTMLElement): iElement {
    const input: HTMLInputElement = card.querySelector(this.selectors.input)
    const minus: HTMLElement = card.querySelector(this.selectors.minus)
    const plus: HTMLElement = card.querySelector(this.selectors.plus)
    const quantity: HTMLElement = card.querySelector(this.selectors.quantity)
    const priceCurrent: HTMLElement = card.querySelector(this.selectors.priceCurrent)
    const priceOld: HTMLElement = card.querySelector(this.selectors.priceOld)

    return {
      card,
      input,
      minus,
      plus,
      quantity,
      priceCurrent,
      priceOld,
    }
  }

  private isMobile(): boolean {
    // console.log(('ontouchstart' in window), ('ontouchend' in window))
    return ('ontouchstart' in window) && ('ontouchend' in window)
  }

  private increaseValue(input: HTMLInputElement): void {
    let value = parseInt(input.value) - 1
    value = value <= this.options.min ? this.options.min : value
    input.value = value.toString()

    throwEvent(input, 'cartCardUpdate')
  }

  private decreaseValue(input: HTMLInputElement): void {
    let value = parseInt(input.value) + 1
    value = value >= this.options.max ? this.options.max : value
    input.value = value.toString()

    throwEvent(input, 'cartCardUpdate')
  }

  private handleStart(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target.closest(this.selectors.minus)) {
      const button: HTMLElement = target.closest(this.selectors.minus)
      const card: HTMLElement = button.closest(this.selectors.card)
      const input: HTMLInputElement = card.querySelector(this.selectors.input)

      this.increaseValue(input)
      this.timeout = setTimeout(() => {
        this.interval = setInterval(() => {
          this.increaseValue(input)
        }, this.intervalDuration)
      }, this.timeoutDuration)
    }
    if (target.closest(this.selectors.plus)) {
      const button: HTMLElement = target.closest(this.selectors.plus)
      const card: HTMLElement = button.closest(this.selectors.card)
      const input: HTMLInputElement = card.querySelector(this.selectors.input)

      this.decreaseValue(input)
      this.timeout = setTimeout(() => {
        this.interval = setInterval(() => {
          this.decreaseValue(input)
        }, this.intervalDuration)
      }, this.timeoutDuration)
    }
  }

  private handleStop(): void {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }
}
