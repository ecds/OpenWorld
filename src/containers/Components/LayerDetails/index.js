import React from 'react'
// import { Card } from 'react-bootstrap';
import OmekaImages from '../OmekaImages';

export default class LayerDetails extends React.Component {
  render() {
    if (this.props.layer) {
      return (
        // <div className="overflow-auto" style={{maxHeight: "50vh"}}>
        //     <div className="overflow-hidden">
        //       <Card>
        //         <Card.Title className="display-6">{this.props.layer.title}</Card.Title>
        //         <Card.Text className="fs-4">{this.props.layer.body}</Card.Text>
        //       </Card>
        //     </div>
        //   </div>
        <article>
          {this.renderImage()}
          <p className="fs-3 mt-4">{this.props.layer.title}</p>
          <p className="fs-5 mt-4">{this.props.layer.body}</p>
        </article>
      )
    } else {
      return (<span></span>)
    }
  }

  renderImage() {
    if (this.props.layer.image) {
      return(
        <img src={this.props.layer.image} className="img-fluid" alt={this.props.layer.title} />
      )
    } else if (this.props.layer.identifier) {
      return(<OmekaImages item={this.props.layer.identifier} />)
    } else {
      return(<></>)
    }
  }
}