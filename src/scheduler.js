const ENOUGH_TIME = 1; // 1 millisecond

let workQueue = [];
let nextUnitOfWork = null;

function schedule(task) {
	workQueue.push(task);
	requestIdleCallback(performWork);
}

function performWork(deadline) {
	if (!nextUnitOfWork) {
		nextUnitOfWork = workQueue.shift();
	}

	while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
	}

	if (nextUnitOfWork || workQueue.length > 0) {
		requestIdleCallback(performWork);
	}
}