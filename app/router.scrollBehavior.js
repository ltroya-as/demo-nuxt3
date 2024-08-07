export default function (to) {
  if (to.query.tab) return
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          selector: to.hash,
          behavior: 'smooth',
          offset: { x: 0, y: 60 },
        })
      }, 500)
    })
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0, behavior: 'smooth' })
      }, 100)
    })
  }
}
