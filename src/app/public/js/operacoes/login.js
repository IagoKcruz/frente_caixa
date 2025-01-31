function login(){
    var button = document.getElementById("entrar")
    button.addEventListener("click", async(e)=>{
        e.preventDefault();
        let body = JSON.stringify({ email : "iago@gmail"});
        const resToken = await fetch("/caixa/login", {headers: { "Content-Type": "application/json" }, body: body, method : "POST"})
        let token = await resToken.json();

        localStorage.setItem("token", token)

        window.location.href = "/caixa/dashboardadmin"
    })
}

login();