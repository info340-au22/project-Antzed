import React from 'react';
import Form from "react-bootstrap/Form";
import { FormControl} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

export function UploadForm(props){
    let [register, handleSubmit, onSubmit, errors] = props.submitStuff;
    let currentUserName = props.currentUserName;

    return(
        <form id="uploadForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Title:</Form.Label>
            <FormControl name="title" type="text" {...register("title", {required:"field cannot be empty"})}   />
            <div className="upload-form-error">{errors.title &&  <Alert variant="danger"> {errors.title.message}</Alert>} </div>

            <Form.Label>Image link:</Form.Label>
            <FormControl {...register("img", {required:"field cannot be empty"})} type="text" name="img" ></FormControl>
            <div className="upload-form-error">{errors.img &&  <Alert variant="danger"> {errors.img.message}</Alert>} </div>

            <Form.Label>Description of image:</Form.Label>
            <FormControl {...register("description", {required:"field cannot be empty"})} type="text" name="description" ></FormControl>
            <div className="upload-form-error">{errors.description &&  <Alert variant="danger"> {errors.description.message}</Alert>}</div>

            <Form.Label>Content:</Form.Label>
            <FormControl {...register("content", {required:"field cannot be empty"})}type="text" name="content" as="textarea" rows={5}></FormControl>
            <div className="upload-form-error">{errors.content &&  <Alert variant="danger"> {errors.content.message}</Alert>} </div>

            <Form.Label>Author:</Form.Label>
            <FormControl {...register("author", {required:"please log in", minLength: {value: 2, message:"please log in"}})} readOnly="read-only" type="text" name="author" defaultValue={currentUserName}></FormControl>
            {/* <FormText {...register("author", {disabled:true})}>{currentUserName}</FormText> */}
            <div className="upload-form-error">{errors.author &&  <Alert variant="danger"> {errors.author.message}</Alert>} </div>

            <div className="d-grid gap-2 my-3">
                <Button variant="secondary" type="submit" size="large">Submit</Button>
            </div>

            
            
        </form>
       
    )
}