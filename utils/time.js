import { intervalToDuration } from 'date-fns'

function zeroPad(number) {
  return ('0' + number).slice(-2)
}

export function formatVideoDuration(_seconds) {
  const duration = intervalToDuration({ start: 0, end: _seconds * 1000 })

  const { hours, minutes, seconds } = duration

  if (hours) {
    return `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`
  }

  if (minutes) {
    return `${minutes}:${zeroPad(seconds)}`
  }

  return `0:${zeroPad(seconds)}`
}
