

/**
 * Generate random integer between inclusive min and inclusive max.
 *
 * @param min Inclusive minimum
 * @param max Inclusive maximum
 * @return Random integer between inclusive min and inclusive max
 */
export function generateRandomInteger(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}





















