export function getClassesColor(data) {
  const classesMapping = {
    'limited-visibility': '#e17e1e',
    'moderate-visibility': '#ffb628',
    'good-practice': '#006134',
    'industry-leading': '#006134',
  }
  return classesMapping[data] || '#000000de'
}
