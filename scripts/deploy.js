const { ethers, run, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

async function main() {
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        const EarthToken = await ethers.getContractFactory("EarthToken")
        const earthToken = await EarthToken.deploy(100000000, 50)
        await earthToken.waitForDeployment()
        const address = await earthToken.getAddress()
        console.log(`Earth Token deployed:${address}`)

        const chainId = network.config.chainId
        const cap = networkConfig[chainId]["cap"]
        const reward = networkConfig[chainId]["reward"]
        const args = [cap, reward]
        console.log("Waiting for block confirmations....")
        await earthToken.deploymentTransaction().wait(6)
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

