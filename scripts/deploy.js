const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("alpaca");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("alex", {
    value: hre.ethers.utils.parseEther("0.3"),
  });
  await txn.wait();
  console.log("Minted domain alex.alpaca");

  txn = await domainContract.setRecord("Help you find an apartment");
  await txn.wait();
  console.log("Set record for alex.alpaca");

  const address = await domainContract.getAddress("alex");
  console.log("Owner of domain alex:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
