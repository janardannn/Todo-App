export function RegisterUser(res, Users, username, hashedPassword) {

    //check  if user already exists
    console.log("Registering user: " + username)
    const user = new Users({
        username,
        hashedPassword,
    });

    let saveUser = async function () {
        await user.save();
    }
    saveUser();

    res.status(200).json({
        msg: "User registration successfull!"
    })

    console.log("Registration successfull!");
}
