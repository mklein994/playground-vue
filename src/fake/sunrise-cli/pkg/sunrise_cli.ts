async function init() {
  // no-op
}

const getSunriseSunset = (..._args: unknown[]): [number, number] => {
  console.warn("Faked function: getSunriseSunset");
  return [0, 0];
};

export { getSunriseSunset };
export default init;
