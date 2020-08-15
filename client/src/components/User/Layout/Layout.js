import React, { useEffect,Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import "./Layout.css";
import MainNavbar from "./Navbar/MainNavbar";
import { Link, Route } from "react-router-dom";
import UserProfile from "../UserProfile";
import { caloriesRecipes ,showUser} from "../../../redux";
const Layout = (props) => {

  const calculate = require('fitness-health-calculations');
  // let myBmr = calculate.bmr(props.profile.gender, props.profile.age, props.profile.height, props.profile.weight);
//   let totalDailyEnergyeExpenditure = calculate.tdee(props.profile.gender, props.profile.age, props.profile.height, props.profile.weight, props.activityLevel)
//   let totalCaloricNeeds = calculate.caloricNeeds(props.profile.gender, props.profile.age, props.profile.height, props.profile.weight, props.profile.activityLevel, props.profile.goal, props.profile.approach);
//   let idealBodyWeight = calculate.idealBodyWeight(props.profile.height, props.profile.gender, props.profile.units)
  const [data, setData] = useState({
    height: "",
    heightunits: "metres",
    weight: "",
    weightunits: "Kg",
    age: "",
    gender: "male",
  });
  const dispatch = useDispatch();
  useEffect(() => {
	dispatch(showUser(props.user.userid));
    dispatch(caloriesRecipes(100,800,2));
  }, [props.user.userid]);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  return (
    <Fragment>
      <MainNavbar />
      <Link to="/userprofile">Profile</Link>
      <Route path="/userprofile" component={UserProfile} />
      <div>{props.weightGoal}</div>
      {props.recipe.map((dish)=>{
		  <h1>{dish.title}</h1>
		  <img src={dish.image} alt='Dish'/>
	  })}

    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
	user: state.user,
	profile: state.user.profile,
	recipe: state.user.calrecipe,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);