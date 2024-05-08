export const isSmartPhone = (): boolean => {
	return !!navigator.userAgent.match(/iPhone|Android.+Mobile/);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function throttle(fn: (...args: any[]) => void, wait: number) {
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
}
