export const isSmartPhone = (): boolean => {
	return !!navigator.userAgent.match(/iPhone|Android.+Mobile/);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const debounce = <T extends (...args: any[]) => unknown>(
	callback: T,
	delay = 100,
): ((...args: Parameters<T>) => void) => {
	let timeoutId: NodeJS.Timeout;
	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback(...args), delay);
	};
};
