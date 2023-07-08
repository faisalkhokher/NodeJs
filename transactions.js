
const BaseRepository = require('./Repository/BaseRepository')

class transactions extends BaseRepository{
    
    getData() {
        console.log("Main transaction class");
        let policies  = this.executeRawQuery("SELECT * FROM policies");
        return policies;
    }
}

module.exports = transactions;
