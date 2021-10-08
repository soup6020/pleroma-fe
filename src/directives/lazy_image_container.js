
import lozad from 'lozad'

const LazyImageContainer = {
  inserted (el) {
    const images = el.querySelectorAll('img')
    console.log(images.length)
    el.$observer = lozad(images)
    el.$observer.observe()
  }
}

export default LazyImageContainer
