async function sequenceAsync(asyncFunctions) {
    if (!Array.isArray(asyncFunctions) || !asyncFunctions.every(fn => typeof fn === 'function')) {
        throw new Error('Вхідні дані повинні бути масивом функцій');
    }
    let result;

    for (let i = 0; i < asyncFunctions.length; i++) {
        const func = asyncFunctions[i];
        if (i === 0) {
            result = await func();
        } else {
            result = await func(result);
        }
    }

    return result;
}
const asyncFunction1 = () => Promise.resolve(1);
const asyncFunction2 = (prevResult) => Promise.resolve(prevResult + 2);
const asyncFunction3 = (prevResult) => Promise.resolve(prevResult * 3);

sequenceAsync([asyncFunction1, asyncFunction2, asyncFunction3])
    .then(result => {
        console.log(result); 
    })
    .catch(error => {
        console.error('Помилка:', error.message);
    });
