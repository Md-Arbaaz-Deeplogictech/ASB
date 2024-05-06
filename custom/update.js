exports.start = async (routeName, update, messageContainer, message) => {
    console.log(update);
    if(message.env.result)
    message.content[message.env.datatowrite.id] = message.env.datatowrite.token;
    message.addRouteDone(routeName);
    message.setGCEligible(true);
}