import {Card, CardContent} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import '../components/Redeem.css';

// Styling
const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
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
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
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

function Redeem(){
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);

    // Dropzone
    // accept all img type: use image/*
    const {
        getRootProps, 
        getInputProps, 
        isDragActive, 
        isDragAccept, 
        isDragReject
    } = useDropzone({accept: 'image/jpeg, image/png', onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)})));
        }
    });

    const previewThumbnail = files.map(file => (
        <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
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

    // POST 
    const handleSubmits = (event) => {
        event.preventDefault();
        
        // Add image to payload
        const payload = {
            'title': title, 
            'link: ': link, 
            'description: ': description
        }

        console.log(files);
    }

    return (
        <div className="redeem-container"> 
            <div className="redeem-child">
                <div className="redeem-header">
                    <h1> Reedem your space </h1>
                </div>

                <div className="insert"> 
                    <Card> 
                        <CardContent>
                            <h2> Upload Media </h2>

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
                                
                                <div className="insert-textfield">
                                    <TextField 
                                        id="title" 
                                        label="Title"
                                        fullWidth
                                        variant="filled" 
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{maxLength:90}}
                                        value={title} 
                                        onInput={e=>setTitle(e.target.value)} 
                                        onChange={handleTitleChanges}
                                    />
                                </div>

                                <div className="insert-textfield">
                                    <TextField 
                                        id="link" 
                                        label="Link"
                                        fullWidth 
                                        variant="filled" 
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={link} 
                                        onInput={e=>setLink(e.target.value)} 
                                        onChange={handleLinkChanges}
                                    />
                                </div>

                                <div className="insert-textfield">
                                    <TextField 
                                        id="description"
                                        label="Description" 
                                        fullWidth 
                                        variant="filled"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={description} 
                                        onInput={e=>setDescription(e.target.value)} 
                                        onChange={handleDescriptionChanges}
                                    />
                                </div>

                                <div className="redeem-button">
                                    <Button type="submit"> Reedem </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="redeem-child"> 
                <div className="preview-header">
                    <h1> Preview </h1>
                </div>
                <div className="preview">
                    <Card>
                        <CardContent>
                            <h3> Image </h3>
                            <div className="preview-content"> {previewThumbnail} </div>
                            <h3> Title </h3>
                            <div className="preview-content"> {title}</div>
                            <h3> Link </h3>
                            <div className="preview-content"> {link}</div>
                            <h3> Description </h3>
                            <div className="preview-content"> {description}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Redeem;