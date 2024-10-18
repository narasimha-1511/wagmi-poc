import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { http, createConfig, useConnect, useAccount, useSendTransaction } from 'wagmi'
import { mainnet  } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { WagmiProvider } from 'wagmi';


 const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});



function App() {

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <WalletConnector />
          <MyAddress />
          <EthSend />
          <div> this is narasimha</div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function MyAddress(){
  const {address} = useAccount();
  return <div>
    {address}
  </div>
}

function WalletConnector(){

  const { connectors , connect } = useConnect();

  console.log(connectors);

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={ () => { connect({connector}) } }>
      {connector.name}
    </button>
  ))
}

function EthSend(){

  const { data: hash , sendTransaction } = useSendTransaction();

  function sendEth(){
    sendTransaction({
      to: document.getElementById('address').value,
      value: "100000000"
    }
    )
  }

  return <div>
    <input id='address' type='text' placeholder='address' ></input>
    <button onClick={sendEth}> send 0.1 eth </button>
  </div>

}

export default App
