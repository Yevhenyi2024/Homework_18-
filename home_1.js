function sumArrayPromise(numbers) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(numbers) || !numbers.every(num => typeof num === 'number')) {
            reject(new Error('Вхідні дані повинні бути масивом чисел'));
            return;
        }
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        setTimeout(() => {
            resolve(sum);
        }, 3000);
    });
}
sumArrayPromise([1, 2, 3, 4, 5])
    .then(sum => {
        console.log(`Сума чисел: ${sum}`);
    })
    .catch(error => {
        console.error('Помилка:', error.message);
    });
