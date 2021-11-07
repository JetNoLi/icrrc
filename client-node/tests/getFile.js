const time = require('./measure');
const {getFile} = require('../index');
const execute = require('./measure');

const config ={
    header: [
        {id: 'n', title: 'n'},
        {id: 'time', title: 'times [ms]'}
    ],
    path: './csv/getFile.csv'
}

execute(1000, getFile, config).then( res => console.log(res))