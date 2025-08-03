let metamask;
let address;
let contract;

const check = () => {
  if (!window.ethereum) {
    alert('Anda tidak memilik MetaMask Wallet Provider, Silahkan install https://metamask.io/')
  }
}

const login = async () => {
  check()
  await ethereum.request({ method: 'eth_requestAccounts' });

  metamask = new ethers.BrowserProvider(window.ethereum);

  const signer = await metamask.getSigner();
  address = await signer.getAddress();
  contract = new ethers.Contract("0x610178dA211FEF7D417bC0e6FeD39F05609AD788", abi, signer)
}

const chats = async (lazy) => {
  const msg = await contract.getMessages();
  const json = JSON.parse(JSON.stringify(msg))
  const data = lazy ? [...json, lazy] : json

  let html = ''

  for await (chat of data) {
    const date = new Date(Number(chat[2])).toLocaleString()
    const isMe = address == chat[0]
    const isOwner = await contract.getOwner() == chat[0]

    html += `
    <div class="flex items-start ${isMe && 'justify-end'}">
      <div class="${isMe && 'text-right'}">
        <div class="text-xs text-gray-500">
          ${isMe ? 'You' : chat[0]}
        </div>
        <div
          class="my-1 ${isMe && 'ml-auto'} bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-700 text-xs w-fit"
        >
          ${chat[1]}
        </div>
        <div class="text-[10px] text-gray-400">
          ${date}
        </div>
      </div>
    </div>
    `
  }

  document.getElementById('messages').innerHTML = html
}

const send = async () => {
  const text = document.getElementById('text').value?.trim();
  if (!text) return;

  await contract.sendMessage(address, text, String(Date.now()));
  await chats([address, text, String(Date.now())])

  document.getElementById('text').value = ''
}

window.ethereum.on("accountsChanged", async (accounts) => {
  window.location.reload()
});

window.addEventListener('load', async () => {
  if (!address) {
    document.getElementById('identity').classList.add('hidden')
    document.getElementById('login').classList.remove('hidden')
    document.getElementById('alert')?.classList?.remove('hidden')
  }

  await check()
  await login()

  if (address) {
    await chats()
    document.getElementById('identity').classList.remove('hidden')
    document.getElementById('login').classList.add('hidden')
    document.getElementById('alert')?.classList?.add('hidden')

    document.getElementById('address').innerText = address;
  }
})

