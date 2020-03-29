import React from "react"
import { Button, ListGroupItem } from "reactstrap"

function PDF(props) {
  const obj = props.obj
  const open = props.open === obj.title

  return (
    <ListGroupItem
      className="d-flex justify-content-around align-items-center bg-light"
      key={obj.id + 21}
    >
      {!open ? (
        <>
          <div key={obj.id + 1}>{obj.title}</div>
          <Button
            outline
            size="lg"
            color="secondary"
            key={obj.id + 3}
            onClick={() => props.setOpen(obj.title)}
          >
            Click here to view
          </Button>
        </>
      ) : (
        <>
          <Button
            outline
            size="lg"
            color="secondary"
            key={obj.id + 4}
            onClick={() => props.setOpen(null)}
          >
            <i className="fas fa-angle-left" key={obj.id + 5}></i>
          </Button>
          <embed
            key={obj.id + 6}
            width="1000"
            height="500"
            type="application/pdf"
            src={obj.resource}
          />
        </>
      )}
    </ListGroupItem>
  )
}

PDF.defaultProps = {
  obj: {}
}

export default PDF
