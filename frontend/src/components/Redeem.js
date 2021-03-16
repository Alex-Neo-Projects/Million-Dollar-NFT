import {Card, CardContent, makeStyles} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import redeemheader from '../images/redeempage/reedemspace.png';
import previewheader from '../images/redeempage/preview.png';
import uploadheader from '../images/redeempage/upload.png';
import imageheader from '../images/redeempage/image.png';
import titleheader from '../images/redeempage/title.png';
import linkheader from '../images/redeempage/link.png';
import descriptionheader from '../images/redeempage/description.png';
import {firebaseStorageRef, firestoreRef} from './Firebase';
import '../components/Redeem.css';

// Dropzone Styling
const getColor = (props) => {
    if (props.isDragAccept) {
        return '#7fcd85';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}
  
const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: solid;
    background-color: #fafafa;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 13px;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    // border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

// Card Styling
const useStyles = makeStyles({
    card: {
     borderRadius: 10,
    }, 
    textField: {
    }
});

function Redeem(){
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);

    const classes = useStyles();

    // Dropzone
    // accept all img type: use image/*
    // accept only jpeg and png 
    const {
        getRootProps, 
        getInputProps, 
        isDragActive, 
        isDragAccept, 
        isDragReject
    } = useDropzone({accept: 'image/jpeg, image/png', multiple: false, onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)})));
        }
    });

    const previewThumbnail = files.map(file => (
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="" />
        </div>
      </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    // Event Triggers
    const handleTitleChanges = (event) => {
        setTitle(event.target.value);
    }

    const handleLinkChanges = (event) => {
        setLink(event.target.value);
    }

    const handleDescriptionChanges = (event) => {
        setDescription(event.target.value);
    }

    // POST Firebase Storage. 
    const handleSubmits = (event) => {
        event.preventDefault();

        const imgFile = files[0].file;

        var uploadImage = firebaseStorageRef.ref().child('block_1').put(imgFile);

        uploadImage.on('state_changed', (snapshot) => {
            console.log('uploading');
        }, (error) => {
            console.log('error');
        }, () => {
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
                
                const payload = {
                    'title': title,
                    'link': link, 
                    'description': description, 
                    'imgFile': downloadURL
                }
                
                // Get boxNum when clicking on grid
                const boxNum = 3;
                firestoreRef.collection('boxData').doc('box_' + boxNum).set(payload).then(()=>{
                    console.log("Added to firestore");
                });
                
            });
        });
    }

    return (
        <div className="redeem-container"> 
            <div className="redeem-child">
                <div className="redeem-header">
                    <img src={redeemheader} width="400" alt="" />
                </div>

                <div className="insert">
                    <Card className={classes.card}> 
                        <div className="insert-header">
                            <img src={uploadheader} width="200" alt="" />
                        </div>
                        <CardContent>
                            <form onSubmit={handleSubmits}>

                                <div className="dropzone-container">
                                    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject})}>
                                        <input {...getInputProps()} />
                                            {
                                                isDragActive ? 
                                                <p> Drop your image here </p> : 
                                                <p> Drop or click to select image file here </p>
                                            }
                                    </Container> 
                                </div>

                                <div className="insert-link">
                                    <img src={titleheader} width="85" alt="" />
                                </div>
                                
                                <div className="insert-textfield">
                                    <TextField 
                                        id="title" 
                                        // label="Title"
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{shrink: true}}
                                        inputProps={{style: {fontFamily: "Montserrat, sans-serif", fontWeight: "700", color: "#636363"}, maxLength:67}}
                                        value={title} 
                                        onInput={e=>setTitle(e.target.value)} 
                                        onChange={handleTitleChanges}
                                    />
                                </div>

                                <div className="insert-link">
                                    <img src={linkheader} width="85" alt="" />
                                </div>

                                <div className="insert-textfield">
                                    <TextField 
                                        id="link" 
                                        // label="Link"
                                        fullWidth 
                                        variant="outlined" 
                                        InputLabelProps={{shrink: true}}
                                        inputProps={{style: {fontFamily: "Montserrat, sans-serif", fontWeight: "700", color: "#636363"}, maxLength:67}}
                                        value={link} 
                                        onInput={e=>setLink(e.target.value)} 
                                        onChange={handleLinkChanges}
                                    />
                                </div>

                                <div className="insert-link">
                                    <img src={descriptionheader} width="170" alt="" />
                                </div>

                                <div className="insert-textfield">
                                    <TextField 
                                        id="description"
                                        // label="Description" 
                                        fullWidth 
                                        variant="outlined"
                                        InputLabelProps={{shrink: true}}
                                        inputProps={{style: {fontFamily: "Montserrat, sans-serif", fontWeight: "700", color: "#636363"}, maxLength:67}}
                                        value={description} 
                                        onInput={e=>setDescription(e.target.value)} 
                                        onChange={handleDescriptionChanges}
                                    />
                                </div>

                                <div className="redeem-button">
                                    <button type="submit"> Reedem </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="redeem-child"> 
                <div className="preview-header">
                    <img src={previewheader} width="200" alt="" />
                </div>
                <div className="preview">
                    <Card className={classes.card}> 
                        <CardContent>
                            <div className="preview-image">
                                <img src={imageheader} width="100" alt="" />
                            </div>

                            <div className="preview-thumbnail"> {previewThumbnail} </div>

                            <div className="preview-title">
                                <img src={titleheader} width="100" alt="" />
                            </div>

                            <div className="preview-content"> {title} </div>

                            <div className="preview-link">
                                <img src={linkheader} width="100" alt="" />
                            </div>

                            <div className="preview-content"> {link}</div>

                            <div className="preview-description">
                                <img src={descriptionheader} width="200" alt="" />
                            </div>

                            <div className="preview-content"> {description}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Redeem;