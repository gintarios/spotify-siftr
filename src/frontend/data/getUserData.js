import React, { Component } from 'react';




export default class UserData extends Component {
  constructor() {
    super();
    this.state = {
        user:[]
    }
  }
  componentDidMount() {
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + this.props.acToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          user: {
            name: data.display_name,
            bday: data.birthdate,
            location: data.country,
            email: data.email,
            ext: data.external_urls,
            followers: data.followers,
            href: data.href,
            id: data.id,
            images: data.images,
            subscriptions: data.product,
            type: data.type,
            uri: data.uri
          }
        })
      );
  }
  render() {
      if(this.state.user.length === 0){
          return <div>loading..</div>
      }else{
        return(
            <div>{this.state.user.name}</div> 
         )
      }
    
  }
}