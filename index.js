const PING = require("net-ping");
const fs = require("fs");
const SESSION = PING.createSession();

// **** START OF IP PARAMS ****
const limit = 255; // WARNING DO NOT CHANGE!!!
const stockIP = "192.168";
// **** END OF IP PARAMS ****

// **** START OF DOCUMENT PARAMS ****
const fileName = "output.txt"; // NAME OF THE FILE TO OUTPUT
const directory = "/home/cryosilver/Projects/Dev/Lab/ip-ping-scanner"; // CHANGE TO YOUR OWN LOCATION
const location = `${directory}/${fileName}`;

// Write file to document
const writeFile = (content) => {
  try {
    fs.appendFileSync(location, content, { flag: "a+" });
    //file written successfully
  } catch (err) {
    console.error(err);
  }
};
// **** END OF DOCUMENT PARAMS ****

// RUN THE PING , BOOOYAAA!!!
for (let val1 = 0, val2 = 0; val1 <= limit; val2++) {
  // Define the IP to PING
  let ip = `${stockIP}.${val1}.${val2}`;

  //Check if Value 2 is not over IP net mask params
  if (val2 <= limit) {
    //Start PING session
    SESSION.pingHost(ip, function (error, target) {
      if (error) {
        if (error instanceof PING.RequestTimedOutError) {
          // PING response NULL
          let content = target + ": Not alive \n";
          writeFile(content);
        } else {
          // PING response ERROR
          let content = target + ": " + error.toString() + "\n";
          writeFile(content);
        }
      } else {
        // PING response ALIVE
        let content = target + ": Alive \n";
        writeFile(content);
      }
    });
  } else {
    // UPDATE value 1 if value 2 to hits IP params limit and reset value 2 to 0
    val1++;
    val2 = 0;
  }
}
// END OF SCRIPT