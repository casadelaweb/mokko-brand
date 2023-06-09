import './select.scss'
import { selectors } from 'src/modules/select/select.types'

export class Select {
  private selectors: selectors
  private parameters: {
    current: HTMLElement | HTMLElement[]
  }

  constructor() {
    this.selectors = {
      select: '.select',
      current: '.select-current',
      value: '.select-current-value',
      button: '.select-current-button',
      options: '.select-options',
      option: '.select-option',
    }
    this.parameters = { current: [], }
  }

  public init(): void {
    this.listen()
    this.update()
  }

  private update(): void {
    const { body, } = document

    const selects = Array.from(body.querySelectorAll(this.selectors.select))

    selects.forEach((select: HTMLElement) => {
      const optionsAll = Array.from(select.querySelectorAll(this.selectors.option))
      const optionsActive = optionsAll.filter((option: HTMLElement) => option.classList.contains('active'))

      if (optionsActive.length > 0) {
        const valueContainer = select.querySelector(this.selectors.value)
        let valueContent: string = ''
        optionsActive.forEach((option) => valueContent = valueContent + option.textContent)
        valueContainer.textContent = valueContent
      }
    })
  }

  private deactivate(select: HTMLElement): void {
    const options: HTMLElement = select.querySelector(this.selectors.options)
    const button: HTMLElement = select.querySelector(this.selectors.button)

    select.classList.remove('active')
    options.classList.remove('active')
    button.classList.remove('active')
  }

  private listen(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement

      if (target.closest(this.selectors.current)) {
        const select: HTMLElement = target.closest(this.selectors.select)
        const options: HTMLElement = select.querySelector(this.selectors.options)
        const button: HTMLElement = select.querySelector(this.selectors.button)

        if (this.parameters.current instanceof HTMLElement && this.parameters.current !== select) {
          this.deactivate(this.parameters.current)
        }
        this.parameters.current = select
        select.classList.toggle('active')
        options.classList.toggle('active')
        button.classList.toggle('active')
      }

      if (target.closest(this.selectors.option)) {
        const select: HTMLElement = target.closest(this.selectors.select)
        const optionsAll: HTMLElement[] = Array.from(select.querySelectorAll(this.selectors.option))
        const optionCurrent: HTMLElement = target.closest(this.selectors.option)
        const valueContainer: HTMLElement = select.querySelector(this.selectors.value)

        optionsAll.forEach((option: HTMLElement) => option.classList.remove('active'))
        optionCurrent.classList.add('active')
        valueContainer.textContent = optionCurrent.textContent
      }

      if (!target.closest(this.selectors.select)) {
        if (this.parameters.current instanceof HTMLElement) this.deactivate(this.parameters.current)
      }
    })
  }
}
