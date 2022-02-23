const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("matic");
  await domainContract.deployed();

  console.log("Contract owner:", owner.address);

  // Let's be extra generous with our payment (we're paying more than required)
  let txn = await domainContract.register("a16z",  {value: hre.ethers.utils.parseEther('1234')});
  await txn.wait();

  // How much money is in here?
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  const ownerAddress = await domainContract.getRecordAddress("a16z");
  console.log(ownerAddress)
  const domainOwner = await domainContract.getDomainOwner("a16z");
  console.log(ownerAddress)
  console.log(await domainContract.getOwnedDomains())
  console.log(await domainContract.getAllNames())
}

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
