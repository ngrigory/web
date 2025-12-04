function clampOffset(amplitudeInput, offsetInput) {
  const limit = 10;

  // Parse input values and ensure amplitude is positive
  let amplitude = Math.abs(parseFloat(amplitudeInput));
  let offset = parseFloat(offsetInput);

  if (isNaN(amplitude) || isNaN(offset)) {
    throw new Error("Invalid input: Amplitude and Offset must be numbers");
  }

  // Calculate valid offset bounds
  const maxOffset = limit - amplitude;
  const minOffset = -limit + amplitude;

  // Clamp offset
  if (offset > maxOffset) {
    offset = maxOffset;
  } else if (offset < minOffset) {
    offset = minOffset;
  }

  return (offset);
}
