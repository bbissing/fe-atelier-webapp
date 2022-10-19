import React from 'react';
import ProductInfo from './product-info.jsx';
import ImageGallary from './image-gallary.jsx';
import StyleSelector from './style-selector.jsx';
import AddToCart from './add-to-cart.jsx';
import axios from 'axios';
import Stars from '../FiveStars.jsx';


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {styleId: '', priceInfo: {}, styleObj: {}, modalStyle: {"display": "none"}}; //styleObj is specific
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.handleStyleIdChange();
    }
  }

  handleStyleIdChange(newId) {
    var styleObj = newId === undefined ? this.props.defaultStyle : this.props.styles.find(style => style.style_id === newId);
    this.setState({priceInfo: {original_price: styleObj.original_price, sale_price: styleObj.sale_price},
                   styleObj: styleObj,
                   styleId: styleObj.style_id});
  }

  handleModalAppear() {
    this.setState({modalStyle: {"display": "flex"}});
  }

  handleModalDisappear() {
    this.setState({modalStyle: {"display": "none"}});
  }

  componentDidMount() {
    this.handleStyleIdChange();
  }

  render() {
    if (this.state.styleId === '') {
      return null;
    } else {
      return (<div className="overview-container">
          <ImageGallary section = "overview" photos={this.state.styleObj.photos} handleModalAppear={this.handleModalAppear.bind(this)} handleBackground={this.props.handleOverviewBackground}/>
      <div className="overview">
          <ProductInfo productId={this.props.productId} currentProduct={this.props.currentProduct} styleObj={this.state.styleObj} rating={this.props.rating}
          totalReviews={this.props.totalReviews} priceInfo={this.state.priceInfo} />
          <StyleSelector productId={this.props.productId} styleObj={this.state.styleObj} styles={this.props.styles} changeStyle={this.handleStyleIdChange.bind(this)} styleId={this.state.styleId}/>
          <AddToCart styleObj={this.state.styleObj}/>
      </div>
      <div className="overview modal" id="overview-modal-window" style={this.state.modalStyle}>
        <ImageGallary section="modal" photos={this.state.styleObj.photos} handleModalDisappear={this.handleModalDisappear.bind(this)} handleBackground={this.props.handleOverviewBackground}/>
      </div>
      </div>
      )
    }
  }
}

export default Overview;