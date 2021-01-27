import freeton from "freeton";
const Test = require('../contracts/Test.json');

const _ = {
  checkExtensionAvailability() {
    if (window.freeton === undefined) {
      throw 'Extension not available.';
    }
  },
  getProvider() {
    return new freeton.providers.ExtensionProvider(window.freeton);
  }
};

window.app = {
  async run() {
    const button = document.getElementById('buttonRun');
    const data = document.getElementById('data');
    const out = document.getElementById('out');
    button.disabled = true;
    try {
      _.checkExtensionAvailability();
      const provider = _.getProvider();
      console.log('provider:', provider);
      const signer = await provider.getSigner();
      console.log('signer:', signer);
      const contract = new freeton.Contract(signer, Test.abi, Test.networks['2'].address);
      console.log('input:', contract);
      const input = {
        i: data.value || '0',
      };
      console.log('data:', input);
      const result = await contract.functions.result.run(input);
      out.innerHTML = JSON.stringify(result, null, 2);
    } catch (error) {
      out.innerHTML = JSON.stringify(error, null, 2);
    } finally {
      button.disabled = false;
    }
  }
};
