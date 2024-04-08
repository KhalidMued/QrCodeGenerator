//import logo from './logo.svg';
import './App.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';
import  QRCode  from 'qrcode';
import { Image } from 'primereact/image';




function App() {
  //User Input
  //Generat Code
  //Download QrCode

  const [query , setQuery] = useState('');
  const [qrUrl , setQrUrl] = useState('');


  const generateQrCode = async () => {
    try{
      const dataUrl = await QRCode.toDataURL(query)
      setQrUrl(dataUrl) //QrCode is saved in the State Varible, after its generated

    } catch(e){
      console.log(e);
      
    }
  } 

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
  }
  return (
    <div className="App">
    <h1 style={{ marginTop: '10vh '}}> Qr Code Generator </h1>
    <InputTextarea autoResize placeholder='Type Here' value={query} onChange={(e) =>
       setQuery(e.target.value)} rows={5} cols={30} />
       <br/><br/>
       <Button label="Generate QR Code" icon="pi pi-check" iconPos="right" onClick={generateQrCode} />
       <br/>

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
  );
}

export default App;
