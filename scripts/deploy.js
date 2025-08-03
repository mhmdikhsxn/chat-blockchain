const hre = require('hardhat')

const deploy = async () => {
  const factory = await hre.ethers.getContractFactory('Chat');
  const chat = await factory.deploy()
  console.log('Addres', chat.target);
}

deploy()
