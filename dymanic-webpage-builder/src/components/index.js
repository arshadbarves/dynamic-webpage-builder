import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import "./style.css";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import DynamicForm from "./DynamicForm";

let userJSONInput = {};

class ContentPage extends Component {

   constructor(props) {
    super(props);
    this.state = {
      showRenderForm: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    setTimeout(function() { //Start the timer
      this.setState({showRenderForm: true}) //After 1 second, set render to true
  }.bind(this), 1000)
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.JsonInput.value);
    userJSONInput = JSON.parse(event.target.JsonInput.value);
    console.log(userJSONInput);
  }


  render() {
    

    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                id="outlined-multiline-static"
                label="Enter JSON Data"
                multiline
                rows={20}
                defaultValue=""
                name="JsonInput"
                variant="outlined"
              />

              <Grid item md={12}>
                <Button
                  classes="covertbutton"
                  size="large"
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={this._onButtonClick}
                  endIcon={<NavigateNextRoundedIcon />}
                >
                  Convert
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <div className="App">
          {this.state.showRenderForm ?
           <DynamicForm
            className="form"
            title="Registration"
            model={userJSONInput}
            onSubmit={(model) => {
              this.onSubmit(model);
            }}
          /> :
           null
        } 
        </div>
      </div>
    );
  }
}

export default ContentPage;
