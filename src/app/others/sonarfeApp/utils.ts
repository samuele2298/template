export function formatNumber(value: number): string {
    if (value <= 0 ) return 'NA';
    if (value < 1000) {
      return value.toString() + ' $'; // No formatting for numbers less than 1000
    } else if (value >= 1000 && value < 1000000) {
      return `${(value / 1000).toFixed(0)}'000 K $`; // Format as thousands (e.g., 100'000)
    } else if (value >= 1000000 && value < 1000000000) {
      return `${(value / 1000000).toFixed(1)} M $`; // Format as millions (e.g., 1.0 mln)
    } else if (value >= 1000000000 && value < 1000000000000) {
      return `${(value / 1000000000).toFixed(1)} B $`; // Format as billions (e.g., 1.0 mld)
    } else {
      return `${(value / 1000000000000).toFixed(1)} T $`; // Format as trillions (e.g., 1.0 tln)
    }
  }