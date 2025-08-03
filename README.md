# Global Chat App berbasis Smart Contract Blockchain dengan Hardhat

![Image Preview](https://github.com/zeative/chat-blockchain/blob/main/preview.jpg?raw=true)

#### 👉 [Demo Website](https://bchainchat.vercel.app/)

#### 🎯 Cara install

> [!IMPORTANT]
> Pastikan Web Browser ter-install [MetaMask Extensions](https://metamask.io/)

```bash
$ git clone https://github.com/zeative/chat-blockchain.git
$ cd chat-blockchain
$ npm i
```

#### 🤖 Jalankan node dan compile

```bash
$ npx hardhat node
$ npx hardhat compile
$ npx hardhat run scripts/deploy.js --network localhost
```

Lalu copy Addres yang muncul di log

```bash
Addres 0x610178dA211F.....
```

Buka file `scripts/ethers.js` lalu ganti `0x610178dA211FEF7D417bC0e6FeD39F05609AD788` dengan addres yang sudah dicopy.

#### 🖼️ Akses Web Page

Bukan file `index.html` dan jalankan dengan **Live Server** yang ada di vscode atau apapun itu.

#### ~ Happy Coding!
