//import logo from './logo.svg';
import './App.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';
import  QRCode  from 'qrcode';
import { Image } from 'primereact/image';
import { Message } from 'primereact/message';






function App() {

      //User Input
      //Generat Code
      //Download QrCode

  const [query , setQuery] = useState('');
  const [qrUrl , setQrUrl] = useState('');
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
 

  const generateQrCodeFromText = async () => {

    if (query.trim() === '') { //If empty display the warning message
      setShowError(true);
      return;
    }
    setShowError(false);

    try{
      const dataUrl = await QRCode.toDataURL(query);
      setQrUrl(dataUrl); //QrCode is saved in the State Varible, after its generated
    } catch(e){
      console.log(e);
      
    }
  };
  
  
  const generateQrCodeFromContactInfo = async () => {
    if (name.trim() === '' || phone.trim() === '' || address.trim() === '') {
      setShowError(true);
      return;
    }
    setShowError(false);
  
    try {
      //Format the contact information as a vCard
      const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nADR:${address}\nEND:VCARD`;
      
      //Generate QR code from the vCard
      const dataUrl = await QRCode.toDataURL(vCardData);
      setQrUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code from contact info:', error);
    }
  };
  
  

  const downloadQrCode = () => {
    try{
      const link = document.createElement('a') //Hidden Link 
      link.href = qrUrl //Pass to it the qrUrl
      link.download = encodeURIComponent('YourQrCode') //Saved file Name 'Qr Code'
      link.style.display = 'none' //invisible link to the screen

      document.body.appendChild(link); // Append the link to the document body

      link.click() //on click to download, but link won't be displayed

      // Wait for a brief moment before removing the link
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100); // 100 milliseconds delay

    }catch(e){
      alert('Failed To Downlaod ... Sorry!')
    }
  };

  return (
    <div className="App">

      {showError && <Message severity="warn" text="Enter a valid Message" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: '9999' }} />}

      <h1 style={{ marginTop: '10vh '}}> Qr Code Generator </h1>

      <p style={{ fontSize: '20px', color: '#D0C0EC', fontFamily: 'Monospace'}}> Hey! You can enter your url, or any text to generate a QrCode For it </p>

      <InputTextarea autoResize placeholder='Type Here' value={query} onChange={(e) => setQuery(e.target.value)} rows={5} cols={30} />

      <br/><br/>

      <Button label="Generate QR Code" icon="pi pi-check" iconPos="right" onClick={generateQrCodeFromText} />

       <br/><br/>

       <p style={{ fontSize: '20px', color: '#D0C0EC', fontFamily: 'Monospace'}}> Here , You can enter your Contact Information to generate a QrCode For it </p>

      <div style={{ marginTop: '20px' }}>
        <InputTextarea autoResize placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <InputTextarea autoResize placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginLeft: '10px' }} />
        <InputTextarea autoResize placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginLeft: '10px' }} />
      </div>

      <Button label="Generate QR Code from Contact Info" icon="pi pi-check" iconPos="right" onClick={generateQrCodeFromContactInfo} style={{ marginTop: '10px' }} />

      <div>
        {
          qrUrl.length ? ( //To Print the Generated QrCode
            <>
              
              <Image src={qrUrl} alt="qrcode" style={{ minWidth:'20vw', width: 'fit-content', margin: '10vh auto'}} width='300' preview /> 
            
              <br/>

              <Button label="Download" icon="pi pi-check" iconPos="right" onClick={downloadQrCode} />

            
            </>
          ) : ''
        }
      </div>

    </div>
  );
}

export default App;



