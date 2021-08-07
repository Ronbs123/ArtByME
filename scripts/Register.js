console.log("This is my Register page")
window.addEventListener('load', ()=>{ //post to a route that registers the user to the db

    const logInButton = document.getElementById('go')
    logInButton.addEventListener('click', async(clickEvent)=>{
        console.log('Create new user in clicked')
        const user = document.getElementById("user").value
        const pass = document.getElementById("pass").value
        if(user.length > 2 && pass.length > 2) { // conditions for usernames and password
            console.log(`Sending user:${user} and password:${pass} to the server`)
            let response = await fetch(`/register/${user}/${pass}`, {
                method: 'post'
            })
            const data = await response.json()
            console.log(data)
            if(response.ok){
                if(data.result == true){
                    document.getElementsByClassName('error')[0].innerText = (`User: ${user} with password: ${pass} has been created`)
                    //location.replace('/HomePage.html')
                } else {
                    document.getElementsByClassName('error')[0].innerText = (`User: ${user} already exists, please try another username`)
                    //location.replace('/Register.html')
                }
            } else {
                document.getElementsByClassName('error')[0].innerText = "An error occurred, refreshing page..."
                location.replace('/Register.html')
            }
        } else {
            alert("Please make sure that the username and the password's length is more than 2")
        }
    })
})
