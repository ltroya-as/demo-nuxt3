import { NON_PUBLISHED_POST_STATES, PUBLISHED_POST_STATES } from './constants'

export function getAllowedPostStatuses(includeNonPublished) {
  const states = [...PUBLISHED_POST_STATES]

  if (includeNonPublished) {
    states.push(...NON_PUBLISHED_POST_STATES)
  }

  return states
}
