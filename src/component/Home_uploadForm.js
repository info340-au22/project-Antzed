import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

export function UploadForm(props){
    let [register, handleSubmit, onSubmit] = props.submitStuff;

    const [textAreaWidth, settextAreaWidth] = useState(Math.round(window.innerWidth/28));

    console.log(window.innerWidth)
    

    console.log(textAreaWidth)

    
    
    return(
        <form id="uploadForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Title:</Form.Label>
            <FormControl {...register("title")} type="text" name="title" ></FormControl>
            <Form.Text>     
            </Form.Text>

            <Form.Label>Image link:</Form.Label>
            <FormControl {...register("img")} type="text" name="img" ></FormControl>
            <Form.Text>
            </Form.Text>

            <Form.Label>Description of image:</Form.Label>
            <FormControl {...register("description")} type="text" name="description" ></FormControl>
            <Form.Text>
            </Form.Text>

            <Form.Label>Content:</Form.Label>
            <FormControl {...register("content")} type="text" name="content" as="textarea" rows={5}></FormControl>
            <Form.Text>
            </Form.Text>

            <div className="d-grid gap-2 my-3">
                <Button variant="secondary" type="submit" size="large">Submit</Button>
            </div>
            
        </form>
       
    )
}