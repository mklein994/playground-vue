async function init() {
  // no-op
}

const getSolarEvents = (..._args: unknown[]): BigInt64Array => {
  console.warn("Faked function: getSunriseSunset");
  return new BigInt64Array();
};

export { getSolarEvents };
export default init;
