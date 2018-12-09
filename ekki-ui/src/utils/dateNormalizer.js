const dateNormalizer = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
  }
};

export default dateNormalizer;
