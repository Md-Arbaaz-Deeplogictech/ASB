/*
*(C) 2018 TekMonks. All rights reserved.
Create New ASB messages for each new Probill No. on Data Queue of AS/400
*/

let messageCreation = (msg, routeName, messageContainer) => {
    let message = MESSAGE_FACTORY.newMessage();
    message.content = msg;
    message.addRouteDone(routeName);
    messageContainer.add(message);
}

exports.start = async (routeName, Data, messageContainer, message) => {
    if (message.env[routeName]?.isProcessing) return;
    if (!message.env[routeName]) message.env[routeName] = {isProcessing: true};
    message.setGCEligible(false);

    try {
        LOG.info(`[Camelot-GET REQUEST DATA] Received data ${JSON.stringify(message.content)}`);
        if (message.content && Object.keys(message.content).length) {   //Check the flag for data
            Object.keys(message.content).forEach(id => {
                let msg = {
                    "id": id,
                    "token": message.content[id]
                }
                LOG.info(`data passing to message function: ${JSON.stringify(msg)}`);
                messageCreation(msg, Data.outputs[0], messageContainer);
            });
            message.addRouteDone(routeName);
            message.setGCEligible(true);
        }
        else {
            LOG.error(`[Camelot-GET REQUEST DATA] Error: API400 Failed to poll Data Queue for Probill No.`);
            message.addRouteError(routeName);
            message.setGCEligible(true);
        }
    } catch (error) {
        LOG.error(`[Camelot-GET REQUEST DATA] Error : ${error}`);
        message.addRouteError(routeName);
        message.setGCEligible(true);
    }

}