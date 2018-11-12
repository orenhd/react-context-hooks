/**
 * getDocumentClickHandler
 * A higher-order function returning a document click handler for click outside events
 * @param compClass - a react component class
 * @param nodeRef - the native dom element ref. to be clicked outside
 * @param callback - the callback functio for click outside event
 */

export function getDocumentClickHandler(compClass, elRef, callback) {
    return (event) => {
        if (!elRef) return;

        if (elRef == event.target) return; //eslint-disable-line

        let curEl = event.target;

        while(curEl.parentElement) {
            if (curEl.parentElement == elRef) { //eslint-disable-line
                return;
            } else {
                curEl = curEl.parentElement;
            }
        }

        if (callback) callback();
    }
}