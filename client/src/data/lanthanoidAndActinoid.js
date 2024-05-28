let LANTHANOID_AND_ACTINOID = []

for (let i = 57; i <= 71; i += 1) {
  LANTHANOID_AND_ACTINOID.push(i)
}

for (let i = 89; i <= 103; i += 1) {
  LANTHANOID_AND_ACTINOID.push(i)
}

export const getElementLocation = (number, period, group) => {
  if (LANTHANOID_AND_ACTINOID.includes(number)) {
    return {
      gridColumn: group + 1,
      gridRow: period + 2,
    }
  } else
    return {
      gridColumn: group,
      gridRow: period,
    }
}
