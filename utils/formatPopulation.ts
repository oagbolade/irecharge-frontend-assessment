export const formatPopulation = (population: string) => {
  if (!population) {
    return 'N/A';
  }

  const formattedAmount = parseFloat(population).toFixed(2);
  return `${parseFloat(formattedAmount).toLocaleString(undefined)}`;
};
