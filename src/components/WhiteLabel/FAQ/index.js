import React from 'react'
import { Col } from 'reactstrap'
import { Generic, GenericCollection, JSONLD } from 'react-structured-data'

const faqs = [
  {
    question: 'Some question?',
    answer: 'Some answer',
    id: 1
  },
  {
    question: 'Another Q?',
    answer: 'Another A',
    id: 2
  }
]

export default function FAQ() {
  return (
    <Col md={12}>
      <JSONLD>
        <Generic type="FAQPage" jsonldtype="FAQPage">
          <GenericCollection type="mainEntity">
            {faqs.map(faq => (
              <Generic
                key={faq.id}
                jsonldtype="Question"
                schema={{ name: faq.question }}
              >
                <Generic
                  type="acceptedAnswer"
                  jsonldtype="Answer"
                  schema={{ type: faq.answer }}
                />
              </Generic>
            ))}
          </GenericCollection>
        </Generic>
      </JSONLD>

      <div className="faq-list">
        {
          faqs.map(faq => (
            <div className="faq" key={faq.id}>
              <h3>{faq.question}</h3>
              <p className="answer">{faq.answer}</p>
            </div>
          ))
        }
      </div>
    </Col>
  )
}