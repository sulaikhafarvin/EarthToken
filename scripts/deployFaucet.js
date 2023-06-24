const { ethers, run, network } = require("hardhat")

async function main() {
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        const Faucet = await ethers.getContractFactory("Faucet")
        // EarthToken address : 0x3c933fb202f6170eda0f1145751352aAE0024C30
        const faucet = await Faucet.deploy("0x3c933fb202f6170eda0f1145751352aAE0024C30") 
        await faucet.waitForDeployment()
        const address = await faucet.getAddress()
        console.log(`Earth Token deployed:${address}`)

        const args = ["0x3c933fb202f6170eda0f1145751352aAE0024C30"]
        console.log("Waiting for block confirmations....")
        await faucet.deploymentTransaction().wait(6)
        await verify(address, args)
    }
}
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

