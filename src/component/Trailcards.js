import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Bookmark } from 'react-bootstrap-icons';
import {getDatabase, ref, set as firebaseSet} from 'firebase/database';


function SingleCard(props) {
    const [isBooked, setIsBooked] = useState(false)
    const cardData = props.cardObjData
    const modalData = props.modalData
    const isSaved = cardData.isSaved
    const singleModalObj = modalData.map((modObj) => {
        if (cardData.title == modObj.id) {
            return (
                <SeeMoreButton cardsData={cardData} modalCard={modObj} key={modObj.id} />
            )
        }
    })
    
    const handleClick = (event) => {

        const db = getDatabase()
        const savedRef = ref(db, "trail/trail cards/"+cardData.key+"/isSaved")

        firebaseSet(savedRef, !isSaved)

    }
    let bmColor = "white";
    if(isSaved) {
        bmColor = "gold"
    }
    let classList = ""
    if(cardData.status === "Clear") {
        classList = "status text-success"
    } else if (cardData.status === "Use Caution") {
        classList = "status text-warning"
    } else {
        classList = "status text-danger"
    }
    return (
        <Col md={6} xl={3} className="d-flex col-auto rounded mt-4" >
            <div className="card">
                <img src={cardData.img} className=".card-img-top" alt={cardData.title} />
                <div className="card-body">
                    <Bookmark color={bmColor} onClick={handleClick} size={25} className="bookmark"/>
                    <h2 className="card-title">{cardData.title}</h2>
                    <p className="card-text">{cardData.description}</p>
                    <p className={classList}>Status: {cardData.status}</p>
                    {singleModalObj}
                </div>
            </div>
        </Col>
    )
}

function SeeMoreButton(props) {
    const modalContent = props.modalCard
    const cardsData = props.cardsData
    const isSaved = cardsData.isSaved
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleClick = (event) => {

        const db = getDatabase()
        const savedRef = ref(db, "trail/trail cards/"+cardsData.key+"/isSaved")

        firebaseSet(savedRef, !isSaved)

    }
    let bmColor = "grey";
    if(isSaved) {
        bmColor = "gold"
    }
    return (
        <div className="card-footer">
            <Button variant="primary" onClick={handleShow}>
                See More
            </Button>
            <Modal size="lg" show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Bookmark color={bmColor} onClick={handleClick} size={25} className="bookmark-modal"/>
                <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h2>{modalContent.headingTwo}</h2>
                        <p className="lead">{modalContent.keyDetails}</p>
                    </div>
                    <div>
                        <h2>{modalContent.headingThree}</h2>
                        <p>{modalContent.trailInfo}</p>
                    </div>
                    <div>
                        <h2>{modalContent.headingFour}</h2>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export function TrailCards(props) {
    const cardsData = props.cards
    const modalDataOrigin = props.modalData
    const singleCardObj = cardsData.map((cardObj) => {
        return (
            <SingleCard cardObjData={cardObj} key={cardObj.title} modalData={modalDataOrigin}/>
        )
    });
    return (
        <Container>
            <Row>
                {singleCardObj}
            </Row>
        </Container>
    )
}