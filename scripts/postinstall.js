const util = require('util');
const exec = util.promisify(require('child_process').exec)
async function main() {
	let dirname = __dirname + '/../ios/Vendor'
	console.log( dirname )
	try{
		process.chdir(dirname)
		console.log(`changed to ${dirname}`)
	}catch( err ){
		console.error(`chdir: ${err}`);
	}

	await exec('git clone https://github.com/rs/SDWebImage.git')

	console.log('cloned')

	dirname = __dirname + '/../ios/Vendor/SDWebImage'
	try {
		process.chdir(dirname)
		console.log(`changed to ${dirname}`)
	} catch (err) {
		console.error(`chdir: ${err}`);
	}

	await exec('git submodule update --init --recursive')

	console.log('submodule updated')	
}
main()