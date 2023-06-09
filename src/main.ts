import 'restyle.css'
import 'restyle.css/dist/checkboxes.css'
import 'src/styles/main.scss'
import 'src/components'
import lazyloadInstance from 'src/scripts/lazyload-instance'
import { modals } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'
import { Select } from 'src/modules/select/select'
import { Details } from 'src/modules/details/details'
import { Masks } from 'src/modules/masks/masks'

document.addEventListener('DOMContentLoaded', () => {
  lazyloadInstance.update()
  globalScrollController.listen()
  modals.init()
  new Select().init()
  new Details().init()
  new Masks().init()
})
