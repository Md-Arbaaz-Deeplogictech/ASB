/* 
 * js.js - Runs native JS code
 * 
 * (C) 2018 TekMonks. All rights reserved.
 */
const utils = require(`${CONSTANTS.LIBDIR}/utils.js`);

exports.start = (routeName, js, messageContainer, message) => {
    LOG.info(`[ROUTE_JS] Processing message with timestamp: ${message.timestamp}`);

    if (js.module) {require(utils.expandProperty(js.module, js.flow, message)).start(routeName, js, messageContainer, message);} else {
        try {
            const flow = js.flow; // allows JS code below to call the flow.
            eval(js.js);
            if (!js.isAsync) message.addRouteDone(routeName);
        } catch (e) {
            LOG.error(`[ROUTE_JS] Error in computing: ${e}, dropping this message`);
            LOG.error(`[ROUTE_JS] Dropping: ${JSON.stringify(message)}`);
            message.addRouteError(routeName);
        }
    }
}