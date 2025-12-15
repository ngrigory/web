function removeOffsetFromSignal1(mode, offset, signal1) {
  if ((mode === 1 || mode === 3) && typeof offset === "number" && !isNaN(offset)) {
    for (let i = 0; i < signal1.length; i++) {
      signal1[i] -= offset;
    }
  }
  return signal1;
}