## **Use Raspberry Pi as for filter OSC from Eos -> QLab.**

A common issue is Eos can only use UDP for sending OSC. So it only sends a single OSC message and packets have been dropped causing cues that don't fire. When a cue is fired Eos sends a bunch of commands at the same time. This script uses redundancy to check for 3 seperate OSC commands to ensure OSC is sent and interpreted to trigger QLab.
#
**Setup Rasperry Pi:**

#

**Install Node.js and npm (Node Package Manager):**

`curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs`
#
**Install PM2:**

`sudo npm install -g pm2`
#
**Install VSCode:**

`sudo apt update
sudo apt install code`

Clone github repository
Once cloned run `npm install`

Adjust `TxIP` constant IP Address in main.js to the QLab computer
#
**Start your script with PM2:**

`pm2 start main.js`

Configure PM2 to automatically start your script on boot:

`pm2 startup`
This command will generate a command that you need to run with sudo. Copy the generated command and execute it.

Save the current process list:

`pm2 save`
Now your script will automatically start when your Raspberry Pi 400 boots up.

**Setup ETC Eos OSC Settings:**

Settings > Show Control > OSC (Tab)

