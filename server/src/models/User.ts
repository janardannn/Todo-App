export function GetUserModel(mongooseInstance) {
    const UserSchema = new mongooseInstance.Schema({
        username: String,
        hashedPassword: String
    })

    const Users = mongooseInstance.model("Users", UserSchema)
    return Users;
}