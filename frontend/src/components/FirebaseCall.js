import { useEffect, useState } from "react";
import {firestoreRef} from './Firebase';
import '../components/FirebaseCall.css';

function Firebase(){
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        const getBoxData = async() => {
            const response = firestoreRef.collection('boxData');

            response.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data());
                });

                console.log(items);
                setBoxes(items);
            })
        }
        getBoxData()
    }, []);

    return (
        <div>
            {
                boxes && boxes.map((box, index)=> {
                    return(
                        <div key={index}>
                            <p>{box.title}</p>
                            <p>{box.description}</p>
                            <p>{box.imageLink}</p>
                            <p>{box.websiteLink}</p>
                        </div>
                    );
                })
            }
        </div>

    );
}

export default Firebase;