import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

class Content extends Component {
  state = {
    loading: false,
    isLogged: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  componentClicked = () => {
    this.setState({ loading: true });
  };

  responseFacebook = response => {
    this.setState({
      loading: false,
      isLogged: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  render() {
    return (
      <div align="center" style={{ margin: 50 }}>
        {this.state.loading ? (
          <CircularProgress color="secondary" />
        ) : !this.state.isLogged ? (
          <FacebookLogin
            appId="2166385906933812"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        ) : (
          <Card style={styles.card}>
            <CardActionArea>
              <CardMedia
                style={styles.media}
                image={this.state.picture}
                title={this.state.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.state.name}
                </Typography>
                <Typography component="p">{this.state.email}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                onClick={() => this.setState({ isLogged: false })}
              >
                Log Out
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}

export default Content;
