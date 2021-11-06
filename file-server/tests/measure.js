const {performance} = require('perf_hooks')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const time = async (func)=>{
	const startTime = performance.now();
	const result = await func();
	const endTime = performance.now()
	return endTime - startTime;
}

const execute = async (n, func, config) =>{
    const csvWriter = createCsvWriter(config);
    const times = [];
    let total = 0;

    try{
        for (let i = 0; i < n; i++){
            const timing = await time(func);
            total += timing;
            times.push(timing)
        }

        const report = {
            min: Math.min(...times),
            max: Math.max(...times),
            av: total/n,
			n
        }

        const csv = times.map( (t, index) => {
            return {
                time: t,
                n: index
            }
        })

        csvWriter.writeRecords(csv)
            .then(console.log('done'))

        return report 
    }
    catch(error){
        console.log(error)
    }
}

module.exports = execute;