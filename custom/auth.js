exports.start = async (routeName, auth, messageContainer, message) => {
    console.log(auth);
    if (!message.content.error && (message.content.data.email == message.env.datatowrite.id)) {
        message.env.result = true;
        message.env.status = "register successfully"
    }
    else {
        message.env.result = false;
        message.env.status = "ID or Password wrong"
    }
    message.addRouteDone(routeName);
    message.setGCEligible(true);
}