exports.start = async (routeName, header, messageContainer, message) => {
    if (message.env[routeName]?.isProcessing) return;
    if (!message.env[routeName]) message.env[routeName] = {isProcessing: true};
    message.setGCEligible(false);
    //console.log(header);
    const headers = ["Content-Type: application/json",
        `Authorization: ${message.content.token}`]
    header.flow.route1.headers = headers;
    message.env.to = message.content.id;
    //header.flow.output.to = message.content.id;
    message.env.datatowrite = message.content;
    message.content = {};
    message.addRouteDone(routeName);
    message.setGCEligible(true);
}