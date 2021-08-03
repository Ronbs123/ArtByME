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
                if(data.result == true){ // if the user found
                    // security
                    location.replace('/Store.html')
                } else {
                    console.log(data.result)
                    alert("User doesn't exists, please try again")
                    location.replace('/Index.html')
                }
            } else {
                alert("error occured, refreshing page")
                location.replace('/Index.html')
            }
        } else {
            alert("Please make sure that the username and the password's length is more than 2")
        }
    })
})
