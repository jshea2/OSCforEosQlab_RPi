## **Use Raspberry Pi as OSC filter for Eos -> QLab Triggering**

A common issue is Eos can only use UDP for sending OSC. So it only sends a single OSC message and packets have been dropped causing cues that don't fire. When a cue is fired Eos sends a bunch of commands at the same time. This script uses redundancy to check for 3 seperate OSC commands to ensure OSC is sent and interpreted to trigger QLab.

Note:
It will not pass any OSC that starts with `/eos`, with the exception of the OSC that it uses to interpret it for QLab. If the OSC message does not start with `/eos` then it will be sent. This allows you to send OSC Macros for all QLab commands like `/panic`, `/pause` & `/resume`
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

<img width="342" alt="Screenshot 2023-05-04 at 12 33 01 AM" src="https://user-images.githubusercontent.com/70780576/236139243-71b71b77-b213-439f-8729-b1ea0b3f6f88.png">

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


<img width="209" alt="Screenshot 2023-05-04 at 12 23 24 AM" src="https://user-images.githubusercontent.com/70780576/236138561-1f80b20a-d2c6-40cb-b10d-1a506afbfc36.png">



