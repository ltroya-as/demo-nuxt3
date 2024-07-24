export function getClassesContainerActive({
  articleIndex,
  carouselIndex,
  indexMaximum,
}) {
  if (articleIndex === carouselIndex) return 'translate-x-0 z-[1]'

  if (articleIndex === 0) {
    return carouselIndex === indexMaximum
      ? 'translate-x-[100%] opacity-0'
      : '-translate-x-[100%] opacity-0'
  }

  if (articleIndex === indexMaximum) {
    return carouselIndex === 0
      ? '-translate-x-[100%] opacity-0'
      : 'translate-x-[100%] opacity-0'
  }

  return articleIndex < carouselIndex
    ? '-translate-x-[100%] opacity-0'
    : 'translate-x-[100%] opacity-0'
}
