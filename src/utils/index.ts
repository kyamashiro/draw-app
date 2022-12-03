export const isSmartPhone = (): boolean => {
  return !!navigator.userAgent.match(/iPhone|Android.+Mobile/);
};
