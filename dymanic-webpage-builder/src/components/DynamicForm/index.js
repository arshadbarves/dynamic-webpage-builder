import React from "react";
import { Grid } from "@material-ui/core";
import "./form.css";

let ActionDisplay ="";

export default class DynamicForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  renderForm = () => {
    let model = this.props.model;
    let formUI = model[0].Attributes.map(m => {
      let type = m.Type || "text";
      let props = m.props || {};
      let name = m.Name;
      let value = m.Value;
      ActionDisplay = model[0].ActionDisplay;
      let input = (
        <input
          {...props}
          className="form-input"
          type={type}
          name={name}
          value={value}
        />
      );

      if (type == "radio") {
        input = m.Options.map(o => {
          return (
            <React.Fragment >
              <input
                {...props}
                className="form-input"
                type={type}
                name={name}
                value={o.Value}
              />
              <label>{o.DisplayValue}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }

      if (type == "select") {
        input = m.DropdownValues.map(o => {
          let checked = o.Value == value;
          //console.log("select: ", o.value, value);
          return (
            <option
              {...props}
              className="form-input"
              value={o.Value}
            >
              {o.DisplayValue}
            </option>
          );
        });

        //console.log("Select default: ", value);
        input = (
          <select
            value={value}
          >
            {input}
          </select>
        );
      }

      if (type == "checkbox") {
        input = m.Options.map(o => {
          //let checked = o.Value == value;
          let checked = false;
          if (value && value.length > 0) {
            checked = value.indexOf(o.Value) > -1 ? true : false;
          }
          //console.log("Checkbox: ", checked);
          return (
            <React.Fragment >
              <input
                {...props}
                className="form-input"
                type={type}
                name={o.Name}
                checked={checked}
                value={o.Value}
                ActionzDisplay
              />
              <label >{o.DisplayValue}</label>
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }

      return (
        <div  className="form-group">
          <label className="form-label" >
            {m.Name}
          </label>
          {input}
        </div>
      );
    });
    return formUI;
  };

  render() {
    let title = "Dynamic Webpage";

    return (
      <div className="Form_Layout">
        <Grid container direction="row" justify="center" alignItems="center" >
          <Grid item xs={12}>
            <div className={this.props.className}>
        <h3 className="form-title">{title}</h3>
        <form
          className="dynamic-form"
        >
          {this.renderForm()}
          <div className="form-actions">
                  <button type="submit">{ActionDisplay}</button>
          </div>
        </form>
          </div>
          </Grid>   
        </Grid>
      </div>
    );
  }
}
