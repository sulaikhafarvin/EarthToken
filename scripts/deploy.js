const { ethers } = require("hardhat")

async function main() {
    const EarthToken = await ethers.getContractFactory("EarthToken")
    const earthToken = await EarthToken.deploy(100000000, 50)

    await earthToken.waitForDeployment()

    const address = await earthToken.getAddress()

    console.log(`Earth Token deployed:${address}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
