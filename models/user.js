class User {
    constructor(id, username, password,datas,edit,file,view) {
            
            // personal information
            this.id = id;
            this.username = username;
            this.password = password;
            this.file = file;
            this.edit = edit;
            this.view = view;
            this.datas = datas;
            
    }
}

module.exports = User;