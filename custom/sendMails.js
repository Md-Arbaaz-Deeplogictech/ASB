exports.start = async (routeName, sendMails, messageContainer, message) => {
    console.log(sendMails);
    const data = message.content;
    Object.keys(data).forEach(key => {
        name (key,data[key])
    })
    async function name (id,token){
        const ans = await fetch('http://localhost:8081/emailIssues',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({"id":id , "token":token})
        })
        return ans ;
    }
}