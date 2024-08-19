async function concurrentPromises(promises, maxConcurrent) {
    const results = [];
    const runningPromises = [];
    for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        const resultPromise = promise
            .then(result => {
                results[i] = result;
            })
            .finally(() => {
                const index = runningPromises.indexOf(resultPromise);
                if (index > -1) {
                    runningPromises.splice(index, 1);
                }
            });
        runningPromises.push(resultPromise);
        if (runningPromises.length >= maxConcurrent) {
            await Promise.race(runningPromises);
        }
    }
    await Promise.all(runningPromises);

    return results;
}
concurrentPromises([
    new Promise(resolve => setTimeout(() => resolve('Promise 1'), 1000)),
    new Promise(resolve => setTimeout(() => resolve('Promise 2'), 500)),
    new Promise(resolve => setTimeout(() => resolve('Promise 3'), 800))
], 2).then(console.log);

