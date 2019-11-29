let instance = null

class database {
    constructor(name){
        if (!instance){
            instance = this
            this.name = name
        }
        return instance  // single pattern = ' sinh ra 1 object duy nhat trong ca app

    }
    static  shareInstance(){
        // phương thức này sẽ khởi tạo 1 lần    
        return new database('this is database')
    } 

}

module.exports = database