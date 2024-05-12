export const isSmartPhone = (): boolean => {
	return !!navigator.userAgent.match(/iPhone|Android.+Mobile/);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const throttle = (fn: (...args: any[]) => void, wait: number) => {
	let timerId: number | null = null;
	return (...args: any[]) => {
		if (timerId !== null) {
			return;
		}
		timerId = window.setTimeout(() => {
			timerId = null;
			return fn(...args);
		}, wait);
	};
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
