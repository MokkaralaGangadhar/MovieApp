import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';

const Test = () => {
    const [cardcolor,setCardColor] = useState([]);

    const checkColor = (color) => {

        
        if(!cardcolor.includes(color)){
            cardcolor.push(color);
        }
        else if(cardcolor.includes(color)){
            let index = cardcolor.indexOf(color);
            cardcolor.splice(index,1);

        }
        console.log(cardcolor);
        
    }

  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap'>
        
      {[
        'Primary',
        'Secondary',
        'Success',
        'Danger',
        'Warning',
        'Info',
        'Light',
        'Dark',
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2"
          onClick={() => {checkColor(variant)}}
          
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>{variant} Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    


        </div>
  )
}

export default Test