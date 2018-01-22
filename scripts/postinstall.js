var exec = require('child_process').exec;
console.log( __dirname )
process.chdir(__dirname + '/../ios/Vendor')
exec('git clone https://github.com/rs/SDWebImage.git', function(){
	process.chdir(__dirname + '/../')
	exec('git submodule update --init --recursive')
})