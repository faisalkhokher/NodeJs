
const BaseRepository = require('../Repository/BaseRepository')

class PolicyController extends BaseRepository{
    
    getPolicies() {
        console.log("Main transaction class");
        let policies  = this.executeRawQuery("SELECT id,waada_ref_number,created_at FROM policies");
        console.log(policies);
        return policies;
    }
}

module.exports = PolicyController;
