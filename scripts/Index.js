console.log("This is my LogIn page")
window.addEventListener('load', ()=>{

    const logInButton = document.getElementById('go')
    logInButton.addEventListener('click', async(clickEvent)=>{
        console.log('Log in clicked')
        const user = document.getElementById("user").value
        const pass = document.getElementById("pass").value
        if(user.length > 2 && pass.length > 2){ // conditions for usernames and password
            console.log(`Sending user:${user} and password:${pass} to the server`)
            let response = await fetch(`/login/${user}/${pass}`, {
                method: 'post'
            })
            const data = await response.json()
            if(response.ok){
                if(data.result == 'userFound'){ // if the user found
                    // security
                    location.replace('/Store.html')
                } else {
                    if(data.result == 'wrongPassword'){
                        document.getElementsByClassName('error')[0].innerText = "Wrong password, please try again"
                    } else {
                        document.getElementsByClassName('error')[0].innerText = "User doesn't exists, please try again"
                        //location.replace('/Index.html')
                    }
                }
            } else {
                document.getElementsByClassName('error')[0].innerText = "An error occurred, refreshing page..."
                location.replace('/Index.html')
            }
        } else {
            document.getElementsByClassName('error')[0].innerText = "Please make sure that the username and the password's length contains more than 2 characters"
        }
    })
})
