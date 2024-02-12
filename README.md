### Форкаем необходимые сети 
```shell
npx hardhat node --fork https://sepolia.infura.io/v3/[infura_api_key]
```

```shell
npx hardhat node --port 8546 --fork https://polygon-mumbai.infura.io/v3/[infura_api_key]
```

## Запускаем скрипты деплоя контрактов 

P.S. На localhost очевидно баланс в сети dst не изменится, это все делается для проверки скриптов)
```shell
 npm run deploy localhost  
 npm run deploy localhost6

 npx hardhat peer --remote localhost6 --network localhost
 npx hardhat peer --remote localhost --network localhost6

 npx hardhat send --to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --value 1 --dst localhost6 --network localhost

 npx hardhat balance --address 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network localhost
 npx hardhat balance --address 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network localhost6
```

## Транзакция бриджа токенов: 
https://testnet.layerzeroscan.com/tx/0xd5d2c2d6dd7e0f3b337983f0402ef0c0bfcdc9995de4bc60e2300c75b3155ad6

Все адреса при деплое записываются в ./scripts/constants.json 
```shell

"Token_sepolia": "0xc78401AC1a5237113845C0c3E5beA06aFAa87639",
"Proxy_sepolia": "0x5Ef3cB69b93FcccC6Cbe684403D8F01307483b84",
"Token_mumbai": "0x4f6B9F58CC3C707E63BA709014D1BEF4f254f177",
"Proxy_mumbai": "0xc1f96b1fA04f482b78530Af6078c3c1BBA4FC196"
```

Если лень проверять скриптами - все контракты верифицированы, поэтому идем смотреть через обозревателей
```shell
https://sepolia.etherscan.io/address/0xc78401ac1a5237113845c0c3e5bea06afaa87639#readContract
https://mumbai.polygonscan.com/address/0x4f6B9F58CC3C707E63BA709014D1BEF4f254f177#readContract
```

Просто смотрим в totalSupplay: на sepolia - 99, в mumbaях 101



