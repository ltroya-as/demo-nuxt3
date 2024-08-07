export default class ClientDebounce {
  timeOutId

  debounce = (f, time) => {
    clearTimeout(this.timeOutId)

    this.timeOutId = setTimeout(f, time)
  }

  clear = () => {
    clearTimeout(this.timeOutId)
  }
}
