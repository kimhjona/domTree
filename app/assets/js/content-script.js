// Beginning of stress testing functionality - records click events on links as example
// let actions = []
// $(document).ready(function () {
//     $('a').on('click', function (e) {
//         actions.push({
//             'Click': [e, $(this)]
//         });
//         console.log(actions)

//         chrome.storage.local.set({
//             'macros': actions
//         }, function () {
//             return
//         });

//         chrome.storage.local.get('macros', function (result) {
//             if (result.macros) {
//                 console.log('macros', result.macros);
//             }
//         });
//     })
// });

let urlz;
let oldUrl;
let check;

// retrieve and save background color of application
$(document).ready(function () {
    const bgColor = $('body').css('backgroundColor')

    chrome.storage.sync.set({
        'backgroundColor': bgColor
    }, function () {
        return
    });
})

//inspect page for node count changes and if change then capture state on devtools.js

nodeCounter = function () {
    chrome.storage.sync.get('traveledThroughTime', function (result) {
        if (!result.traveledThroughTime) {
          urlz = window.location.href;
            chrome.storage.sync.get('urlz', function () {
                check = urlz;
            });
            if (urlz !== check) {
                chrome.storage.sync.set({
                    'urlz': urlz
                }, function () {
                    return
                });
            }
        }
    })
}

// retrieve initial node count for comparison against future node counts
firstNodeCounter = function () {
    oldUrl = window.location.href;
    chrome.storage.sync.set({
        'oldUrl': urlz
    }, function () {
        return
    });
}

window.onload = firstNodeCounter();

setInterval(nodeCounter, 300);