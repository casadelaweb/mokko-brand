import { iElements, iSelectors } from 'src/components/pages/catalog/catalog.preview.types'
import Swiper from 'swiper'
import { Navigation, A11y, Pagination, Mousewheel } from 'swiper/modules'
import { accessibility as accessibilitySettings } from 'src/scripts/swiper-settings'

// import { CatalogCards } from 'src/components/pages/catalog/catalog.cards'

export class CatalogPreview {
  private static readonly settings = {
    selectors: {
      form: '[data-preview=form]',
      title: '[data-preview=title]',
      discount: '[data-preview=discount]',
      slider: '[data-preview=slider]',
      slidesContainer: '[data-preview=slides-container]',
      sliderButtonPrev: '[data-preview=slider-button-prev]',
      sliderButtonNext: '[data-preview=slider-button-next]',
      pricesContainer: '[data-preview=prices-container]',
      priceOld: '[data-preview=price-old]',
      price: '[data-preview=price]',
      colorsContainer: '[data-preview=colors-container]',
      colorButton: '[data-preview=color]',
      sizesContainer: '[data-preview=sizes]',
      sizeButton: '[data-preview=size]',
      submit: '[data-preview=submit]',
    },
  }
  private readonly onClick: (event: MouseEvent) => void
  private elements: iElements | false
  private selectors: iSelectors
  private swiper: Swiper | Swiper[] | undefined
  
  constructor() {
    this.onClick = this.handleClick.bind(this)
    this.swiper = undefined
    this.selectors = { ...CatalogPreview.settings.selectors, }
    this.elements = {
      form: undefined,
      title: undefined,
      discount: undefined,
      slider: undefined,
      slidesContainer: undefined,
      sliderButtonPrev: undefined,
      sliderButtonNext: undefined,
      pricesContainer: undefined,
      priceOld: undefined,
      price: undefined,
      colorsContainer: undefined,
      colorButtons: [],
      sizesContainer: undefined,
      sizeButtons: [],
      submit: undefined,
    }
  }
  
  public init(): void {
    this.elements = this.updateElements()
    if(this.elements === false) return
    this.updateListeners()
    this.initSlider()
  }
  
  private initSlider(): void {
    if(!document.body.querySelector(this.selectors.slidesContainer)) {
      this.swiper = undefined
      return
    }
    
    this.swiper = new Swiper(this.selectors.slider, {
      modules: [
        Navigation, A11y, Mousewheel,
        // Pagination,
      ],
      ...accessibilitySettings,
      loop: true,
      speed: 250,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 14,
      navigation: {
        nextEl: this.selectors.sliderButtonPrev,
        prevEl: this.selectors.sliderButtonNext,
      },
      //pagination: {
      //  el: '.swiper-pagination',
      //  clickable: true,
      //},
      mousewheel: false,
      breakpoints: {
        1280: { mousewheel: { releaseOnEdges: true, }, },
        1920: { mousewheel: { releaseOnEdges: true, }, },
      },
    })
  }
  
  private updateElements(): iElements | false {
    const body = document.body as HTMLElement
    const form: HTMLElement = body.querySelector(this.selectors.form)
    
    if(!form) return false
    
    const colorButtons: HTMLElement[] = Array.from(form.querySelectorAll(this.selectors.colorButton))
    const sizeButtons: HTMLElement[] = Array.from(form.querySelectorAll(this.selectors.sizeButton))
    
    return {
      form,
      title: form.querySelector(this.selectors.title),
      discount: form.querySelector(this.selectors.discount),
      slider: form.querySelector(this.selectors.slider),
      slidesContainer: form.querySelector(this.selectors.slidesContainer),
      sliderButtonPrev: form.querySelector(this.selectors.sliderButtonPrev),
      sliderButtonNext: form.querySelector(this.selectors.sliderButtonNext),
      pricesContainer: form.querySelector(this.selectors.pricesContainer),
      priceOld: form.querySelector(this.selectors.priceOld),
      price: form.querySelector(this.selectors.price),
      colorsContainer: form.querySelector(this.selectors.colorsContainer),
      colorButtons,
      sizesContainer: form.querySelector(this.selectors.sizesContainer),
      sizeButtons,
      submit: form.querySelector(this.selectors.submit),
    }
  }
  
  private updateListeners(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }
  
  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement
    
    if(target.closest('[data-modal-open=preview]')) {
      const card: HTMLElement = target.closest('[data-catalog=card]')
      if(card.classList.contains('_disabled')) event.preventDefault()
      
    }
    
    if(target.closest(this.selectors.colorButton)) {
      const button: HTMLElement = target.closest(this.selectors.colorButton)
      if(this.elements === false) return
      
      this.elements.colorButtons.forEach((element: HTMLElement) => element.classList.remove('active'))
      button.classList.add('active')
    }
    
    if(target.closest(this.selectors.sizeButton)) {
      const button: HTMLElement = target.closest(this.selectors.sizeButton)
      if(this.elements === false) return
      
      this.elements.sizeButtons.forEach((element: HTMLElement) => element.classList.remove('active'))
      button.classList.add('active')
    }
  }
}
