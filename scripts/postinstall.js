var exec = require('child_process').exec;
process.chdir('../ios/Vendor')
exec('git clone https://github.com/rs/SDWebImage.git')