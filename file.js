var fs = require('fs');
class File {
    getDta() { 
        console.log(fs);
        fs.writeFileSync('mynewfile3.txt' , "/n THis is new line of new ");
        // fs.appendFileSync('mynewfile3.txt' , "/n THis is new line");
        // fs.unlinkSync('mynewfile3.txt');
        return "true";
     }
}

module.exports = File;