import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Bookmark } from 'react-bootstrap-icons';
import {getDatabase, onValue, ref, set as firebaseSet} from 'firebase/database';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';


function SingleCard(props) {
    const [isBooked, setIsBooked] = useState(false);

    const cardData = props.cardObjData
    const modalData = props.modalData

    useEffect(() => {
        const db = getDatabase();
        const savedRef = ref(db, "user/allUsers/" + props.currentUser.userId + "/trails/" + cardData.key+ "/isSaved");
        
        const offFunction = onValue(savedRef, (snapshot) => {
            const isSaved = snapshot.val();
            if (isSaved) {
                const savedTrailRef = ref(db, "trail/trail cards/" + cardData.key + "/isSaved")
                firebaseSet(savedTrailRef, true);
            } else {
                const savedTrailRef = ref(db, "trail/trail cards/" + cardData.key + "/isSaved")
                firebaseSet(savedTrailRef, false);
            }
        })

        function cleanup(){
            offFunction();
        }
        return cleanup;
    }, []);
    const isSaved = cardData.isSaved;

    const singleModalObj = modalData.map((modObj) => {
        if (cardData.title == modObj.id) {
            return (
                <SeeMoreButton cardsData={cardData} modalCard={modObj} key={modObj.id} />
            )
        }
    })
    
    const handleClick = (event) => {

        const db = getDatabase()
        const savedRef = ref(db, "user/allUsers/" + props.currentUser.userId + "/trails/" + cardData.key+ "/isSaved")
        const savedTrailRef = ref(db, "trail/trail cards/" + cardData.key + "/isSaved")

        firebaseSet(savedRef, !isSaved);
        firebaseSet(savedTrailRef, !isSaved);

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
    const cardStatus = cardsData.status
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleStatusClick = (event) => {

        const db = getDatabase()
        const statusRef = ref(db, "trail/trail cards/"+cardsData.key+"/status")
        //console.log(event.target.value)
        if (event.target.value === "Clear") {
            firebaseSet(statusRef, "Clear")
        } else if (event.target.value === "Use Caution") {
            firebaseSet(statusRef, "Use Caution")
        } else {
            firebaseSet(statusRef, "Closed")
        }
    }
    return (
        <div className="card-footer">
            <Button variant="primary" onClick={handleShow}>
                See More
            </Button>
            <Modal size="lg" show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel className="carousel">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={modalContent.caroselImgOne}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={modalContent.caroselImgTwo}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={modalContent.caroselImgThree}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
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
                        <Form.Select aria-label="Default select example" onChange={handleStatusClick}>
                            <option>Select trail status</option>
                            <option value="Clear">Clear</option>
                            <option value="Use Caution">Use Caution</option>
                            <option value="Closed">Closed</option>
                        </Form.Select>
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
            <SingleCard cardObjData={cardObj} key={cardObj.title} modalData={modalDataOrigin} currentUser={props.currentUser} />
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