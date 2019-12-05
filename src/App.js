import React from 'react';
// import Moment from 'react-moment';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
    };
  }

  changeImage = (event) => {
    event.preventDefault()

    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(reader)

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleUploadImage = (event) => {
    event.preventDefault();
    
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      console.log(response.json)
    });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    // const date = new Date();

    return (
      <center>
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input ref={(ref) => { this.uploadInput = ref; }} onChange={this.changeImage} type="file" />
          </div>
          <div>
            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Masukkan Nama File" />
          </div>
          <br />
          <div>
            <button type="button" onClick={this.handleUploadImage}>Upload</button>
          </div>
          <img src={imagePreviewUrl} alt="img" />
        </form>
        {/* <Moment parse="YYYY-MMMM-DD hh:mm:ss">{date}</Moment>
        <br/>
        <Moment format="YYYY-MM-DD hh:mm:ss" add={{ hours: 12 }}>{date}</Moment>
        <br/>
        <Moment format="YYYY-MMMM-DD hh:mm:ss" add={{ days: 1, hours: 12 }}>{date}</Moment>
        <br/>
        <Moment format="YYYY-MM-DD hh:mm:ss" subtract={{ hours: 12 }}>{date}</Moment>
        <br/>
        <Moment format="YYYY-MMMM-DD hh:mm:ss" subtract={{ days: 1, hours: 12 }}>{date}</Moment>
        <br/> */}
      </center>
    );
  }
}

export default App;