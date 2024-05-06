/*
*(C) 2018 TekMonks. All rights reserved.
Create New ASB messages for each new Probill No. on Data Queue of AS/400
*/

exports.start = async (routeName, Data, messageContainer, message) => {
    if (message.env[routeName]?.isProcessing) return;
    if (!message.env[routeName]) message.env[routeName] = { isProcessing: true };
    message.setGCEligible(false);
    const emailList=[];
    // console.log(message.content);

    if (message.content && Object.keys(message.content).length) {   //Check the flag for data
        Object.keys(message.content).forEach(id => {
            emailList.push(id);
        });
        message.addRouteDone(routeName);
        message.setGCEligible(true);
        // console.log(emailList);
        message.env.list=emailList;
        
    }
}