
function removeOffsetFromSignal2(mode, offset, signal2) {
  if ((mode === 2 || mode === 3) && typeof offset === "number" && !isNaN(offset)) {
    for (let i = 0; i < signal2.length; i++) {
      signal2[i] -= offset;
    }
  }
  return signal2;
}
