import {Card, CardContent} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {useState} from 'react';
import Dropzone from './Dropzone';
import '../components/Redeem.css';

function Redeem(){
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmits = (event) => {
        event.preventDefault();

        const payload = {
            'title': title, 
            'link: ': link, 
            'description: ': description
        }

        console.log(payload);
    }

    const handleTitleChanges = (event) => {
        setTitle(event.target.value);
    }

    const handleLinkChanges = (event) => {
        setLink(event.target.value);
    }

    const handleDescriptionChanges = (event) => {
        setDescription(event.target.value);
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
                                <Dropzone />
                                

                                <TextField 
                                    id="title" 
                                    label="Title"
                                    fullWidth
                                    variant="filled" 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={title} 
                                    onInput={e=>setTitle(e.target.value)} 
                                    onChange={handleTitleChanges}
                                />

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
                            <div> {} </div>
                            <h3> Title </h3>
                            <div> {title}</div>
                            <h3> Link </h3>
                            <div> {link}</div>
                            <h3> Description </h3>
                            <div> {description}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Redeem;