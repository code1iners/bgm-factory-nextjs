const useString = () => {
  const capitalizer = (text: string): string =>
    `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;

  return { capitalizer };
};

export default useString;
