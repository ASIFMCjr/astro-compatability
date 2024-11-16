import { ethers } from "ethers";

import { getNftContract, getVeriryContract } from "shared/api/contracts";
export async function deployContract({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const address = new ethers.Wallet(
    "0x019e3edeb8b1a22c75eb15b2e422f62b2cee407d98d8264547c92fd1970323e4"
  );
  const signer = await provider.getSigner();

  const { abi, bytecode } = getVeriryContract();

  // Создаем контракт
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  // Деплоим контракт
  try {
    const contract = await factory.deploy({
      gasLimit: 6721975,
    });
    console.log("Контракт успешно задеплоен:", contract.target);
    await contract.waitForDeployment();
    console.log("Подождали");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deployedContract = contract as any;
    await deployedContract.issueCertificate(
      "0x4E86Fac91d98f3884A97C38822FFB919aCaf527F",
      address.address,
      text,
      link
    );
    console.log("Вы отправили заявку на создание сертификата");
    alert("Вы отправили заявку на создание сертификата");
  } catch (error) {
    console.error("Ошибка при деплое контракта:", error);
  }
}
export async function getNfts() {
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const address = new ethers.Wallet(
    "0x019e3edeb8b1a22c75eb15b2e422f62b2cee407d98d8264547c92fd1970323e4"
  );
  const signer = await provider.getSigner();

  const { abi, bytecode } = getVeriryContract();

  // Создаем контракт
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  // Деплоим контракт
  try {
    const contract = await factory.deploy({
      gasLimit: 6721975,
    });
    console.log("Контракт успешно задеплоен:", contract.target);
    await contract.waitForDeployment();
    console.log("Подождали");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deployedContract = contract as any;
    const data = await deployedContract.getUserCertificates(address.address);
    console.log(data);
    alert("Вы отправили заявку на создание сертификата");
  } catch (error) {
    console.error("Ошибка при деплое контракта:", error);
  }
}
export async function mintNFT() {
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const address = new ethers.Wallet(
  //   "0x019e3edeb8b1a22c75eb15b2e422f62b2cee407d98d8264547c92fd1970323e4"
  // );
  const signer = await provider.getSigner();

  const { abi, bytecode } = getVeriryContract();

  // Создаем контракт
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  // Деплоим контракт
  try {
    const contract = await factory.deploy({
      gasLimit: 6721975,
    });
    console.log("Контракт успешно задеплоен:", contract.target);
    await contract.waitForDeployment();
    console.log("Подождали");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deployedContract = contract as any;
    const data = await deployedContract.verifyAndMintToken(1);
    console.log(data);
  } catch (error) {
    console.error("Ошибка при деплое контракта:", error);
  }
}

export async function deployNFT() {
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const address = new ethers.Wallet(
    "0x019e3edeb8b1a22c75eb15b2e422f62b2cee407d98d8264547c92fd1970323e4"
  );
  const signer = await provider.getSigner();

  const { abi, bytecode } = getNftContract();

  // Создаем контракт
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  // Деплоим контракт
  try {
    const contract = await factory.deploy({
      gasLimit: 6721975,
    });
    console.log("Контракт успешно задеплоен:", contract.target);
    await contract.waitForDeployment();
    console.log("Подождали");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deployedContract = contract as any;
    await deployedContract.hireEmployee(address.address);
    console.log("НФТ ЕСТЬ!!!!!!!!!!!!!!!");
    alert("NFT сертификата успешно создано");
  } catch (error) {
    console.error("Ошибка при деплое контракта:", error);
  }
}
