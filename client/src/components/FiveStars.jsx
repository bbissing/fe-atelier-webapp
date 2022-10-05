import React from 'react';

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rating: 0, stars: [0, 0, 0, 0, 0]};
  }

  componentDidUpdate(prevProps) {
    if (this.props.rating !== prevProps.rating) {
      this.setState({rating: this.props.rating}, () => {
        this.renderStarsByQuarters(this.state.rating);
      });
    }
  }

  renderStarsByQuarters (rating) {
    if (rating > 0) {
      var [int, dec] = [Number(String(rating).split('.')[0]), Number('0.' + String(rating).split('.')[1]) || 0];
      var index = 0;
      var newArr = [0, 0, 0, 0, 0];
      while (int > 0) {
        newArr[index] = 1;
        int--;
        index++;
      }
      if (dec >=0 && dec <= 0.125) {
        newArr[index] = 0;
      } else if (dec > 0.125 && dec <= 0.375) {
        newArr[index] = 0.35; //35% fill looks like 1/4 fill
      } else if (dec > 0.375 && dec <= 0.625) {
        newArr[index] = 0.5;
      } else if (dec > 0.625 <= 0.875) {
        newArr[index] = 0.7; //70% fill looks like 3/4 fill
      } else {
        newArr[index] = 1;
      }
      this.setState({stars: newArr});
    }

  }

  render() {
    return (<div>{this.state.stars.map((star, i) => {
      return (<div className="single-star-container" key={i}>
        <span className="single-star-outline"></span>
        <span className="single-star-fill" style={{width: star * 100 + '%'}}></span>
      </div>)
    })}
    </div>)

  }
}

export default Stars;