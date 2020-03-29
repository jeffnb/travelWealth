import React, { useState } from "react"
import DataTable from "react-data-table-component"
import { useAdminCards } from "../../hooks"
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Row,
  Col,
  Form,
  Label
} from "reactstrap"

function Cards(props) {
  const { adminCards } = useAdminCards()
  const [pending, setPending] = useState(true)
  const [singleCard, setSingleCard] = useState("")
  const [modal2, setModal2] = useState(false)
  const [modal, setModal] = useState(false)
  const data2 = adminCards
  const { deleteCards, editCards } = useAdminCards()

  const columns2 = [
    {
      name: "Cards",
      selector: "image",
      sortable: false,
      maxWidth: "50px",
      cell: row => <img className="tableCards" alt={row.name} src={row.image} />
    },
    {
      name: "Name",
      selector: "name",
      maxWidth: "250px",
      sortable: true,
      wrap: true
    },
    {
      name: "Use For",
      selector: "use_for",
      sortable: true,
      maxWidth: "200px",
      wrap: true
    },
    {
      name: "Features",
      selector: "features",
      maxWidth: "200px",
      sortable: true
    },
    {
      name: "Fee",
      selector: "annual_fee",
      maxWidth: "50px",
      sortable: true
    },
    {
      name: "Annual Notes",
      selector: "annual_notes",
      maxWidth: "250px",
      sortable: true
    },

    {
      cell: row => (
        <ActionComponent row={row} onClick={handleRowClick}>
          Action
        </ActionComponent>
      ),
      ignoreRowClick: false,
      allowOverflow: true,
      button: true,
      right: true
    }
  ]
  const SampleExpandedComponent = ({ data }) => (
    <div className="mt-3">
      <p className="text-primary">Annual Notes : {data.annual_notes}</p>
      <p className="text-primary">Features : {data.features}</p>
    </div>
  )
  function handleRowClick(row) {
    setSingleCard(row)
    toggle2(row)
  }

  function openDeleteModal(row) {
    setSingleCard(row)
    toggle(row)
  }

  async function handleDeleteCard(id) {
    try {
      await deleteCards(id)
      toggle()
    } catch (e) {
      console.log(e)
    }
  }

  const CustomLoader = () => (
    <div>
      <i className="fas fa-circle-notch fa-spin fa-5x text-secondary"></i>
    </div>
  )

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => handleRowClick(row)
    const deleteHandler = () => openDeleteModal(row)

    return (
      <>
        <i
          className="fas fa-edit fa-lg"
          key={row.name}
          onClick={clickHandler}
        ></i>

        <i
          className="far fa-trash-alt fa-lg"
          key={row.id}
          onClick={deleteHandler}
        ></i>
      </>
    )
  }
  const DeleteButton = ({ singleCard, onClick }) => {
    const buttonHandler = () => handleDeleteCard(singleCard)

    return (
      <Button
        className="btn btn-outline-secondary text-light align-right"
        onClick={buttonHandler}
      >
        delete
      </Button>
    )
  }
  const EditModal = ({ singleCard, isOpen, onClick }) => {
    const editHandler = () => updateCard(singleCard.id)

    const id = singleCard.id
    const [name, setName] = useState(singleCard.name)
    const [useFor, setUseFor] = useState(singleCard.use_for)
    const [annualFee, setAnnualFee] = useState(singleCard.annual_fee)
    const [annualNotes, setAnnualNotes] = useState(singleCard.annual_notes)
    const [appLink, setAppLink] = useState(singleCard.app_link)
    const [approval524, setApproval524] = useState(singleCard.approval_over_524)
    const [bonusDeadline, setBonusDeadline] = useState(
      singleCard.bonus_deadline
    )
    const [counts524, setCounts524] = useState(singleCard.counts_524)
    const [features, setFeatures] = useState(singleCard.features)
    const [firstYearFree, setFirstYearFree] = useState(
      singleCard.first_year_free
    )
    const [freeIntl, setFreeIntl] = useState(singleCard.free_intl)
    const [image, setImage] = useState(singleCard.image)
    const [reconLine, setReconLine] = useState(singleCard.recon_line)
    const [rewards, setRewards] = useState(singleCard.rewards)
    const [type, setType] = useState(singleCard.type)
    async function updateCard() {
      try {
        await editCards(
          id,
          name,
          useFor,
          annualFee,
          annualNotes,
          appLink,
          approval524,
          bonusDeadline,
          counts524,
          features,
          firstYearFree,
          freeIntl,
          image,
          reconLine,
          rewards,
          type
        )
        toggle2()
      } catch (e) {
        console.log("HERE?", e)
      }
    }
    return (
      <Modal isOpen={modal2} toggle={toggle2} className={props.className}>
        <ModalHeader toggle={toggle2} className="d-flex">
          <i className="fas fa-plus"></i> Add a new card
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={editHandler}>
            <Row>
              <Col xs="12" md="6">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  label="name"
                  onChange={e => setName(e.target.value)}
                />
              </Col>
              <Col xs="12" md="6">
                <Label htmlFor="useFor">Use For</Label>
                <Input
                  type="text"
                  id="useFor"
                  value={useFor}
                  onChange={e => setUseFor(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="annualFee">Annual Fee</Label>
                <Input
                  type="text"
                  id="annualFee"
                  value={annualFee}
                  onChange={e => setAnnualFee(e.target.value)}
                />
              </Col>
              <Col>
                <Label htmlFor="type">Type</Label>
                <Input
                  type="text"
                  id="type"
                  value={type}
                  onChange={e => setType(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="link">App Link</Label>
                <Input
                  type="text"
                  id="link"
                  value={appLink}
                  onChange={e => setAppLink(e.target.value)}
                />
              </Col>
              <Col>
                <Label htmlFor="approval">Approval 524</Label>
                <Input
                  type="text"
                  id="approval"
                  value={approval524}
                  onChange={e => setApproval524(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="bonus">Bonus Deadline</Label>
                <Input
                  type="text"
                  id="bonus"
                  value={bonusDeadline}
                  onChange={e => setBonusDeadline(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="counts">Counts 524</Label>
                <Input
                  type="text"
                  id="counts"
                  value={counts524}
                  onChange={e => setCounts524(e.target.value)}
                />
              </Col>
              <Col>
                <Label htmlFor="features">features</Label>
                <Input
                  type="textarea"
                  id="features"
                  value={features}
                  onChange={e => setFeatures(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="firstFree">First Year Free</Label>
                <Input
                  type="text"
                  id="firstFree"
                  value={firstYearFree}
                  onChange={e => setFirstYearFree(e.target.value)}
                />
              </Col>
              <Col>
                <Label htmlFor="freeintl">Free Intl</Label>
                <Input
                  type="text"
                  id="freeintl"
                  value={freeIntl}
                  onChange={e => setFreeIntl(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="textarea"
                  id="image"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="recon">Recon Line</Label>
                <Input
                  type="text"
                  id="recon"
                  value={reconLine}
                  onChange={e => setReconLine(e.target.value)}
                />
              </Col>
              <Col>
                <Label htmlFor="rewards">Rewards</Label>
                <Input
                  type="text"
                  id="rewards"
                  value={rewards}
                  onChange={e => setRewards(e.target.value)}
                />
              </Col>
            </Row>
            <Label htmlFor="annualNotes">Annual Notes</Label>
            <Input
              type="textarea"
              id="annualNotes"
              value={annualNotes}
              onChange={e => setAnnualNotes(e.target.value)}
            />
            <Button className="float-right mt-3">Save</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  function toggle2(row) {
    setModal2(!modal2)
  }
  function toggle(row) {
    setModal(!modal)
  }
  // const FilterComponent = ({ filterText, onFilter, onClear }) => (
  //   <>
  //     <Input
  //       id="search"
  //       type="text"
  //       placeholder="Filter By Name"
  //       value={filterText}
  //       onChange={onFilter}
  //     />
  //     <Button
  //       className="btn btn-outline-secondary text-light"
  //       onClick={onClear}
  //     >
  //       X
  //     </Button>
  //   </>
  // );

  // const filteredItems = data2.filter(
  //   item => item.name && item.name.includes(filterText)
  // );

  // const subHeaderComponentMemo = React.useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setFilterText("");
  //     }
  //   };

  //   return (
  //     <FilterComponent
  //       onFilter={e => setFilterText(e.target.value)}
  //       onClear={handleClear}
  //       filterText={filterText}
  //     />
  //   );
  // }, [filterText]);
  return (
    <>
      <DataTable
        data={data2}
        pagination
        expandableRows
        subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        title="Card Listing"
        columns={columns2}
        progressPending={pending}
        progressComponent={<CustomLoader />}
        highlightOnHover
        persistTableHead
        expandableRowsComponent={<SampleExpandedComponent />}
      />
      <EditModal isOpen={modal2} singleCard={singleCard} onClick={editCards} />
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} className="d-flex">
          <i className="fas fa-plus"></i> Delete Card
        </ModalHeader>
        <ModalBody>
          are you sure you want to delete {singleCard.name} ?
          <Row className="float-right mt-4 mr-2">
            <DeleteButton
              onClick={handleDeleteCard}
              singleCard={singleCard.id}
            />
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Cards
