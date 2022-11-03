import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}, () => {
      if(this.state.value === '') {
        this.props.search(null);
      } else {
        this.props.search(this.state.value);
      }
    });
  }

  render() {
    return (
      <div className="search_container_reviews">
        <input type="text" className="search_input_reviews" value={this.state.value} placeholder="Search Reviews" onChange={this.handleChange} />
        <FontAwesomeIcon className="search_icon_reviews" icon={ faSearch } />
      </div>
    )
  }
}

export default SearchBar;