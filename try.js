test={
    badminton : 1,
    football : 2,
    cricket : 5
}


for (let key in test) {
    console.log(`The quantity of ${key} is ${test[key]}`);
}