import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function SingleCard(props) {
    const cardData = props.cardObjData
    const modalData = props.modalData
    const singleModalObj = modalData.map((modObj) => {
        if (cardData.title == modObj.id) {
            return (
                <SeeMoreButton modalCard={modObj} key={modObj.id} />
            )
        }
    })
    return (
        <Col md={6} xl={3} className="d-flex col-auto rounded mt-4" >
            <div className="card">
                <img src={cardData.img} className=".card-img-top" alt={cardData.title} />
                <div className="card-body">
                    <h2>{cardData.title}</h2>
                    <p>{cardData.description}</p>
                    {singleModalObj}
                </div>
            </div>
        </Col>
    )
}

function SeeMoreButton(props) {
    const modalContent = props.modalCard
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                See More
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
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
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
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