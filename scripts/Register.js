console.log("This is my Register page")
window.addEventListener('load', ()=>{ //post to a route that registers the user to the db

    const logInButton = document.getElementById('go')
    logInButton.addEventListener('click', async(clickEvent)=>{
        console.log('Create new user in clicked')
        const user = document.getElementById("user").value
        const pass = document.getElementById("pass").value
        if(user.length > 2 && pass.length > 2){ // conditions for usernames and password
            if(localStorage.getItem(user) !== null){
                console.log("The matched user: " + localStorage.getItem(user))
                alert("user already exists, please try another username")
                location.replace('/Register.html')
            } else {
                const newUser = {
                    userName:user,
                    password:pass,
                    cart:[],
                    purchases:[],
                    logInActivity:[]
                }
                const data = JSON.stringify(newUser)
                console.log(`Creating new user: (user:${user} and password:${pass})`)
                localStorage.setItem(user, data)
                console.log("New user have been created: " + localStorage.getItem(user))
            }
        } else {
            alert("Please make sure that the username and the password's length is more than 2")
        }
    })
})
