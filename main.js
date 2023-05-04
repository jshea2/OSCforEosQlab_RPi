const RxPort = 8000;
const TxPort = 53000;
const TxIP = 'localhost';


const osc = require('node-osc');

// Server
const server = new osc.Server(RxPort, 'localhost');

let cueFired = false;

server.on('message', (msg) => {
  console.log(`Message received: ${msg}`);

  // If the message doesn't start with '/eos', send it to QLab
  if (!msg[0].startsWith('/eos')) {
    sendOscToQLab(msg[0]);
    return;
  }

  if (!cueFired) {
    let cueNumber;

    // Check if the message is an '/eos/out/event/cue' message
    if (msg[0].startsWith('/eos/out/event/cue/1') && msg[0].endsWith('/fire')) {
      cueNumber = msg[0].split('/')[6];
    }
    // Check if the message is an '/eos/out/active/cue' message
    else if (msg[0].startsWith('/eos/out/active/cue/1') && msg[1] === 0) {
      cueNumber = msg[0].split('/')[6];
    }
    // // Check if the message is an '/eos/out/active/cue' message
    // else if (msg[0] === ('/eos/out/active/cue/text')){
    //   cueNumber = msg[1][0];
    // }
    // Check if the message is an '/eos/out/active/cue' message
    else if (msg[0].startsWith('/go') && msg[1] === 0) {
      cueNumber = msg[0].split('/')[2];
    }

    if (cueNumber) {
      cueFired = true;

      // Send OSC message to QLab
      sendOscToQLab(`/go/${cueNumber}`);
    }
  }
  cueFired = false;
});

server.on('error', (error) => {
  console.error(`Error: ${error}`);
});

console.log('OSC Server listening on port 8001');

// Function to send OSC message to QLab
function sendOscToQLab(address) {
  const qlabClient = new osc.Client(TxIP, TxPort); // Replace with QLab's IP address and OSC port
  const message = new osc.Message(address);

  qlabClient.send(message, (error) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else {
      console.log(`Message sent to QLab: ${message.address}`);
    }
    qlabClient.close();
  });
}
