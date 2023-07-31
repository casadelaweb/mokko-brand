import { modalsAside } from 'src/modules/modals/modals.aside'
import { modals } from 'src/scripts/modals-instance'

document.addEventListener('DOMContentLoaded', () => {
  const { body, } = document
  modalsAside(modals, '[data-modal=preview]')

  const form: HTMLElement = body.querySelector('[data-preview=form]')
  const colors: HTMLElement[] = Array.from(form.querySelectorAll('[data-preview=color]'))
  const sizes: HTMLElement[] = Array.from(form.querySelectorAll('[data-preview=size]'))

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (target.closest('[data-preview=color]')) {
      const button: HTMLElement = target.closest('[data-preview=color]')
      colors.forEach((element: HTMLElement) => element.classList.remove('active'))
      button.classList.add('active')
    }

    if (target.closest('[data-preview=size]')) {
      const button: HTMLElement = target.closest('[data-preview=size]')
      sizes.forEach((element: HTMLElement) => element.classList.remove('active'))
      button.classList.add('active')
    }
  })
})