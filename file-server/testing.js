const detect = require('./face/detect');
const execute = require('./tests/measure');

const config ={
    header: [
        {id: 'n', title: 'n'},
        {id: 'time', title: 'times [ms]'}
    ],
    path: './csv/model.csv'
}

execute(10, () => detect('./images/bbt1.jpg'), config).then( res => console.log(res, 1))
execute(10, () => detect('./images/test.jpg'), config).then(res => console.log(res, 2))
execute(10, () => detect('./images/disgusted.jpg'), config).then(res => console.log(res, 3))
execute(10, () => detect('./images/angry.jpg'), config).then(res => console.log(res, 4))
execute(10, () => detect('./images/test.png'), config).then(res => console.log(res, 5))