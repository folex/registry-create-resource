const { FluencePeer, KeyPair, setLogLevel } = require("@fluencelabs/fluence");
const { testNet } = require('@fluencelabs/fluence-network-environment');
const PeerId = require('peer-id');
const { createResource } = require("./test.js");

const connectTo = testNet[1];

(async () => {
    // const nodeKeypair = await KeyPair.randomEd25519();
    // const nodePeer = await initPeer(nodeKeypair)
    // const channelAdminKeypair = await KeyPair.randomEd25519();
    // const channelAdminPeer = await initPeer(channelAdminKeypair);
    // console.log("usual peer status:");
    // console.dir(channelAdminPeer.getStatus());

    // const i = await getInfo(channelAdminPeer, testNet[0].peerId, { ttl: 10000 });
    // console.log("got info:", i);

    const pid = await PeerId.create({ keyType: 'Ed25519' });
    console.log("generated peerid", pid);
    const pidPeer = new FluencePeer();
    const pidKeyPair = new KeyPair(pid);
    await pidPeer.start({ KeyPair: pidKeyPair, connectTo: testNet[0] });
    console.log("started peer", pidPeer);

    const res = await createResource(pidPeer, "myLabel", { ttl: 10000 });
    console.log("resource created", res);

    // const info = await getInfo(pidPeer, testNet[0].peerId, { ttl: 10000 });
    // console.log("got info:", info);
})().then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

async function initPeer(keypair) {
    const peer = new FluencePeer();
    await peer.start({ connectTo, KeyPair: keypair });
    return peer;
}
