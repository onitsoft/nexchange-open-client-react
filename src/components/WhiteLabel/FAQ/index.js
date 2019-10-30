import React from 'react'
import { Col } from 'reactstrap'
import { Generic, GenericCollection, JSONLD } from 'react-structured-data'


export default function FAQ() {

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

  // Add from Helmet example, https://github.com/etereo-io/react-seo-bootstrap/blob/9cf8f14411ee9f2ab1bbc3574c310c188bed3c63/src/components/faqs/Faqs.js#L22
  return (
    <Col md={12}>
      <JSONLD>
        <Generic type="FAQPage" jsonldtype="FAQPage">
          <GenericCollection type="mainEntity">
            {faqs.map(faq => (
              <Generic
                key={ faq.id }
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
        { faqs.map(faq => (
          <div className="faq" key={faq.id}>
            <h3>{ faq.question }</h3>
            <p className="answer">{ faq.answer }</p>
          </div>
        ))}
      </div>
    </Col>
  )
}